/**
 * applyResolvedThemeTokens.ts
 *
 * Writes resolveThemeToken's dynamically-resolved --dt_color-theme-* output
 * onto :root, the same way applyDefaultThemeTokens does for the static
 * baseline. Kept separate from that file on purpose: slackDesignTokens.js
 * stays pure static reference data, resolveThemeToken.ts stays pure
 * resolution logic, and this is the only place that turns resolved values
 * into real CSS custom properties.
 *
 * ORDERING REQUIREMENT: every value resolveThemeToken returns for these
 * tokens is an rgba(var(--dt_color-plt-...), alpha) reference (see
 * CONFIRMED_INV_TOKENS in resolveThemeToken.ts) — it points at
 * --dt_color-plt-gray-* (from applyDefaultThemeTokens) and
 * --dt_color-plt-primary-* (from applyTonalRamp('primary', ...), the app's
 * existing source of the user's chosen accent palette — see Layout.tsx).
 * Call this AFTER both of those have run for the same mode, or the rgba()
 * will reference custom properties that don't exist yet.
 */

import { resolveThemeToken } from './resolveThemeToken'
import type { ThemeTokenMode } from './resolveThemeToken'

// Token names resolveThemeToken has CONFIRMED logic for today (see
// CONFIRMED_INV_TOKENS). Extend this list as more tokens get confirmed —
// anything not listed here simply isn't written to :root, rather than
// applying a guessed value.
const RESOLVED_TOKEN_NAMES = [
  'surf-inv-sec',
  'surf-inv-sec-hover',
  'surf-inv-sec-pressed',
  'surf-inv-ter',
  'surf-inv-ter-hover',
  'surf-inv-ter-pressed',
] as const

export function applyResolvedThemeTokens(mode: ThemeTokenMode): void {
  const root = document.documentElement.style

  for (const tokenName of RESOLVED_TOKEN_NAMES) {
    const value = resolveThemeToken({ tokenName, mode })
    if (value) root.setProperty(`--dt_color-theme-${tokenName}`, value)
  }
}
