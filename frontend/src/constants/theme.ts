export const Theme = {
  LIGHT: 'LIGHT',
    DARK: 'DARK',
} as const;

export type ThemeType = keyof typeof Theme;