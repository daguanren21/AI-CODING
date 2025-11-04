import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'
import { themeColors } from './src/theme/colors'

const unoThemeColors = {
  page: themeColors.pageBg,
  header: themeColors.headerBg,
  'header-text': themeColors.headerText,
  'header-muted': themeColors.headerTextSecondary,
  'header-divider': themeColors.headerDivider,
  'pill': themeColors.pillBg,
  'pill-highlight': themeColors.pillHighlight,
  accent: themeColors.accent,
}

const rootVars = `
:root {
  --page-bg: ${themeColors.pageBg};
  --header-bg: ${themeColors.headerBg};
  --header-text: ${themeColors.headerText};
  --header-text-secondary: ${themeColors.headerTextSecondary};
  --header-divider: ${themeColors.headerDivider};
  --pill-bg: ${themeColors.pillBg};
  --pill-highlight: ${themeColors.pillHighlight};
  --input-bg: ${themeColors.inputBg};
  --accent: ${themeColors.accent};
}
`

export default defineConfig({
  theme: {
    colors: unoThemeColors,
  },
  presets: [presetWind3(), presetAttributify(), presetIcons()],
  shortcuts: [
    ['bg-page', 'bg-[var(--page-bg)]'],
    ['bg-header', 'bg-[var(--header-bg)]'],
    ['text-header', 'text-[var(--header-text)]'],
    ['text-header-muted', 'text-[var(--header-text-secondary)]'],
    ['pill-base', 'rounded-full bg-[var(--pill-bg)] text-[var(--header-text)]'],
    ['pill-highlight', 'rounded-full bg-[var(--pill-highlight)] text-[var(--header-text)]'],
    ['action-icon', 'w-[36px] h-[36px] flex items-center justify-center border border-white/20 rounded-full text-white'],
    ['divider-line', 'w-px h-[14px] bg-[var(--header-divider)]'],
  ],
  preflights: [
    {
      getCSS: () => rootVars,
    },
    {
      getCSS: () => `
body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--page-bg);
  color: var(--header-text);
}
      `,
    },
  ],
})
