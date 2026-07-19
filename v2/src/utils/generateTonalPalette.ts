import { Hct, TonalPalette, argbFromHex, hexFromArgb } from '@material/material-color-utilities'

export type PaletteMode = 'light' | 'dark'

const LIGHT_TONE_STOPS: { shade: string; tone: number }[] = [
  { shade: '0', tone: 97 },
  { shade: '5', tone: 91 },
  { shade: '10', tone: 85 },
  { shade: '20', tone: 78 },
  { shade: '30', tone: 69 },
  { shade: '40', tone: 57 },
  { shade: '50', tone: 45 },
  { shade: '60', tone: 38 },
  { shade: '70', tone: 28 },
  { shade: '80', tone: 19 },
  { shade: '90', tone: 11 },
  { shade: '100', tone: 4 },
]

const DARK_TONE_STOPS: { shade: string; tone: number }[] = LIGHT_TONE_STOPS.map(({ shade }, i) => ({
  shade,
  tone: LIGHT_TONE_STOPS[LIGHT_TONE_STOPS.length - 1 - i].tone,
}))

function rgbTriplet(hex: string): string {
  const c = hexFromArgb(argbFromHex(hex))
  const r = parseInt(c.slice(1, 3), 16)
  const g = parseInt(c.slice(3, 5), 16)
  const b = parseInt(c.slice(5, 7), 16)
  return `${r} ${g} ${b}`
}

/**
 * Sample a Material HCT tonal palette derived from `hex` at each shade stop,
 * returning "R G B" triplets (so callers can use them inside rgb(var(--x)) ).
 */
export function generateTonalRamp(hex: string, mode: PaletteMode): Record<string, string> {
  const hct = Hct.fromInt(argbFromHex(hex))
  const palette = TonalPalette.fromHct(hct)
  const stops = mode === 'dark' ? DARK_TONE_STOPS : LIGHT_TONE_STOPS
  return Object.fromEntries(
    stops.map(({ shade, tone }) => [shade, rgbTriplet(hexFromArgb(palette.tone(tone)))])
  )
}

/**
 * Populate --dt_color-plt-{name}-{shade} custom properties on the document
 * root from a single seed hex, e.g. applyTonalRamp('primary', '#1164a3', 'dark')
 * sets --dt_color-plt-primary-0 .. --dt_color-plt-primary-100.
 */
export function applyTonalRamp(name: string, hex: string, mode: PaletteMode): void {
  const ramp = generateTonalRamp(hex, mode)
  for (const [shade, value] of Object.entries(ramp)) {
    document.documentElement.style.setProperty(`--dt_color-plt-${name}-${shade}`, value)
  }
}
