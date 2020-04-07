import defaultTheme from './index';

export const lightTheme = {
  disabledColor: `${defaultTheme.neutral.grey2}`,
  hoverBg:       `${defaultTheme.neutral.grey0}`,
  hoverText:     `${defaultTheme.primary.color7}`,
  overlay:       'rgba(0,0,0,0.35)',
  primary:       `${defaultTheme.primary.color5}`,
  primaryTint:   `${defaultTheme.primary.color2}`,
  primaryShade:  `${defaultTheme.primary.color8}`,
  rootBg:        `${defaultTheme.neutral.grey0}`,
  rootColor:     `${defaultTheme.neutral.grey8}`,
  subtle:        `${defaultTheme.subtle}`,
  textColor:     `${defaultTheme.neutral.grey4}`,
  transparent:   'rgba(255,255,255,0.8)'
}

export const darkTheme = {
  disabledColor: `${defaultTheme.neutral.grey3}`,
  hoverBg:       `${defaultTheme.neutral.grey8}`,
  hoverText:     `${defaultTheme.primary.color2}`,
  overlay:       'rgba(0,0,0,0.65)',
  primary:       `${defaultTheme.primary.color6}`,
  primaryTint:   `${defaultTheme.primary.color10}`,
  primaryShade:  `${defaultTheme.primary.color2}`,
  rootBg:        `${defaultTheme.neutral.grey7}`,
  rootColor:     `${defaultTheme.neutral.grey0}`,
  subtle:        `${defaultTheme.neutral.grey8}`,
  textColor:     `${defaultTheme.neutral.grey3}`,
  transparent:   'rgba(0,0,0,0.6)'
}