import defaultTheme from './index';

export const lightTheme = {
  rootBg: `${defaultTheme.neutral.grey0}`,
  rootColor: `${defaultTheme.neutral.grey8}`,
  textColor: `${defaultTheme.neutral.grey4}`,
  disabledColor: `${defaultTheme.neutral.grey2}`,
  subtle: `${defaultTheme.subtle}`,
  primary: `${defaultTheme.primary}`,
  transparent: 'rgba(255,255,255,0.8)',
  overlay: 'rgba(0,0,0,0.5)'
}

export const darkTheme = {
  rootBg: `${defaultTheme.neutral.grey8}`,
  rootColor: `${defaultTheme.neutral.grey0}`,
  textColor: `${defaultTheme.neutral.grey3}`,
  disabledColor: `${defaultTheme.neutral.grey5}`,
  subtle: `${defaultTheme.neutral.grey7}`,
  primary: `${defaultTheme.primary}`,
  transparent: 'rgba(0,0,0,0.8)',
  overlay: 'rgba(255,255,255,0.5)'
}