export type PaletteMode = 'light' | 'dark'

export type PaletteShades = Record<string, string>

export const DEFAULT_PALETTES: Record<PaletteMode, Record<string, PaletteShades>>

export const DEFAULT_THEME_TOKENS: Record<PaletteMode, Record<string, string>>

export const PALETTE_SHADES: string[]

export const PALETTE_NAMES: string[]

export function getPaletteRGB(paletteName: string, shade: string, mode?: PaletteMode): string | undefined

export function getThemeToken(tokenName: string, mode?: PaletteMode): string | undefined
