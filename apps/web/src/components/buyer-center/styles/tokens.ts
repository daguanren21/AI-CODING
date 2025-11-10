export const buyerCenterTypography = {
  heading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 600,
    fontFamily: "'Alibaba PuHuiTi','Microsoft YaHei','PingFang SC',sans-serif",
  },
  subheading: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
    fontFamily: "'Microsoft YaHei','PingFang SC',sans-serif",
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
    fontFamily: "'Microsoft YaHei','PingFang SC',sans-serif",
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
    fontFamily: "'Microsoft YaHei','PingFang SC',sans-serif",
  },
} as const

export const buyerCenterSpacing = {
  cardPadding: 24,
  sectionGap: 16,
  columnGap: 24,
  rowGap: 16,
  gridGap: 12,
} as const

export const buyerCenterRadius = {
  card: 24,
  pill: 12,
  chip: 100,
  bar: 4,
} as const

export const buyerCenterElevation = {
  cardShadow: "var(--buyer-card-shadow)",
} as const
