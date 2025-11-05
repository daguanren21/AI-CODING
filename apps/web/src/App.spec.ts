import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { themeColors } from './theme/colors'

describe('App', () => {
  it('exports component definition', () => {
    expect(App).toBeTruthy()
  })

  it('exposes theme tokens aligned with Figma', () => {
    expect(themeColors.headerBg).toBe('#050506')
    expect(themeColors.headerTextSecondary).toBe('#CBCBCB')
    expect(themeColors.pageBg).toBe('#F6F7FC')
    expect(themeColors.inputBg).toBe('#F4F5F7')
  })

  it('renders the SiteHeader component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [ElementPlus],
      },
    })
    expect(wrapper.find('[data-testid="site-header"]').exists()).toBe(true)
  })
})

