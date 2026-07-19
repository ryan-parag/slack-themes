// resolveThemeToken.ts

import { DEFAULT_THEME_TOKENS } from './slackDesignTokens'

export type ThemeTokenMode = 'light' | 'dark'

export interface ResolveThemeTokenOptions {
  tokenName: string
  mode: ThemeTokenMode
  paletteName?: string
  brightness?: number
  highContrast?: boolean
}

// CONFIRMED from Slack's live computed stylesheet across two independent
// themes (different accent colors) — shade/alpha are fixed, NOT derived
// from brightness or the accent color's hue. Safe to treat as final.
const CONFIRMED_INV_TOKENS: Record<
  ThemeTokenMode,
  Record<string, { ref: string; alpha: number } | { static: string }>
> = {
  dark: {
    'surf-inv-sec':         { ref: '--dt_color-plt-gray-0',      alpha: 0.6 },
    'surf-inv-sec-hover':   { ref: '--dt_color-plt-gray-100',    alpha: 0.08 },
    'surf-inv-sec-pressed': { ref: '--dt_color-plt-gray-100',    alpha: 0.18 },
    'surf-inv-ter':         { ref: '--dt_color-plt-primary-100', alpha: 0.08 },
    'surf-inv-ter-hover':   { ref: '--dt_color-plt-primary-100', alpha: 0.08 },
    'surf-inv-ter-pressed': { ref: '--dt_color-plt-primary-100', alpha: 0.18 },
  },
  light: {
    'surf-inv-sec':         { static: 'rgba(255, 255, 255, 0.9)' },
    'surf-inv-sec-hover':   { ref: '--dt_color-plt-primary-70',  alpha: 0.13 },
    'surf-inv-sec-pressed': { ref: '--dt_color-plt-primary-70',  alpha: 0.22 },
    'surf-inv-ter':         { ref: '--dt_color-plt-primary-80',  alpha: 0.13 },
    'surf-inv-ter-hover':   { ref: '--dt_color-plt-primary-100', alpha: 0.22 },
    'surf-inv-ter-pressed': { ref: '--dt_color-plt-primary-100', alpha: 0.28 },
  },
}

// TODO: the real brightness -> shade curve hasn't been confirmed from
// Slack's bundle yet — this always returns the same midpoint placeholder.
// Only affects tokens NOT covered by CONFIRMED_INV_TOKENS above; `brightness`
// itself is still accepted on ResolveThemeTokenOptions for when that curve
// is captured.
function brightnessToShade(): string {
  return '50'
}

function isInvertedSurface(tokenName: string): boolean {
  return tokenName.startsWith('surf-inv-sec') || tokenName.startsWith('surf-inv')
}

// `highContrast` is intentionally not destructured below — accepted on
// ResolveThemeTokenOptions for callers, but high-contrast overrides aren't
// confirmed yet, so there's nothing to branch on until they are.
export function resolveThemeToken({
  tokenName,
  mode,
  paletteName,
}: ResolveThemeTokenOptions): string | undefined {
  // Check the confirmed exact-match table FIRST, before any generic/placeholder logic.
  const confirmed = CONFIRMED_INV_TOKENS[mode]?.[tokenName]
  if (confirmed) {
    return 'static' in confirmed ? confirmed.static : `rgba(var(${confirmed.ref}), ${confirmed.alpha})`
  }

  if (isInvertedSurface(tokenName)) {
    // Unconfirmed inv-* tokens still fall back to the old placeholder path —
    // known to be approximate (wrong shape: missing alpha, wrong palette
    // assumption). Only trust this for tokens NOT in CONFIRMED_INV_TOKENS.
    if (mode === 'dark') {
      return `var(--dt_color-plt-gray-${brightnessToShade()})`
    }
    return DEFAULT_THEME_TOKENS.light[tokenName as keyof typeof DEFAULT_THEME_TOKENS.light]
  }

  if (paletteName) {
    return `var(--dt_color-plt-${paletteName}-${brightnessToShade()})`
  }

  return DEFAULT_THEME_TOKENS[mode]?.[tokenName as keyof (typeof DEFAULT_THEME_TOKENS)['light']]
}