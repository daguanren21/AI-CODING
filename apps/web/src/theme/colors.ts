export const themeColors = {
  headerBg: '#050506',
  primaryText: '#FFFFFF',
  secondaryText: '#CBCBCB',
  divider: '#E5E5E5',
  inputBg: '#F4F5F7',
  accent: '#4E6AFF',
} as const

export type ThemeColorKey = keyof typeof themeColors