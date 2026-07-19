/**
 * applyDefaultThemeTokens.ts
 *
 * Bootstraps the design-tokens system's STATIC baseline (slackDesignTokens.js)
 * onto :root as real CSS custom properties:
 *   --dt_color-plt-{paletteName}-{shade}   for all 20 built-in tonal palettes
 *   --dt_color-theme-{tokenName}           for the semantic base/surf/content/... layer
 *
 * Without this, `var(--dt_color-theme-surf-inv-sec)` (Sidebar) and any
 * `var(--dt_color-plt-gray-*)` reference produced by resolveThemeToken's
 * dark-mode "surf-inv" fallback resolve to nothing, since DEFAULT_PALETTES /
 * DEFAULT_THEME_TOKENS are otherwise just plain JS data. Call this once
 * per mode change; applyTonalRamp (generateTonalPalette.ts) layers a custom
 * accent palette (e.g. "primary") on top the same way.
 */

import { DEFAULT_PALETTES, DEFAULT_THEME_TOKENS } from './slackDesignTokens'
import type { PaletteMode } from './slackDesignTokens'

export function applyDefaultThemeTokens(mode: PaletteMode): void {
  const root = document.documentElement.style

  for (const [paletteName, shades] of Object.entries(DEFAULT_PALETTES[mode])) {
    for (const [shade, value] of Object.entries(shades)) {
      root.setProperty(`--dt_color-plt-${paletteName}-${shade}`, value)
    }
  }

  for (const [tokenName, value] of Object.entries(DEFAULT_THEME_TOKENS[mode])) {
    root.setProperty(`--dt_color-theme-${tokenName}`, value)
  }
}
