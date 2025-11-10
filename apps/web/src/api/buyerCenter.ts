import type { BuyerDashboardPayload } from '../types/buyerCenter'
import { mockBuyerDashboardPayload } from '../mocks/buyerCenter'

/**
 * TODO: replace with real API call when backend ready.
 */
export async function fetchBuyerDashboard(): Promise<BuyerDashboardPayload> {
  return structuredClone ? structuredClone(mockBuyerDashboardPayload) : JSON.parse(JSON.stringify(mockBuyerDashboardPayload))
}
