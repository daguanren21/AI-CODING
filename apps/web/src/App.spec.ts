import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import { themeColors } from './theme/colors'

describe('App', () => {
  it('exports component definition', () => {
    expect(App).toBeTruthy()
  })

  it('exposes theme tokens aligned with Figma', () => {
    expect(themeColors.headerBg).toBe('#050506')
    expect(themeColors.secondaryText).toBe('#CBCBCB')
    expect(Object.keys(themeColors)).toContain('accent')
  })

  it('renders the SiteHeader component', () => {
    const wrapper = mount(App)
    expect(wrapper.find('[data-testid=\"site-header\"]').exists()).toBe(true)
  })
})
