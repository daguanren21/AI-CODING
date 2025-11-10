import { render, screen } from '@testing-library/vue'
import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import BuyerDashboardShell from '../BuyerDashboardShell.vue'
import { useBuyerCenterStore } from '../../../stores/buyerCenterStore'
import { mockBuyerDashboardPayload } from '../../../mocks/buyerCenter'

describe('BuyerDashboardShell', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = useBuyerCenterStore()
    store.payload = mockBuyerDashboardPayload
    store.hasLoaded = true
  })

  it('renders dashboard columns', () => {
    render(BuyerDashboardShell)
    expect(screen.getByTestId('buyer-dashboard')).toBeInTheDocument()
  })
})
