import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, type Slots } from 'vue'
import { mount } from '@vue/test-utils'
import DueSoonPanel from '../DueSoonPanel.vue'
import type { IToDoListModule } from '../types'

const swiperInstances: Array<{
  slideTo: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
  autoplay: { start: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn> }
}> = []

type SwiperMockInstance = {
  activeIndex: number
  autoplay: { start: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn> }
  slideTo: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
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
        autoplay: { start: vi.fn(), stop: vi.fn() },
        slideTo: vi.fn(),
        update: vi.fn(),
      }
      swiperInstances.push({ slideTo: instance.slideTo, update: instance.update, autoplay: instance.autoplay })
      attrs.onSwiper?.(instance)
      attrs.onSlideChange?.(instance)
      return () => h('div', {}, slots.default?.())
    },
  })
  return { Swiper: createStub('Swiper'), SwiperSlide: createStub('SwiperSlide') }
})

vi.mock('swiper/modules', () => ({ Autoplay: {} }))

const createModule = (): IToDoListModule => ({
  title: '?????',
  total: 20,
  icon: '/icons/delivery.svg',
  url: 'https://example.com/todos/due-soon',
  groupSize: 3,
  items: [
    {
      title: '???????',
      meta: 'ID: LC20250307003',
      countdownDesc: '12 ???',
      tag: { label: '??', tone: 'critical' },
      url: 'https://example.com/orders/LC20250307003',
    },
    {
      title: '???????',
      meta: 'ID: LC20250307003',
      countdownDesc: '1 ??',
      tag: { label: '??', tone: 'critical' },
      url: 'https://example.com/orders/exceptions',
    },
    {
      title: '????????',
      countdownDesc: '3 ??',
      tag: { label: '??', tone: 'warning' },
      url: 'https://example.com/contracts/store-rebate',
    },
    {
      title: '??????????',
      countdownDesc: '4 ??',
      tag: { label: '??', tone: 'warning' },
      url: 'https://example.com/contracts/spot',
    },
    {
      title: '?????????',
      countdownDesc: '5 ??',
      tag: { label: '??', tone: 'warning' },
      url: 'https://example.com/service/support',
    },
    {
      title: '??????',
      countdownDesc: '6 ??',
      tag: { label: '??', tone: 'critical' },
      url: 'https://example.com/returns/follow-up',
    },
  ],
})

afterEach(() => {
  swiperInstances.length = 0
})

describe('DueSoonPanel', () => {
  it('renders meta info and countdown chip', () => {
    const wrapper = mount(DueSoonPanel, {
      props: { module: createModule() },
    })

    const firstItem = wrapper.get('[data-testid="todo-due-item"]')
    expect(wrapper.get('.todo-count-tag').text()).toBe('20')
    expect(firstItem.text()).toContain('ID: LC20250307003')
    const countdown = firstItem.get('.todo-due-countdown')
    expect(countdown.text()).toBe('12 ???')
    expect(countdown.classes()).toContain('todo-countdown--critical')
  })

  it('hides view-all button when total equals visible items', () => {
    const module = createModule()
    module.total = module.items.length
    const wrapper = mount(DueSoonPanel, { props: { module } })
    expect(wrapper.findAll('.todo-view-all').length).toBe(0)
  })

  it('hides view-all button when url is missing', () => {
    const module = createModule()
    module.url = undefined
    const wrapper = mount(DueSoonPanel, { props: { module } })
    expect(wrapper.findAll('.todo-view-all').length).toBe(0)
  })

  it('does not render indicators when there is only one slide', () => {
    const module = createModule()
    module.items = module.items.slice(0, 3)
    const wrapper = mount(DueSoonPanel, { props: { module } })
    expect(wrapper.findAll('.todo-indicator').length).toBe(0)
  })

  it('clicking indicator delegates to swiper slideTo', async () => {
    const wrapper = mount(DueSoonPanel, { props: { module: createModule() } })
    const indicators = wrapper.findAll('.todo-indicator')
    await indicators[1]!.trigger('click')
    expect(swiperInstances[0]?.slideTo).toHaveBeenCalledWith(1)
  })

  it('handles keyboard interaction on indicators', async () => {
    const wrapper = mount(DueSoonPanel, { props: { module: createModule() } })
    const indicators = wrapper.findAll('.todo-indicator')
    await indicators[1]!.trigger('keydown.enter')
    await indicators[1]!.trigger('keydown.space')
    expect(swiperInstances[0]?.slideTo).toHaveBeenCalledWith(1)
  })

  it('pauses autoplay on hover and resumes on leave', async () => {
    const wrapper = mount(DueSoonPanel, { props: { module: createModule() } })
    await wrapper.trigger('mouseenter')
    expect(swiperInstances[0]?.autoplay.stop).toHaveBeenCalled()
    await wrapper.trigger('mouseleave')
    expect(swiperInstances[0]?.autoplay.start).toHaveBeenCalled()
  })

  it('resets swiper when data source changes', async () => {
    const module = createModule()
    const wrapper = mount(DueSoonPanel, { props: { module } })
    const nextItems = module.items.slice(0, 3)
    await wrapper.setProps({ module: { ...module, items: nextItems } })
    expect(swiperInstances[0]?.update).toHaveBeenCalled()
    expect(swiperInstances[0]?.slideTo).toHaveBeenCalledWith(0, 0)
  })
})
