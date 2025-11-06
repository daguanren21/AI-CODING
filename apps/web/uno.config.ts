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
  'todo-heading': themeColors.todoHeadingText,
  'todo-subheading': themeColors.todoSubheadingText,
  'todo-text': themeColors.todoText,
  'todo-muted': themeColors.todoMuted,
  'todo-icon': themeColors.todoIconBg,
  'todo-card-start': themeColors.todoCardGradientStart,
  'todo-card-end': themeColors.todoCardGradientEnd,
  'todo-card-border-active': themeColors.todoCardBorderActive,
  'todo-card-shadow': themeColors.todoCardShadow,
  'todo-panel-start': themeColors.todoPanelGradientStart,
  'todo-panel-end': themeColors.todoPanelGradientEnd,
  'todo-panel-border': themeColors.todoPanelBorder,
  'todo-panel-shadow': themeColors.todoPanelShadow,
  'todo-due-item-bg': themeColors.todoDueItemBg,
  'todo-due-item-border': themeColors.todoDueItemBorder,
  'todo-due-item-meta': themeColors.todoDueItemMeta,
  'todo-countdown-critical-bg': themeColors.todoCountdownCriticalBg,
  'todo-countdown-critical-text': themeColors.todoCountdownCriticalText,
  'todo-countdown-warning-bg': themeColors.todoCountdownWarningBg,
  'todo-countdown-warning-text': themeColors.todoCountdownWarningText,
  'todo-indicator-active': themeColors.todoIndicatorActive,
  'todo-indicator-inactive': themeColors.todoIndicatorInactive,
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
  --todo-heading: ${themeColors.todoHeadingText};
  --todo-subheading: ${themeColors.todoSubheadingText};
  --todo-text: ${themeColors.todoText};
  --todo-muted: ${themeColors.todoMuted};
  --todo-icon-bg: ${themeColors.todoIconBg};
  --todo-card-start: ${themeColors.todoCardGradientStart};
  --todo-card-end: ${themeColors.todoCardGradientEnd};
  --todo-card-shadow: ${themeColors.todoCardShadow};
  --todo-card-border-active: ${themeColors.todoCardBorderActive};
  --todo-panel-start: ${themeColors.todoPanelGradientStart};
  --todo-panel-end: ${themeColors.todoPanelGradientEnd};
  --todo-panel-border: ${themeColors.todoPanelBorder};
  --todo-panel-shadow: ${themeColors.todoPanelShadow};
 --todo-due-item-bg: ${themeColors.todoDueItemBg};
  --todo-due-item-border: ${themeColors.todoDueItemBorder};
  --todo-due-item-meta: ${themeColors.todoDueItemMeta};
  --todo-countdown-critical-bg: ${themeColors.todoCountdownCriticalBg};
  --todo-countdown-critical-text: ${themeColors.todoCountdownCriticalText};
  --todo-countdown-warning-bg: ${themeColors.todoCountdownWarningBg};
  --todo-countdown-warning-text: ${themeColors.todoCountdownWarningText};
  --todo-indicator-active: ${themeColors.todoIndicatorActive};
  --todo-indicator-inactive: ${themeColors.todoIndicatorInactive};
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
    ["todo-yahei", "font-['Microsoft_YaHei','PingFang_SC','HarmonyOS_Sans','Source_Han_Sans_SC','Segoe_UI',sans-serif]"],
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
    [
      'todo-overview-shell',
      'flex h-[256px] w-full flex-shrink-0 items-center gap-[16px] rounded-[20px] border-[2px] border-[#ffffff] bg-[linear-gradient(180deg,#E6EDFF_-9.01%,#FFFFFF_100%)] px-[24px] py-[24px]',
    ],
    ['todo-overview-grid', 'flex h-full flex-1 flex-col gap-[24px]'],
    ['todo-overview-right', 'flex h-full flex-[0_1_320px] max-w-[320px] flex-col'],
    ['todo-overview-heading', 'flex flex-col gap-[6px]'],
    ['todo-heading', 'text-[18px] font-bold leading-[24px] text-[var(--todo-heading)]'],
    ['todo-subheading', 'text-[14px] font-normal leading-[18px] tracking-[1.12px] text-[var(--todo-subheading)]'],
    ['todo-card-grid', 'grid h-full grid-cols-5 gap-x-[16px] gap-y-[12px]'],
    [
      'todo-card',
      'relative flex h-[70px] w-[242.4px] items-center gap-[12px] overflow-hidden rounded-[8px] bg-transparent px-[12px] py-[12px] text-[var(--todo-heading)] transition-shadow',
    ],
    [
      'todo-card-hover',
      'hover:shadow-[0_2px_10px_rgba(22,54,152,0.1)] focus-visible:ring-2 focus-visible:ring-[var(--todo-card-border-active)]',
    ],
    [
      'todo-card-overlay',
      'pointer-events-none absolute inset-0 z-[0] rounded-[8px] bg-[linear-gradient(0deg,#FFFFFF_-6.5%,#EFF3FF_120.78%)] opacity-0 transition-opacity',
    ],
    ['todo-card-overlay--hover', 'group-hover:opacity-100'],
    ['todo-card-title', 'm-0 text-[14px] font-normal leading-[18px] text-[var(--todo-heading)]'],
    ['todo-card-number', 'text-[24px] font-bold leading-[24px] text-[var(--todo-heading)]'],
    ['todo-icon-box', 'relative h-[40px] w-[34.783px] flex-shrink-0'],
    [
      'todo-due-panel',
      'box-border flex h-[216px] w-full max-w-[320px] flex-col gap-[12px] rounded-[20px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_110.73%)] px-[24px] py-[16px] text-[var(--todo-heading)] shadow-[0_18px_38px_rgba(88,108,137,0.18)]',
    ],
    ['todo-due-header', 'flex items-center justify-between gap-[12px]'],
    ['todo-due-icon', 'flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[rgba(86,106,255,0.12)]'],
    ['todo-due-swiper', 'flex h-full w-full flex-col justify-between'],
    ['todo-view-all', 'inline-flex items-center gap-[4px] rounded-full border border-transparent bg-transparent px-[8px] py-[4px] text-[14px] font-normal text-[var(--todo-heading)] hover:underline'],
    ['todo-due-item', 'flex w-full items-center justify-between gap-[12px] rounded-none border-none bg-transparent px-0 py-0 text-[var(--todo-heading)]'],
    ['todo-due-title', 'text-[14px] font-normal leading-[22px] text-[var(--todo-heading)] no-underline hover:underline'],
    ['todo-meta', 'text-[12px] font-normal leading-[18px] text-[#666666]'],
    ['todo-due-countdown', 'inline-flex h-[20px] min-w-[86px] items-center justify-center rounded-[8px] px-[8px] text-[12px] font-normal leading-[16px]'],
    ['todo-countdown--critical', 'bg-[#E64545] text-white'],
    ['todo-countdown--warning', 'bg-[#FFF0E6] text-[#FF6600]'],
    ['todo-indicator', 'h-[3px] w-[16px] rounded-[100px] bg-[var(--todo-indicator-inactive)] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--todo-indicator-active)]'],
    ['todo-indicator--active', 'bg-[var(--todo-indicator-active)]'],
    ['todo-count-tag', 'flex h-[20px] min-w-[20px] items-center justify-center rounded-[4px] bg-[#FFF0E6] px-[6px] text-[12px] font-normal leading-[18px] text-[#FF6600]'],
  ],
  preflights: [
    {
      getCSS: () => rootVars,
    },
    {
      getCSS: () => `
body {
  margin: 0;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'HarmonyOS Sans', 'Source Han Sans SC', 'Segoe UI', sans-serif;
  background-color: var(--page-bg);
  color: var(--header-text);
}

a {
  color: inherit;
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
