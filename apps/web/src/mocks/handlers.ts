import { http, HttpResponse } from 'msw'
import { mockBaseInfoState } from '../components/base-info/baseInfoData'
import { mockDueSoonModule, mockTodoCards } from '../components/todo-overview/todoOverviewData'

export const handlers = [
  http.get('/api/base-info', async () => {
    return HttpResponse.json(mockBaseInfoState)
  }),
  http.get('/api/todo-overview', async () => {
    return HttpResponse.json({
      cards: mockTodoCards,
      dueSoon: mockDueSoonModule,
    })
  }),
]

