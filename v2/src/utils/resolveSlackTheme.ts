/**
 * resolveSlackTheme.js
 *
 * Re-implementation of the theme-resolution logic Slack's client uses to
 * turn a user's preferences (built-in theme name, custom hex values, top
 * nav override, light/dark mode) into the final flat color palette the
 * sidebar renders with.
 */

import { contrastRatio } from "./slackThemeColors";
import { ThemeMode, ThemeName, LIGHT_PRESETS, DARK_PRESETS } from "./slackThemePresets";

const CUSTOM_KEYS = [
  "column_bg",
  "menu_bg",
  "active_item",
  "active_item_text",
  "hover_item",
  "text_color",
  "active_presence",
  "badge",
];

const isFilledHex = (value) =>
  typeof value === "string" && /^#?[0-9a-f]{3,8}$/i.test(value);

/** True if `values` has every key a fully custom (non-IA) theme needs. */
export function isCustomTheme(values) {
  return !!(
    values &&
    CUSTOM_KEYS.every((key) => isFilledHex(values[key])) &&
    ["top_nav_bg", "top_nav_text"].every(
      (key) => values[key] === undefined || isFilledHex(values[key])
    )
  );
}

/** True if `values` at least has a valid top-nav override (IA theming). */
export function isIaTheme(values) {
  return !!(values && ["top_nav_bg", "top_nav_text"].every((key) => isFilledHex(values[key])));
}

/**
 * Fill in the derived fields (top_nav_bg/top_nav_text/badge_text_color) for
 * a user-supplied custom palette, the same way Slack's client does.
 */
export function convertCustomThemeToTheme(customValues, topNavOverride) {
  const topNavText =
    customValues.top_nav_text || topNavOverride?.top_nav_text || customValues.text_color;
  const topNavBg =
    customValues.top_nav_bg ||
    topNavOverride?.top_nav_bg ||
    (contrastRatio(customValues.text_color, customValues.menu_bg) >= 4.5
      ? customValues.menu_bg
      : customValues.column_bg);

  return {
    column_bg: customValues.column_bg,
    menu_bg: customValues.menu_bg,
    active_item: customValues.active_item,
    active_item_text: customValues.active_item_text,
    hover_item: customValues.hover_item,
    text_color: customValues.text_color,
    active_presence: customValues.active_presence,
    badge: customValues.badge,
    top_nav_bg: topNavBg,
    top_nav_text: topNavText,
    badge_text_color: "#FFFFFF",
  };
}

/**
 * Resolve a user's theme preferences into the final palette object the
 * sidebar (and top nav) should render with. Mirrors Slack's `ze` selector.
 *
 * @param {Object} options
 * @param {"light"|"dark"} [options.mode="dark"] Workspace color scheme.
 * @param {string} [options.themeMode=ThemeMode.DEFAULT] One of ThemeMode.*.
 *   Use ThemeMode.CUSTOM when the user has picked a fully custom palette.
 * @param {string} [options.themeName=ThemeName.DEFAULT] One of ThemeName.*,
 *   used when themeMode isn't CUSTOM/WORKSPACE_DEFAULT/ORG_DEFAULT.
 * @param {Object} [options.customValues] Custom hex values (column_bg, etc.)
 *   Required when themeMode is ThemeMode.CUSTOM.
 * @param {Object} [options.topNavOverride] Optional separate top-nav colors
 *   ({ top_nav_bg, top_nav_text }), for workspaces that theme the top bar
 *   independently of the sidebar.
 * @returns {Object} The resolved palette, e.g. { column_bg, menu_bg, ... }.
 */
export function resolveSlackTheme({
  mode = "dark",
  themeMode = ThemeMode.DEFAULT,
  themeName = ThemeName.DEFAULT,
  customValues,
  topNavOverride,
} = {}) {
  const presets = mode === "dark" ? DARK_PRESETS : LIGHT_PRESETS;
  const basePalette = presets[ThemeName.DEFAULT];

  const customPalette =
    customValues && isCustomTheme(customValues)
      ? convertCustomThemeToTheme(customValues, topNavOverride)
      : undefined;

  // A fully custom theme wins outright.
  if (themeMode === ThemeMode.CUSTOM) {
    return customPalette || basePalette;
  }

  // workspace_default / org_default defer to whatever the org configured
  // (represented here by customPalette if one was supplied) or fall back.
  if (themeMode === ThemeMode.WORKSPACE_DEFAULT || themeMode === ThemeMode.ORG_DEFAULT) {
    return customPalette || basePalette;
  }

  // Otherwise we're picking a named theme (built-in or "default").
  if (themeName === ThemeMode.DEFAULT || themeName === ThemeName.DEFAULT) {
    return basePalette;
  }

  return presets[themeName] || customPalette || basePalette;
}