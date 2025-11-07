import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import BaseInfoSection from '../BaseInfoSection.vue'
import { useBaseInfoStore } from '../../../stores/baseInfoStore'

let cleanupWrappers: Array<() => void> = []

afterEach(() => {
  cleanupWrappers.forEach((dispose) => dispose())
  cleanupWrappers = []
})

describe('BaseInfoSection', () => {
  const mountComponent = () => {
    const wrapper = mount(BaseInfoSection, {
      attachTo: document.body,
      global: {
        plugins: [createPinia(), ElementPlus],
      },
    })
    cleanupWrappers.push(() => wrapper.unmount())
    return wrapper
  }

  it('renders greeting, giga index, and beans data from mock state', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('Hi, Alice Zhang')
    expect(wrapper.text()).toContain('Lv.5 路 GIGA Pro')
    expect(wrapper.text()).toContain('ID:345879-0209')
    expect(wrapper.get('[data-testid="metric-card-giga-index"]').text()).toContain('95.6')
    expect(wrapper.get('[data-testid="metric-card-beans"]').text()).toContain('1550')
    expect(wrapper.get('[data-testid="metric-card-beans"]').text()).toContain('个')
  })

  it('shows manager details when hovering the entry', async () => {
    const wrapper = mountComponent()
    const managerEntry = wrapper.get('[data-testid="manager-entry"]')
    await managerEntry.trigger('mouseenter')
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))

    const popover = document.querySelector('.manager-popover')
    expect(popover?.textContent).toContain('liuting@gigacloudtech.com')
  })

  it('renders error message when store reports a failure', async () => {
    const wrapper = mountComponent()
    const store = useBaseInfoStore()
    store.error = '加载基础信息失败'
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('加载基础信息失败')
  })
})
