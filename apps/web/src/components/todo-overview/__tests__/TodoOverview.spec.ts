import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import TodoOverview from '../TodoOverview.vue'
import { todoOverviewState } from '../todoOverviewData'

vi.mock('swiper/vue', () => {
  const createStub = (name: string) => ({
    name,
    inheritAttrs: false,
    setup: (_props, { slots, attrs }) => {
      const instance = {
        activeIndex: 0,
        autoplay: { start: () => {}, stop: () => {} },
        slideTo: () => {},
        update: () => {},
      }
      if (typeof attrs.onSwiper === 'function') {
        attrs.onSwiper(instance)
      }
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

const snapshot = () => ({
  cards: [...todoOverviewState.value.cards],
  dueSoon: {
    ...todoOverviewState.value.dueSoon,
    items: [...todoOverviewState.value.dueSoon.items],
  },
})

let stateBackup = snapshot()

const resetState = () => {
  todoOverviewState.value = {
    cards: [...stateBackup.cards],
    dueSoon: {
      ...stateBackup.dueSoon,
      items: [...stateBackup.dueSoon.items],
    },
  }
}

const mountComponent = () => {
  const wrapper = mount(TodoOverview, {
    attachTo: document.body,
  })
  cleanup.push(() => wrapper.unmount())
  return wrapper
}

afterEach(() => {
  cleanup.forEach((dispose) => dispose())
  cleanup = []
  resetState()
})

describe('TodoOverview', () => {
  it('renders todo cards grid with correct count and icons', () => {
    const wrapper = mountComponent()
    const cards = wrapper.findAll('[data-testid="todo-card"]')
    expect(cards).toHaveLength(10)
    expect(cards.at(0)?.find('img').exists()).toBe(true)
  })

  it('renders due soon panel with indicators when more than one slide', () => {
    const wrapper = mountComponent()
    const panel = wrapper.get('[data-testid="todo-due-panel"]')
    expect(panel.exists()).toBe(true)
    const indicators = panel.findAll('.todo-indicator')
    expect(indicators.length).toBeGreaterThan(1)
  })

  it('shows heading and subheading copy from spec', () => {
    const wrapper = mountComponent()
    expect(wrapper.get('.todo-heading').text()).toBe('待办总览')
    expect(wrapper.get('.todo-subheading').text()).toContain('近期待处理事项')
  })

  it('hides view-all link when total is within current slide', async () => {
    todoOverviewState.value.dueSoon.total = todoOverviewState.value.dueSoon.items.length
    const wrapper = mountComponent()
    expect(wrapper.find('.todo-view-all').exists()).toBe(false)
  })
})

