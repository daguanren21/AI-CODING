import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { h, type Slots } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import App from './App.vue'
import { themeColors } from './theme/colors'

type SwiperMockInstance = {
  activeIndex: number
  autoplay: { start: () => void; stop: () => void }
  slideTo: () => void
  update: () => void
}

type SwiperStubContext = {
  slots: Slots
  attrs: {
    onSwiper?: (instance: SwiperMockInstance) => void
    onSlideChange?: (instance: SwiperMockInstance) => void
  } & Record<string, unknown>
}

vi.mock('swiper/vue', () => {
  const createStub = (name: string) => ({
    name,
    inheritAttrs: false,
    setup: (_props: Record<string, never>, context: SwiperStubContext) => {
      const { slots, attrs } = context
      const instance: SwiperMockInstance = {
        activeIndex: 0,
        autoplay: { start: () => {}, stop: () => {} },
        slideTo: () => {},
        update: () => {},
      }
      attrs.onSwiper?.(instance)
      attrs.onSlideChange?.(instance)
      return () => h('div', {}, slots.default?.())
    },
  })
  return { Swiper: createStub('Swiper'), SwiperSlide: createStub('SwiperSlide') }
})

vi.mock('swiper/modules', () => ({ Autoplay: {} }))

let cleanup: Array<() => void> = []

beforeAll(() => {
  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error mock
  global.ResizeObserver = MockResizeObserver
})

const mountApp = () => {
  const wrapper = mount(App, {
    global: {
      plugins: [createPinia(), ElementPlus],
    },
    attachTo: document.body,
  })
  cleanup.push(() => wrapper.unmount())
  return wrapper
}

afterEach(() => {
  cleanup.forEach((dispose) => dispose())
  cleanup = []
})

describe('App', () => {
  it('exports component definition', () => {
    expect(App).toBeTruthy()
  })

  it('exposes theme tokens aligned with Figma', () => {
    expect(themeColors.headerBg).toBe('#050506')
    expect(themeColors.headerTextSecondary).toBe('#CBCBCB')
    expect(themeColors.pageBg).toBe('#F6F7FC')
    expect(themeColors.inputBg).toBe('#F4F5F7')
    expect(themeColors.todoSurfaceBg).toBe('rgba(14, 25, 51, 0.9)')
  })

  it('renders the SiteHeader and TodoOverview components', () => {
    const wrapper = mountApp()
    expect(wrapper.find('[data-testid="site-header"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="todo-overview"]').exists()).toBe(true)
  })
})
