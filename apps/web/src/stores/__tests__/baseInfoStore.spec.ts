import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi } from 'vitest'
import { useBaseInfoStore } from '../baseInfoStore'
import * as api from '../../api/baseInfo'
import { mockCustomIndexDetail } from '../../components/base-info/baseInfoData'

describe('baseInfoStore', () => {
  setActivePinia(createPinia())

  it('opens dialog and lazy loads detail', async () => {
    const store = useBaseInfoStore()
    const spy = vi.spyOn(api, 'fetchCustomIndexDetail').mockResolvedValue(mockCustomIndexDetail)
    store.customIndexDetail = null

    store.openCustomIndexDialog()
    expect(store.isCustomIndexDialogOpen).toBe(true)
    await new Promise((r) => setTimeout(r, 0))
    expect(spy).toHaveBeenCalled()
    expect((store.customIndexDetail as typeof mockCustomIndexDetail | null)?.total).toBe(
      mockCustomIndexDetail.total,
    )
  })
})
