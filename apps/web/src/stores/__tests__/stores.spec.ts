import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBaseInfoStore } from '../baseInfoStore'
import { useTodoOverviewStore } from '../todoOverviewStore'
import * as baseInfoApi from '../../api/baseInfo'
import * as todoApi from '../../api/todoOverview'
import { mockBaseInfoState } from '../../components/base-info/baseInfoData'
import { mockDueSoonModule, mockTodoCards } from '../../components/todo-overview/todoOverviewData'

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads base info data successfully', async () => {
    const store = useBaseInfoStore()
    const spy = vi.spyOn(baseInfoApi, 'fetchBaseInfo').mockResolvedValueOnce(mockBaseInfoState)
    await store.loadBaseInfo()
    expect(spy).toHaveBeenCalled()
    expect(store.baseInfo.user.name).toBe(mockBaseInfoState.user.name)
    expect(store.hasLoaded).toBe(true)
    expect(store.error).toBeNull()
  })

  it('captures base info errors', async () => {
    const store = useBaseInfoStore()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(baseInfoApi, 'fetchBaseInfo').mockRejectedValueOnce(new Error('network error'))
    await store.loadBaseInfo()
    expect(store.error).toBe('加载基础信息失败')
    consoleSpy.mockRestore()
  })

  it('skips duplicate base info requests while loading', async () => {
    const store = useBaseInfoStore()
    store.loading = true
    const spy = vi.spyOn(baseInfoApi, 'fetchBaseInfo')
    await store.loadBaseInfo()
    expect(spy).not.toHaveBeenCalled()
  })

  it('loads todo overview data successfully', async () => {
    const store = useTodoOverviewStore()
    vi.spyOn(todoApi, 'fetchTodoOverview').mockResolvedValueOnce({
      cards: mockTodoCards,
      dueSoon: mockDueSoonModule,
    })
    await store.loadTodoOverview()
    expect(store.cards).toHaveLength(mockTodoCards.length)
    expect(store.dueSoon.title).toBe(mockDueSoonModule.title)
    expect(store.error).toBeNull()
    expect(store.hasLoaded).toBe(true)
  })

  it('captures todo overview errors', async () => {
    const store = useTodoOverviewStore()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(todoApi, 'fetchTodoOverview').mockRejectedValueOnce(new Error('fail'))
    await store.loadTodoOverview()
    expect(store.error).toBe('加载待办数据失败')
    consoleSpy.mockRestore()
  })

  it('skips duplicate todo overview requests while loading', async () => {
    const store = useTodoOverviewStore()
    store.loading = true
    const spy = vi.spyOn(todoApi, 'fetchTodoOverview')
    await store.loadTodoOverview()
    expect(spy).not.toHaveBeenCalled()
  })
})
