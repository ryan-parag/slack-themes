/**
 * slackThemeColors.js
 *
 * Standalone color-math helpers used to build and preview Slack sidebar
 * themes. No dependencies — safe to drop into any JS/TS React app.
 *
 * All colors in and out are hex strings, e.g. "#3F0E40" (3, 6, or 8 digit
 * hex, with or without a leading "#").
 */

/** Convert a hex color string to an [r, g, b] (or [r, g, b, a]) array. */
export function hexToRGB(hex) {
  if (!hex) return null;
  const clean = hex[0] === "#" ? hex.slice(1) : hex;
  const value = parseInt(clean, 16);
  const hasAlpha = clean.length > 6;
  const rgb = [(value >> 16) & 255, (value >> 8) & 255, 255 & value];
  return hasAlpha ? [(value >> 24) & 255, ...rgb] : rgb;
}

/** Convert an [r, g, b] (or [r, g, b, a]) array back to a hex string. */
export function rgbToHex(channels) {
  const hex = channels
    .map((c) => {
      const h = c.toString(16);
      return h.length === 1 ? `0${h}` : h;
    })
    .join("")
    .toUpperCase();
  return `#${hex}`;
}

/** Blend two hex colors together. weight=1 -> all colorA, weight=0 -> all colorB. */
export function mixColors(colorA, colorB, weight = 0.5) {
  const a = hexToRGB(colorA);
  const b = hexToRGB(colorB);
  const mixed = a.map((channel, i) => Math.round(channel * weight + b[i] * (1 - weight)));
  return `rgb(${mixed.join(",")})`;
}

/** Same as mixColors but returns a hex string instead of an rgb() string. */
export function mixColorsToHex(colorA, colorB, weight = 0.5) {
  const a = hexToRGB(colorA);
  const b = hexToRGB(colorB);
  const mixed = a.map((channel, i) => Math.round(channel * weight + b[i] * (1 - weight)));
  return rgbToHex(mixed);
}

/** Apply an alpha channel to a hex color, returning an rgba() string. */
export function setOpacity(hex, alpha) {
  if (!hex || alpha == null) return null;
  const [r, g, b] = hexToRGB(hex).slice(0, 3);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Darken a hex color by subtracting `amount` (0-255) from each channel. */
export function darkenHex(hex, amount, { outputHex = false } = {}) {
  const rgb = hexToRGB(hex).map((c) => Math.min(Math.max(c - amount, 0), 255));
  return outputHex ? rgbToHex(rgb) : `rgb(${rgb.join(",")})`;
}

/** Lighten a hex color by adding `amount` (0-255) to each channel. */
export function lightenHex(hex, amount, { outputHex = false } = {}) {
  const rgb = hexToRGB(hex).map((c) => Math.max(Math.min(c + amount, 255), 0));
  return outputHex ? rgbToHex(rgb) : `rgb(${rgb.join(",")})`;
}

/** WCAG-style relative luminance of a hex color, 0 (black) to 1 (white). */
export function relativeLuminance(hex) {
  if (!hex) return 0;
  const component = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = hexToRGB(hex);
  return 0.2126 * component(r) + 0.7152 * component(g) + 0.0722 * component(b);
}

/** WCAG contrast ratio between two hex colors (1 = no contrast, 21 = max). */
export function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexA);
  const lumB = relativeLuminance(hexB);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/** Whether a light (#fff) or dark (#1d1c1d) foreground reads better on this background. */
export function shouldUseLightForeground(backgroundHex) {
  return contrastRatio(backgroundHex, "#ffffff") > contrastRatio(backgroundHex, "#1d1c1d");
}

const HEX6 = /^#?[A-Fa-f0-9]{6}$/;
const HEX8 = /^#?[A-Fa-f0-9]{8}$/;

/** Normalize a hex string: uppercase, expand shorthand, optionally require/pad alpha. */
export function normalizeColor(hex, withAlpha = false) {
  if (!hex) return undefined;
  let value = hex.trim().toUpperCase();
  if (value[0] === "#") value = value.slice(1);
  if (value.length === 3 || (value.length === 4 && withAlpha)) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (withAlpha && value.length === 6) value = `${value}FF`;
  const pattern = withAlpha ? HEX8 : HEX6;
  return pattern.test(value) ? value : undefined;
}

/** Loose validity check used for theme-color form inputs. */
export function isValidColor(hex) {
  return !!hex && typeof hex === "string" && /^#?([0-9a-f]{6})$/i.test(hex);
}