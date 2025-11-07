import { httpClient } from './client'
import type { ITodoCard, IToDoListModule } from '../components/todo-overview/types'

export interface TodoOverviewResponse {
  cards: ITodoCard[]
  dueSoon: IToDoListModule
}

export const fetchTodoOverview = async () => {
  const { data } = await httpClient.get<TodoOverviewResponse>('/todo-overview')
  return data
}

