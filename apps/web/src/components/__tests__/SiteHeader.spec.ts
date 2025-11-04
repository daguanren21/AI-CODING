import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElInput } from 'element-plus'
import SiteHeader from '../SiteHeader.vue'

const setup = () =>
  render(SiteHeader, {
    global: {
      components: {
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElInput,
        ElButton,
      },
    },
  })

const utilityTexts = ['帮助中心', 'Buyer 中心', '消息中心(99+)', '退出']
const navLabels = ['首页', '新品速递', '即将到货', '限时促销', '更多', '品类']
const quickLabels = ['消息', '收藏', '采购车']

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

    const productTrigger = screen.getByRole('button', { name: 'Products' })
    await fireEvent.click(productTrigger)
    const option = await screen.findByText('Suppliers')
    await fireEvent.click(option)
    expect(screen.getByRole('button', { name: 'Suppliers' })).toBeTruthy()
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
    const quickButtons = quickLabels.map((label) => screen.getByRole('button', { name: label }))
    expect(quickButtons).toHaveLength(quickLabels.length)
    expect(screen.getByText('Alice Zhang')).toBeTruthy()
    expect(screen.getByText('(ID:345879-0209)')).toBeTruthy()
  })
})
