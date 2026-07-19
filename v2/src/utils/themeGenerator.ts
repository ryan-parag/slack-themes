import { colord, extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import mixPlugin from 'colord/plugins/mix'

extend([a11yPlugin, mixPlugin])

// The 4 seed colors the user controls directly
export interface ThemeSeeds {
  column_bg: string      // sidebar / nav background seed
  active_item: string    // selected channel / active state
  presence: string       // online indicator
  badge: string          // notification badge
}

// Full derived theme — seeds + all secondary values
export interface DerivedTheme extends ThemeSeeds {
  top_nav_bg: string          // top nav / workspace menu background
  top_nav_text: string        // top nav text (mirrors text_color, per Slack)
  hover_item: string          // hovered channel row
  active_item_text: string    // text on selected item (contrast-safe)
  text_color: string          // default sidebar text (near-neutral grey)
  text_muted: string          // secondary/muted sidebar text
  active_presence: string     // alias kept for legacy compat
  mention_badge: string       // display badge color, nudged for contrast if needed
  contrast_border: string     // subtle separator lines
}

/**
 * Calibrated against Slack's own shipped presets (utils/slackThemePresets.ts):
 * for the default dark theme (column_bg #19171D), Slack's real menu_bg
 * (#121016), hover_item (#27242C) and text_color (#D1D2D3) sit at
 * L-3, L+6, and a desaturated L≈82 respectively relative to column_bg's
 * L≈10 — hue/saturation held roughly constant except for text, which Slack
 * renders as a near-neutral grey regardless of the sidebar's hue.
 */
const MENU_BG_SHIFT = 0.03
const HOVER_SHIFT = 0.06
const TEXT_LIGHTNESS_DARK = 82
const TEXT_LIGHTNESS_LIGHT = 20
const TEXT_MAX_SATURATION = 5

/**
 * Given 4 seed colors, derive all secondary UI values the way Slack's
 * client does: every secondary color is computed relative to column_bg
 * (the actual rendered sidebar background — Slack renders it flat, not as
 * a gradient), not to the seed's raw hue.
 */
export function generateTheme(seeds: ThemeSeeds): DerivedTheme {
  const bg = colord(seeds.column_bg)
  const isDark = !bg.isLight()
  const active = colord(seeds.active_item)

  const top_nav_bg = (isDark ? bg.darken(MENU_BG_SHIFT) : bg.lighten(MENU_BG_SHIFT)).toHex()
  const hover_item = (isDark ? bg.lighten(HOVER_SHIFT) : bg.darken(HOVER_SHIFT)).toHex()

  // Text: near-neutral grey, not hue-tinted — matches Slack's own presets
  // (e.g. #D1D2D3), which stay desaturated regardless of the sidebar hue.
  const bgHsl = bg.toHsl()
  const text_color = colord({
    h: bgHsl.h,
    s: Math.min(bgHsl.s, TEXT_MAX_SATURATION),
    l: isDark ? TEXT_LIGHTNESS_DARK : TEXT_LIGHTNESS_LIGHT,
  }).toHex()

  // Muted text: blend text_color 40% back toward the background
  const text_muted = colord(text_color).mix(bg, 0.4).toHex()

  // Slack always renders the top nav's text the same as the sidebar's.
  const top_nav_text = text_color

  // Active item text: high contrast against the selected item highlight
  const active_item_text = active.isReadable('#ffffff', { level: 'AA', size: 'normal' })
    ? '#ffffff'
    : active.isReadable('#000000', { level: 'AA', size: 'normal' })
    ? '#000000'
    : active.isLight()
    ? '#000000'
    : '#ffffff'

  // Border: very low opacity overlay relative to the background
  const contrast_border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

  // Badge: Slack uses the seed as-is in every shipped preset. We only nudge
  // it when it would otherwise be nearly invisible against the sidebar.
  const badgeC = colord(seeds.badge)
  const mention_badge = (() => {
    if (badgeC.isReadable(bg, { level: 'AA', size: 'large' })) {
      return seeds.badge
    }
    return (isDark ? badgeC.lighten(0.28) : badgeC.darken(0.28)).toHex()
  })()

  return {
    ...seeds,
    top_nav_bg,
    top_nav_text,
    hover_item,
    active_item_text,
    text_color,
    text_muted,
    active_presence: seeds.presence,
    mention_badge,
    contrast_border,
  }
}

/**
 * Join an ordered list of hex colors into the comma-separated string Slack
 * accepts when pasted into a message compose box or the theme picker.
 */
export function joinSlackThemeValues(values: string[]): string {
  return values
    .map((hex) => (hex.startsWith('#') ? hex : `#${hex}`).toUpperCase())
    .join(',')
}

/**
 * Render the theme as Slack's own comma-separated paste format (same order
 * parseLegacyString expects):
 *   column_bg,menu_bg,active_item,active_item_text,hover_item,text_color,
 *   active_presence,badge,top_nav_bg,top_nav_text
 */
export function toSlackPasteString(seeds: ThemeSeeds): string {
  const derived = generateTheme(seeds)
  return joinSlackThemeValues([
    seeds.column_bg,
    derived.top_nav_bg,
    seeds.active_item,
    derived.active_item_text,
    derived.hover_item,
    derived.text_color,
    seeds.presence,
    derived.mention_badge,
    derived.top_nav_bg,
    derived.top_nav_text,
  ])
}

/**
 * Parse a legacy 8–10 value comma-separated Slack theme string and
 * map it to the 4 modern seed colors.
 *
 * Legacy order:
 *   column_bg, menu_bg_active, active_item, active_item_text,
 *   hover_item, text_color, active_presence, notification_badge,
 *   [top_nav_bg, top_nav_text]  ← optional
 */
export function parseLegacyString(str: string): ThemeSeeds | null {
  const parts = str
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^#[0-9a-fA-F]{3,6}$/.test(s))

  if (parts.length < 7) return null

  return {
    column_bg: parts[0],
    active_item: parts[2],
    presence: parts[6],
    badge: parts[7] ?? parts[6],
  }
}

/**
 * Default seed values — clean dark Slack-like theme.
 */
export const DEFAULT_SEEDS: ThemeSeeds = {
  column_bg: '#1a1d21',
  active_item: '#1164a3',
  presence: '#2bac76',
  badge: '#cd2553',
}
