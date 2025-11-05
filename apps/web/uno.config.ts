import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'
import { themeColors } from './src/theme/colors'

const unoThemeColors = {
  page: themeColors.pageBg,
  header: themeColors.headerBg,
  'header-text': themeColors.headerText,
  'header-muted': themeColors.headerTextSecondary,
  'header-divider': themeColors.headerDivider,
  pill: themeColors.pillBg,
  'pill-highlight': themeColors.pillHighlight,
  accent: themeColors.accent,
  'card-bg': themeColors.cardBg,
  'card-bg-muted': themeColors.cardBgMuted,
  'card-border': themeColors.cardBorder,
  'accent-soft': themeColors.accentSoft,
  'base-info-start': themeColors.baseInfoGradientStart,
  'base-info-end': themeColors.baseInfoGradientEnd,
  'base-info-text': themeColors.baseInfoTextPrimary,
  'base-info-muted': themeColors.baseInfoTextMuted,
  'giga-accent': themeColors.gigaAccent,
  'beans-gold': themeColors.beansGold,
  'manager-text': themeColors.managerText,
  'metric-accent': themeColors.metricAccent,
  'manager-card-bg': themeColors.managerCardBg,
  'manager-card-title-bg': themeColors.managerCardTitleBg,
  'manager-card-title-text': themeColors.managerCardTitleText,
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
  --card-bg: ${themeColors.cardBg};
  --card-bg-muted: ${themeColors.cardBgMuted};
  --card-border: ${themeColors.cardBorder};
  --accent-soft: ${themeColors.accentSoft};
  --base-info-gradient-start: ${themeColors.baseInfoGradientStart};
  --base-info-gradient-end: ${themeColors.baseInfoGradientEnd};
  --base-info-text: ${themeColors.baseInfoTextPrimary};
  --base-info-muted: ${themeColors.baseInfoTextMuted};
  --giga-accent: ${themeColors.gigaAccent};
  --beans-gold: ${themeColors.beansGold};
  --manager-text: ${themeColors.managerText};
  --metric-accent: ${themeColors.metricAccent};
  --manager-card-bg: ${themeColors.managerCardBg};
  --manager-card-title-bg: ${themeColors.managerCardTitleBg};
  --manager-card-title-text: ${themeColors.managerCardTitleText};
  --manager-card-shadow: ${themeColors.managerCardShadow};
  --manager-border: ${themeColors.managerBorder};
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
    [
      'card-surface',
      'rounded-2xl bg-[var(--card-bg)] shadow-[0_12px_24px_rgba(15,23,42,0.08)] border border-[var(--card-border)]',
    ],
    ['card-surface-muted', 'rounded-2xl bg-[var(--card-bg-muted)] border border-transparent'],
    [
      'base-info-surface',
      'rounded-[24px] bg-gradient-to-r from-[var(--base-info-gradient-start)] to-[var(--base-info-gradient-end)] text-[var(--base-info-text)] px-[24px] py-[24px] md:px-[32px] md:py-[28px]',
    ],
    ['summary-grid', 'flex flex-col gap-[16px]'],
    ['summary-right', 'flex flex-wrap items-center gap-[12px] text-[14px] text-[var(--manager-text)]'],
    ['info-divider', 'inline-block w-px h-[20px] bg-white/25 mx-[12px]'],
    ['id-chip', 'inline-flex items-center gap-[6px] rounded-full bg-white/10 px-[12px] py-[4px] text-[14px] text-[var(--base-info-text)]'],
    ['id-badge', 'inline-flex items-center justify-center min-w-[24px] h-[18px] rounded-[6px] bg-[var(--giga-accent)] text-white text-[12px] font-semibold px-[6px]'],
    ['metric-link', 'group inline-flex items-center gap-[4px] border-none bg-transparent p-0 text-[14px] text-[var(--base-info-text)] cursor-pointer'],
    ['metric-content', 'inline-flex items-baseline gap-[6px] text-[var(--metric-accent)] decoration-[var(--metric-accent)] group-hover:underline'],
    ['metric-unit', 'text-[14px] text-[var(--metric-accent)]'],
    ['manager-trigger', 'metric-link gap-[6px] text-[var(--manager-text)]'],
    ['level-pill', 'inline-flex items-center gap-[4px] rounded-full bg-white/10 px-[10px] py-[2px] text-[12px] uppercase tracking-[0.12em]'],
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

.manager-popover {
  border: 1px solid var(--manager-border);
  border-radius: 22px;
  padding: 6px;
  box-shadow: var(--manager-card-shadow);
  background: transparent;
}
      `,
    },
  ],
})
