import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import SiteHeader from '../SiteHeader.vue'

const setup = () => render(SiteHeader)
const utilityTexts = ['帮助中心', 'Buyer 中心', '消息中心(99+)', '退出']
const navLabels = ['首页', '新品速递', '即将到货', '限时促销', '更多', '品类']

describe('SiteHeader', () => {
  it('renders navigation, utility links, and new pills', async () => {
    setup()
    expect(screen.getByText('USA / $')).toBeTruthy()
    utilityTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeTruthy()
    })
    navLabels.forEach((text) => {
      expect(screen.getByRole('button', { name: text })).toBeTruthy()
    })
    expect(screen.getByText('高级筛选')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Products' })).toBeTruthy()
  })

  it('supports product search input interaction', async () => {
    setup()
    const input = screen.getByPlaceholderText('Shower doors') as HTMLInputElement
    expect(input.value).toBe('')
    await fireEvent.update(input, 'frameless door')
    expect(input.value).toBe('frameless door')
  })

  it('shows quick actions and user info', async () => {
    setup()
    const quickButtons = screen.getAllByRole('button').filter((btn) =>
      btn.classList.contains('quick-button'),
    )
    expect(quickButtons).toHaveLength(3)
    expect(screen.getByText('Alice Zhang')).toBeTruthy()
    expect(screen.getByText('(ID:345879-0209)')).toBeTruthy()
  })
})
