import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomIndexDialog from '../../dialogs/CustomIndexDialog.vue'
import { mockCustomIndexDetail } from '../../baseInfoData'

describe('CustomIndexDialog', () => {
  it('renders score header and dimensions', () => {
    const wrapper = mount(CustomIndexDialog, {
      props: {
        visible: true,
        loading: false,
        detail: mockCustomIndexDetail,
        penalties: mockCustomIndexDetail.penalties,
        suggestions: mockCustomIndexDetail.suggestions,
      },
    })
    expect(wrapper.text()).toContain('Custom Index: 77.5/100.0')
    expect(wrapper.text()).toContain('平台扣分')
    expect(wrapper.findAll('.el-link').length).toBeGreaterThan(0)
  })

  it('shows error text when loading fails', () => {
    const wrapper = mount(CustomIndexDialog, {
      props: {
        visible: true,
        loading: false,
        detail: undefined,
        penalties: [],
        suggestions: [],
        error: '加载 Custom Index 失败',
      },
    })
    expect(wrapper.text()).toContain('加载 Custom Index 失败')
  })
})
