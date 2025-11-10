export const IsReply = {
  UNREPLIED: 0,
  REPLIED: 1,
} as const
export type IsReplyValue = (typeof IsReply)[keyof typeof IsReply]

export const IsRead = {
  UNREAD: 0,
  READ: 1,
} as const
export type IsReadValue = (typeof IsRead)[keyof typeof IsRead]

export const MakeSureStatus = {
  YES: '1',
  NO: '0',
} as const
export type MakeSureStatusValue = (typeof MakeSureStatus)[keyof typeof MakeSureStatus]

export const InventoryAgeStyle = {
  DEFAULT: 'default',
  HIGHLIGHT: 'highlight',
  WARNING: 'warning',
} as const
export type InventoryAgeStyleValue = (typeof InventoryAgeStyle)[keyof typeof InventoryAgeStyle]
