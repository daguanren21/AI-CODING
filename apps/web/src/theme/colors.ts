export const themeColors = {
  pageBg: '#F6F7FC',
  headerBg: '#050506',
  headerText: '#FFFFFF',
  headerTextSecondary: '#CBCBCB',
  headerDivider: '#E5E5E5',
  pillBg: 'rgba(255, 255, 255, 0.1)',
  pillHighlight: 'rgba(255, 255, 255, 0.18)',
  inputBg: '#FFFFFF',
  accent: '#4E6AFF',
} as const

export type ThemeColorKey = keyof typeof themeColors
