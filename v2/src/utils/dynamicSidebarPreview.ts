/**
 * dynamicSidebarPreview.ts
 *
 * SlackSidebarPreview only understands the classic flat 8-field palette
 * shape (ResolvedSlackTheme). The design-tokens system has no such shape —
 * it's a semantic-token layer over a 12-shade ramp, meant to drive many
 * different UI surfaces at once, not one fixed sidebar layout.
 *
 * This is a presentational bridge only: it picks a few ramp shades that
 * *look* like a reasonable sidebar so the existing preview component can
 * render a dynamic theme without modification. It is NOT reverse-engineered
 * from Slack (no confirmed mapping from accent ramp -> sidebar roles exists
 * in the design-token spec we captured) — treat the exact shade choices
 * below as an approximation for preview purposes only.
 */

import { shouldUseLightForeground } from './slackThemeColors'
import type { ResolvedSlackTheme } from '@/components/SlackSidebarPreview'

type ShadeMap = Record<string, string> // shade label -> "r g b" or "r,g,b"

function rgb(shadeMap: ShadeMap, shade: string): string {
  return `rgb(${shadeMap[shade]})`
}

function rgbToHex(rgbStr: string): string {
  const parts = rgbStr.match(/\d+/g)?.map(Number) ?? [0, 0, 0]
  return `#${parts.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Project a generated (or default) tonal ramp into the classic sidebar
 * preview shape. Shade "0" is always the mode-native neutral surface (light
 * bg in light mode, dark bg in dark mode) and higher shades trend toward the
 * opposite extreme, so the same shade indices read correctly in both modes
 * without needing to branch on mode here.
 */
export function mapRampToSidebarPreview(ramp: ShadeMap): ResolvedSlackTheme {
  const columnBg = rgb(ramp, '70')
  const menuBg = rgb(ramp, '80')
  const activeItem = rgb(ramp, '40')
  const hoverItem = rgb(ramp, '60')

  const textColor = shouldUseLightForeground(rgbToHex(columnBg)) ? '#FFFFFF' : '#1D1C1D'
  const activeItemText = shouldUseLightForeground(rgbToHex(activeItem)) ? '#FFFFFF' : '#1D1C1D'

  return {
    column_bg: columnBg,
    menu_bg: menuBg,
    active_item: activeItem,
    active_item_text: activeItemText,
    hover_item: hoverItem,
    text_color: textColor,
    // Presence stays Slack's fixed brand green — it isn't part of the
    // accent-driven token layer.
    active_presence: '#2BAC76',
    badge: rgb(ramp, '50'),
    badge_text_color: '#FFFFFF',
    top_nav_bg: menuBg,
    top_nav_text: textColor,
  }
}
