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
import type { CustomThemeValues } from "@/store/customThemeStore";
import type { ResolvedSlackTheme } from "@/components/SlackSidebarPreview";

interface TopNavOverride {
  top_nav_bg?: string;
  top_nav_text?: string;
}

interface ResolveSlackThemeOptions {
  mode?: "light" | "dark";
  themeMode?: string;
  themeName?: string;
  customValues?: CustomThemeValues;
  topNavOverride?: TopNavOverride;
}

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

const isFilledHex = (value: unknown) =>
  typeof value === "string" && /^#?[0-9a-f]{3,8}$/i.test(value);

/** True if `values` has every key a fully custom (non-IA) theme needs. */
export function isCustomTheme(values: CustomThemeValues | undefined) {
  const record = values as unknown as Record<string, unknown> | undefined;
  return !!(
    record &&
    CUSTOM_KEYS.every((key) => isFilledHex(record[key])) &&
    ["top_nav_bg", "top_nav_text"].every(
      (key) => record[key] === undefined || isFilledHex(record[key])
    )
  );
}

/** True if `values` at least has a valid top-nav override (IA theming). */
export function isIaTheme(values: TopNavOverride | undefined) {
  const record = values as Record<string, unknown> | undefined;
  return !!(record && ["top_nav_bg", "top_nav_text"].every((key) => isFilledHex(record[key])));
}

/**
 * Fill in the derived fields (top_nav_bg/top_nav_text/badge_text_color) for
 * a user-supplied custom palette, the same way Slack's client does.
 */
export function convertCustomThemeToTheme(
  customValues: CustomThemeValues,
  topNavOverride?: TopNavOverride
): ResolvedSlackTheme {
  const topNavText = topNavOverride?.top_nav_text || customValues.text_color;
  const topNavBg =
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
 */
export function resolveSlackTheme({
  mode = "dark",
  themeMode = ThemeMode.DEFAULT,
  themeName = ThemeName.DEFAULT,
  customValues,
  topNavOverride,
}: ResolveSlackThemeOptions = {}): ResolvedSlackTheme {
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