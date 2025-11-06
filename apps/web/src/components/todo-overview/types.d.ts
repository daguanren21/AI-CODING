export type ToDoSimpleItemStyle = 'normal' | 'highlight'

export interface ITodoCard {
  num: number
  title: string
  icon: string
}

export type TodoStatusTone = 'critical' | 'warning'

export interface IToDoListModuleItem {
  title: string
  url: string
  countdownDesc: string
  meta?: string
  icon?: string
  tag: {
    label: string
    tone: TodoStatusTone
  }
}

export interface IToDoListModule {
  title: string
  total: number
  icon: string
  url?: string
  items: IToDoListModuleItem[]
  groupSize?: number
}
