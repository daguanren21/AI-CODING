import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import BuyerCard from '../BuyerCard.vue'

const renderCard = (props?: Record<string, unknown>, slots?: Record<string, string>) =>
  render(BuyerCard, {
    props: {
      title: '资金总览',
      ...props,
    },
    slots,
  })

describe('BuyerCard', () => {
  it('shows tip and link when provided', () => {
    renderCard({ tip: '查看详情', linkUrl: 'https://example.com', message: '更多' }, {
      default: '<div>content</div>',
    })
    expect(screen.getByText('资金总览')).toBeInTheDocument()
    expect(screen.getByLabelText('提示')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
  })

  it('falls back to empty state when no slot', () => {
    renderCard()
    expect(screen.getByText('暂无数据')).toBeInTheDocument()
  })
})
