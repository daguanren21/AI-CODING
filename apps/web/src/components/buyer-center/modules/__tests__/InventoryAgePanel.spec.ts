import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import InventoryAgePanel from '../InventoryAgePanel.vue'
import type { IInventoryAge } from '../../../../types/buyerCenter'
import { InventoryAgeStyle } from '../../../../types/enum'

const data: IInventoryAge = {
  max_qty: 1000,
  total_qty: 900,
  horizontal_segments: 5,
  vertical: [{ day_desc: '1-30 ?', storage_fee_desc: '0.3?/m??d' }],
  horizontal: [
    {
      day_desc: '1-30 ?',
      qty: 500,
      proportion: '50%',
      style: InventoryAgeStyle.DEFAULT,
      details: { agreement_qty: 200, available_qty: 200, buyer_lock_qty: 100 },
    },
  ],
}

describe('InventoryAgePanel', () => {
  it('renders chart container', () => {
    const { getByTestId } = render(InventoryAgePanel, {
      props: { data, ticks: [0, 200, 400, 600, 800, 1000] },
    })
    expect(getByTestId('inventory-age-chart')).toBeInTheDocument()
  })
})
