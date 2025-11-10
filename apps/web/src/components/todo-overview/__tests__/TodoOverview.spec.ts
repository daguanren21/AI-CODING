import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { h, type Slots } from 'vue'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import TodoOverview from '../TodoOverview.vue'
import { useTodoOverviewStore } from '../../../stores/todoOverviewStore'

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

const mountComponent = () => {
  const wrapper = mount(TodoOverview, {
    attachTo: document.body,
    global: {
      plugins: [createPinia()],
    },
  })
  cleanup.push(() => wrapper.unmount())
  return wrapper
}

afterEach(() => {
  cleanup.forEach((dispose) => dispose())
  cleanup = []
})

describe('TodoOverview', () => {
  it('renders todo cards grid with correct count and icons', () => {
    const wrapper = mountComponent()
    const cards = wrapper.findAll('[data-testid="todo-card"]')
    expect(cards).toHaveLength(10)
    expect(cards[0]?.find('img')).toBeTruthy()
  })

  it('renders due soon panel with indicators when more than one slide', () => {
    const wrapper = mountComponent()
    const panel = wrapper.get('[data-testid="todo-due-panel"]')
    const indicators = panel.findAll('.todo-indicator')
    expect(indicators.length).toBeGreaterThan(1)
  })

  it('shows heading and subheading copy from spec', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('.todo-heading').text()).toBe('待办总览')
    expect(wrapper.get('.todo-subheading').text()).toContain('近期待处理事项')
  })

  it('hides view-all link when total is within current slide', async () => {
    const wrapper = mountComponent()
    const store = useTodoOverviewStore()
    store.dueSoon.total = store.dueSoon.items.length
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.todo-view-all').length).toBe(0)
  })

  it('renders error message when todo store reports a failure', async () => {
    const wrapper = mountComponent()
    const store = useTodoOverviewStore()
    store.error = '加载待办数据失败'
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('加载待办数据失败')
  })
})
