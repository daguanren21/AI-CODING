import { describe, expect, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useBuyerCenterStore } from '../buyerCenterStore'
import { mockBuyerDashboardPayload } from '../../mocks/buyerCenter'

vi.mock('../../api/buyerCenter', () => ({
  fetchBuyerDashboard: vi.fn(),
}))

const { fetchBuyerDashboard } = await import('../../api/buyerCenter')

describe('useBuyerCenterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('fetches dashboard data and populates state', async () => {
    ;(fetchBuyerDashboard as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockBuyerDashboardPayload)
    const store = useBuyerCenterStore()

    await store.fetchDashboard()

    expect(store.payload).not.toBeNull()
    expect(store.helpDeskItems).toHaveLength(mockBuyerDashboardPayload.helpDesk.data.data.length)
    expect(store.inventoryAgeXAxis.length).toBeGreaterThan(0)
    expect(store.hasLoaded).toBe(true)
    expect(store.error).toBeNull()
  })

  it('calculates notice rows based on height', () => {
    const store = useBuyerCenterStore()
    store.setHelpDeskHeight(200)
    expect(store.noticeVisibleCount).toBeGreaterThan(0)
    store.setHelpDeskHeight(52 * 10)
    expect(store.noticeVisibleCount).toBe(7)
  })
})
