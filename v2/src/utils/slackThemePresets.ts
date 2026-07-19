/**
 * slackThemePresets.js
 *
 * The palette data behind Slack's built-in sidebar themes, plus the small
 * set of enums used to talk about "which theme" / "which mode" a user has
 * picked. Reconstructed from Slack's client bundle for use in a
 * theme-preview / theme-builder app — not affiliated with or endorsed by
 * Slack.
 *
 * Each palette is a flat object of hex colors:
 *   column_bg          background of the channel list column
 *   menu_bg             background of the top-level workspace menu
 *   active_item         background of the selected channel/DM row
 *   active_item_text    text color on the selected row
 *   hover_item           row background on hover
 *   text_color           default sidebar text color
 *   active_presence      "online" presence dot color
 *   badge                unread-count badge background
 *   badge_text_color     unread-count badge text color
 *   top_nav_bg            background of the top nav bar (IA themes only)
 *   top_nav_text          text color of the top nav bar (IA themes only)
 */

/** How the active theme was chosen. */
export const ThemeMode = {
  CUSTOM: "custom_theme",
  DEFAULT: "default",
  WORKSPACE_DEFAULT: "workspace_default",
  ORG_DEFAULT: "org_default",
};

/** Names of Slack's built-in preset themes. */
export const ThemeName = {
  DEFAULT: "default_theme",
  AUBERGINE_BRIGHT: "aubergine_bright",
  AUBERGINE_CLASSIC: "aubergine_classic_theme",
  HOTH: "hoth_theme",
  MONUMENT: "monument_theme",
  CHOCOLATE: "chocolate_theme",
  OCEAN: "ocean_theme",
  WORKHARD: "workhard_theme",
  NOCTURNE: "nocturne_theme",
  SOLANUM: "solanum_theme",
  BRINJAL: "brinjal_theme",
  BANANA: "banana_theme",
  SWEET_TREAT: "sweet_treat_theme",
  MOOD_INDIGO: "mood_indigo_theme",
  EGGPLANT: "eggplant_theme",
  CMYK: "cmyk_theme",
  MONDRIAN: "mondrian_theme",
  TERMINAL: "terminal_theme",
  EXPENSIVE: "expensive_theme",
  ULTRAVIOLET: "ultraviolet_theme",
  DISCOTHEQUE: "discotheque_theme",
  HABERDASHERY: "haberdashery_theme",
  // light-mode-only presets
  COTTON: "cotton_theme",
  ECO: "eco_theme",
};

const light = (overrides) => ({
  badge_text_color: "#FFFFFF",
  ...overrides,
});

/** Palettes as they render when the workspace is in light mode. */
export const LIGHT_PRESETS = {
  [ThemeName.DEFAULT]: light({
    column_bg: "#3F0E40",
    menu_bg: "#350D36",
    active_item: "#1164A3",
    active_item_text: "#FFFFFF",
    hover_item: "#4D2A51",
    text_color: "#FFFFFF",
    active_presence: "#2BAC76",
    badge: "#CD2553",
    top_nav_bg: "#350D36",
    top_nav_text: "#FFFFFF",
  }),
  [ThemeName.AUBERGINE_CLASSIC]: light({
    column_bg: "#4D394B", menu_bg: "#3E313C", active_item: "#4C9689",
    active_item_text: "#FFFFFF", hover_item: "#3E313C", text_color: "#FFFFFF",
    active_presence: "#38978D", badge: "#EB4D5C", top_nav_bg: "#3E313C", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.HOTH]: light({
    column_bg: "#F8F8FA", menu_bg: "#F8F8FA", active_item: "#2D9EE0",
    active_item_text: "#FFFFFF", hover_item: "#FFFFFF", text_color: "#383F45",
    active_presence: "#60D156", badge: "#DC5960", top_nav_bg: "#F8F8FA", top_nav_text: "#383F45",
  }),
  [ThemeName.MONUMENT]: light({
    column_bg: "#0D7E83", menu_bg: "#076570", active_item: "#F79F66",
    active_item_text: "#FFFFFF", hover_item: "#D37C71", text_color: "#FFFFFF",
    active_presence: "#F79F66", badge: "#F15340", top_nav_bg: "#076570", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.CHOCOLATE]: light({
    column_bg: "#544538", menu_bg: "#42362B", active_item: "#5DB09D",
    active_item_text: "#FFFFFF", hover_item: "#4A3C30", text_color: "#FFFFFF",
    active_presence: "#FFFFFF", badge: "#5DB09D", top_nav_bg: "#42362B", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.OCEAN]: light({
    column_bg: "#303E4D", menu_bg: "#2C3849", active_item: "#6698C8",
    active_item_text: "#FFFFFF", hover_item: "#4A5664", text_color: "#FFFFFF",
    active_presence: "#94E864", badge: "#78AF8F", top_nav_bg: "#2C3849", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.WORKHARD]: light({
    column_bg: "#4D5250", menu_bg: "#444A47", active_item: "#D39B46",
    active_item_text: "#FFFFFF", hover_item: "#434745", text_color: "#FFFFFF",
    active_presence: "#99D04A", badge: "#DB6668", top_nav_bg: "#444A47", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.NOCTURNE]: light({
    column_bg: "#1A1D21", menu_bg: "#000000", active_item: "#0576B9",
    active_item_text: "#FFFFFF", hover_item: "#000000", text_color: "#FFFFFF",
    active_presence: "#39E500", badge: "#CC4400", top_nav_bg: "#000000", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.SOLANUM]: light({
    column_bg: "#4F2F4C", menu_bg: "#452842", active_item: "#8C5888",
    active_item_text: "#FFFFFF", hover_item: "#1C0B1A", text_color: "#FFFFFF",
    active_presence: "#D0FF00", badge: "#889100", top_nav_bg: "#452842", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.BRINJAL]: light({
    column_bg: "#4F2F4C", menu_bg: "#452842", active_item: "#8C5888",
    active_item_text: "#FFFFFF", hover_item: "#1C0B1A", text_color: "#FFFFFF",
    active_presence: "#00FFB7", badge: "#DE4C0D", top_nav_bg: "#452842", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.COTTON]: light({
    column_bg: "#BB6A76", menu_bg: "#AD5B67", active_item: "#62B791",
    active_item_text: "#FFFFFF", hover_item: "#A5516A", text_color: "#FFFFFF",
    active_presence: "#68F798", badge: "#694464", top_nav_bg: "#AD5B67", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.ECO]: light({
    column_bg: "#86A34E", menu_bg: "#94AF63", active_item: "#FFFFFF",
    active_item_text: "#6D8B42", hover_item: "#94AF63", text_color: "#FFFFFF",
    active_presence: "#FFB10A", badge: "#DFA044", top_nav_bg: "#94AF63", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.BANANA]: light({
    column_bg: "#FFEB84", menu_bg: "#FFF8D4", active_item: "#FFC806",
    active_item_text: "#591035", hover_item: "#FFF8D4", text_color: "#591035",
    active_presence: "#4C6DC2", badge: "#DD4147", top_nav_bg: "#FFC806", top_nav_text: "#591035",
  }),
  [ThemeName.SWEET_TREAT]: light({
    column_bg: "#FFEEED", menu_bg: "#FFC2C0", active_item: "#FFC2C0",
    active_item_text: "#4A154B", hover_item: "#FFFFFF", text_color: "#4A154B",
    active_presence: "#FFA95A", badge: "#37BD8D", top_nav_bg: "#FFC2C0", top_nav_text: "#4A154B",
  }),
  [ThemeName.MOOD_INDIGO]: light({
    column_bg: "#F8F8FA", menu_bg: "#E0E7FF", active_item: "#001A5E",
    active_item_text: "#F8F8FA", hover_item: "#E0E7FF", text_color: "#001A5E",
    active_presence: "#2153FF", badge: "#2153FF", top_nav_bg: "#001A5E", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.EGGPLANT]: light({
    column_bg: "#FBFAF7", menu_bg: "#DCEEE4", active_item: "#4A154B",
    active_item_text: "#FBFAF7", hover_item: "#DCEEE4", text_color: "#4A154B",
    active_presence: "#2BAC76", badge: "#BD3855", top_nav_bg: "#4A154B", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.CMYK]: light({
    column_bg: "#F2F4F7", menu_bg: "#FFE600", active_item: "#35C2FF",
    active_item_text: "#FFFFFF", hover_item: "#FFE600", text_color: "#151834",
    active_presence: "#35C2FF", badge: "#E71FA3", top_nav_bg: "#E71FA3", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.MONDRIAN]: light({
    column_bg: "#FFFFFF", menu_bg: "#FFC806", active_item: "#000000",
    active_item_text: "#FFFFFF", hover_item: "#FFC806", text_color: "#000000",
    active_presence: "#000000", badge: "#FD0B00", top_nav_bg: "#1F57E7", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.TERMINAL]: light({
    column_bg: "#1A1D21", menu_bg: "#1A2B23", active_item: "#4EE077",
    active_item_text: "#1A1D21", hover_item: "#1A2B23", text_color: "#4EE077",
    active_presence: "#4EE077", badge: "#1C913D", top_nav_bg: "#1A2B23", top_nav_text: "#4EE077",
  }),
  [ThemeName.EXPENSIVE]: light({
    column_bg: "#1A1D21", menu_bg: "#232527", active_item: "#3E4232",
    active_item_text: "#C9C49C", hover_item: "#232527", text_color: "#C9C49C",
    active_presence: "#C9C49C", badge: "#3E4233", top_nav_bg: "#C9C49C", top_nav_text: "#1A1D21",
  }),
  [ThemeName.ULTRAVIOLET]: light({
    column_bg: "#F5F5F5", menu_bg: "#F0F0F0", active_item: "#6715EB",
    active_item_text: "#FFFFFF", hover_item: "#E8E8E8", text_color: "#1A1A1A",
    active_presence: "#6715EB", badge: "#CD2553", top_nav_bg: "#6715EB", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.DISCOTHEQUE]: light({
    column_bg: "#6A1B1B", menu_bg: "#6A1B1B", active_item: "#D94422",
    active_item_text: "#FDF6E3", hover_item: "#461412", text_color: "#FFD476",
    active_presence: "#D67739", badge: "#D94422", top_nav_bg: "#461412", top_nav_text: "#FDF6E3",
  }),
  [ThemeName.HABERDASHERY]: light({
    column_bg: "#073642", menu_bg: "#002B36", active_item: "#7D6005",
    active_item_text: "#FDF6E3", hover_item: "#002B36", text_color: "#FDF6E3",
    active_presence: "#55D44E", badge: "#DC322F", top_nav_bg: "#002B36", top_nav_text: "#FDF6E3",
  }),
};
LIGHT_PRESETS[ThemeName.AUBERGINE_BRIGHT] = LIGHT_PRESETS[ThemeName.DEFAULT];

const dark = (overrides) => ({
  badge_text_color: "#FFFFFF",
  ...overrides,
});

/** Palettes as they render when the workspace is in dark mode. */
export const DARK_PRESETS = {
  [ThemeName.DEFAULT]: dark({
    column_bg: "#19171D", menu_bg: "#121016", active_item: "#1164A3",
    active_item_text: "#FFFFFF", hover_item: "#27242C", text_color: "#D1D2D3",
    active_presence: "#2BAC76", badge: "#CD2553", top_nav_bg: "#121016", top_nav_text: "#D1D2D3",
  }),
  [ThemeName.AUBERGINE_CLASSIC]: dark({
    column_bg: "#19171D", menu_bg: "#121016", active_item: "#4C9689",
    active_item_text: "#FFFFFF", hover_item: "#27242C", text_color: "#D1D2D3",
    active_presence: "#38978D", badge: "#EB4D5C", top_nav_bg: "#121016", top_nav_text: "#D1D2D3",
  }),
  [ThemeName.HOTH]: dark({
    column_bg: "#333333", menu_bg: "#3F3F3F", active_item: "#2D9EE0",
    active_item_text: "#FFFFFF", hover_item: "#3F3F3F", text_color: "#F8F8FA",
    active_presence: "#60D156", badge: "#DC5960", top_nav_bg: "#3F3F3F", top_nav_text: "#F8F8FA",
  }),
  [ThemeName.MONUMENT]: dark({
    column_bg: "#173438", menu_bg: "#152A2D", active_item: "#EBA270",
    active_item_text: "#FFFFFF", hover_item: "#C78074", text_color: "#FFFFFF",
    active_presence: "#EBA270", badge: "#F15340", top_nav_bg: "#152A2D", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.CHOCOLATE]: dark({
    column_bg: "#212121", menu_bg: "#353330", active_item: "#5DB09D",
    active_item_text: "#FFFFFF", hover_item: "#353330", text_color: "#FFFFFF",
    active_presence: "#FFFFFF", badge: "#5DB09D", top_nav_bg: "#353330", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.OCEAN]: dark({
    column_bg: "#1D2229", menu_bg: "#0B161E", active_item: "#537AA6",
    active_item_text: "#FFFFFF", hover_item: "#313843", text_color: "#FFFFFF",
    active_presence: "#94E864", badge: "#78AF8F", top_nav_bg: "#0B161E", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.WORKHARD]: dark({
    column_bg: "#222629", menu_bg: "#121518", active_item: "#D39B46",
    active_item_text: "#FFFFFF", hover_item: "#2C3136", text_color: "#FFFFFF",
    active_presence: "#99D04A", badge: "#DB6668", top_nav_bg: "#121518", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.NOCTURNE]: dark({
    column_bg: "#1A1D21", menu_bg: "#000000", active_item: "#0576B9",
    active_item_text: "#FFFFFF", hover_item: "#000000", text_color: "#FFFFFF",
    active_presence: "#39E500", badge: "#CC4400", top_nav_bg: "#000000", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.SOLANUM]: dark({
    column_bg: "#19171D", menu_bg: "#121016", active_item: "#5B415B",
    active_item_text: "#FFFFFF", hover_item: "#27242C", text_color: "#D1D2D3",
    active_presence: "#DAFC51", badge: "#8A902C", top_nav_bg: "#121016", top_nav_text: "#D1D2D3",
  }),
  [ThemeName.BRINJAL]: dark({
    column_bg: "#19171D", menu_bg: "#121016", active_item: "#5B415B",
    active_item_text: "#FFFFFF", hover_item: "#27242C", text_color: "#D1D2D3",
    active_presence: "#74FABC", badge: "#CE5628", top_nav_bg: "#121016", top_nav_text: "#D1D2D3",
  }),
  [ThemeName.BANANA]: dark({
    column_bg: "#1A1D21", menu_bg: "#483F1C", active_item: "#FFC806",
    active_item_text: "#1A1D21", hover_item: "#483F1C", text_color: "#FFF8D4",
    active_presence: "#3C67D6", badge: "#DD4147", top_nav_bg: "#1A1D21", top_nav_text: "#FFC806",
  }),
  [ThemeName.SWEET_TREAT]: dark({
    column_bg: "#1A1D21", menu_bg: "#3B3232", active_item: "#FFC2C0",
    active_item_text: "#1A1D21", hover_item: "#3B3232", text_color: "#FFE9E8",
    active_presence: "#FFA95A", badge: "#37BD8D", top_nav_bg: "#1A1D21", top_nav_text: "#FFC2C0",
  }),
  [ThemeName.MOOD_INDIGO]: dark({
    column_bg: "#1A1D21", menu_bg: "#2D3136", active_item: "#1F2A42",
    active_item_text: "#D8DCE8", hover_item: "#2D3136", text_color: "#D8DCE8",
    active_presence: "#2153FF", badge: "#2153FF", top_nav_bg: "#1F2A42", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.EGGPLANT]: dark({
    column_bg: "#1A1D21", menu_bg: "#121016", active_item: "#3A2D3B",
    active_item_text: "#FBFAF7", hover_item: "#27242C", text_color: "#FBFAF7",
    active_presence: "#2EB67D", badge: "#BD3855", top_nav_bg: "#4A154B", top_nav_text: "#FBFAF7",
  }),
  [ThemeName.CMYK]: dark({
    column_bg: "#20252C", menu_bg: "#0E0B01", active_item: "#6BC9FF",
    active_item_text: "#0E0B01", hover_item: "#0E0B01", text_color: "#FCEBF9",
    active_presence: "#FCE54D", badge: "#CD2553", top_nav_bg: "#D53C9F", top_nav_text: "#0E0B01",
  }),
  [ThemeName.MONDRIAN]: dark({
    column_bg: "#1A1D21", menu_bg: "#121212", active_item: "#FFC806",
    active_item_text: "#000000", hover_item: "#121212", text_color: "#FFFFFF",
    active_presence: "#FFFFFF", badge: "#FD0B00", top_nav_bg: "#1F57E7", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.TERMINAL]: dark({
    column_bg: "#1A1D21", menu_bg: "#1A2B23", active_item: "#4EE077",
    active_item_text: "#1A1D21", hover_item: "#1A2B23", text_color: "#4EE077",
    active_presence: "#4EE077", badge: "#1C913D", top_nav_bg: "#1A2B23", top_nav_text: "#4EE077",
  }),
  [ThemeName.EXPENSIVE]: dark({
    column_bg: "#1A1D21", menu_bg: "#232527", active_item: "#3E4232",
    active_item_text: "#C9C49C", hover_item: "#232527", text_color: "#C9C49C",
    active_presence: "#C9C49C", badge: "#3E4233", top_nav_bg: "#C9C49C", top_nav_text: "#1A1D21",
  }),
  [ThemeName.ULTRAVIOLET]: dark({
    column_bg: "#14101A", menu_bg: "#241D2E", active_item: "#6715EB",
    active_item_text: "#FFFFFF", hover_item: "#241D2E", text_color: "#FFFFFF",
    active_presence: "#6715EB", badge: "#CD2553", top_nav_bg: "#6715EB", top_nav_text: "#FFFFFF",
  }),
  [ThemeName.DISCOTHEQUE]: dark({
    column_bg: "#1A1D21", menu_bg: "#1A0404", active_item: "#6A1B1B",
    active_item_text: "#FFD476", hover_item: "#461412", text_color: "#D2A454",
    active_presence: "#D67739", badge: "#6A1B1B", top_nav_bg: "#461412", top_nav_text: "#FFD476",
  }),
  [ThemeName.HABERDASHERY]: dark({
    column_bg: "#011F26", menu_bg: "#01151A", active_item: "#4F400E",
    active_item_text: "#F7E7BC", hover_item: "#01151A", text_color: "#EBEDDF",
    active_presence: "#55D44E", badge: "#A30F0F", top_nav_bg: "#01151A", top_nav_text: "#EBEDDF",
  }),
};
DARK_PRESETS[ThemeName.AUBERGINE_BRIGHT] = DARK_PRESETS[ThemeName.DEFAULT];
// cotton / eco are light-mode-only presets in Slack; no dark variant exists.

/** Human-readable labels for the theme picker UI. */
export const THEME_LABELS = {
  [ThemeName.DEFAULT]: "Slack (default)",
  [ThemeName.AUBERGINE_CLASSIC]: "Aubergine",
  [ThemeName.HOTH]: "Hoth",
  [ThemeName.MONUMENT]: "Monument",
  [ThemeName.CHOCOLATE]: "Chocolate",
  [ThemeName.OCEAN]: "Ocean",
  [ThemeName.WORKHARD]: "Workhard",
  [ThemeName.NOCTURNE]: "Nocturne",
  [ThemeName.SOLANUM]: "Solanum",
  [ThemeName.BRINJAL]: "Brinjal",
  [ThemeName.BANANA]: "Banana",
  [ThemeName.SWEET_TREAT]: "Sweet Treat",
  [ThemeName.MOOD_INDIGO]: "Mood Indigo",
  [ThemeName.EGGPLANT]: "Eggplant",
  [ThemeName.CMYK]: "CMYK",
  [ThemeName.MONDRIAN]: "Mondrian",
  [ThemeName.TERMINAL]: "Terminal",
  [ThemeName.EXPENSIVE]: "Expensive",
  [ThemeName.ULTRAVIOLET]: "Ultraviolet",
  [ThemeName.DISCOTHEQUE]: "Discotheque",
  [ThemeName.HABERDASHERY]: "Haberdashery",
  [ThemeName.COTTON]: "Cotton",
  [ThemeName.ECO]: "Eco",
};