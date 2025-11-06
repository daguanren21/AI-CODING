import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useTodoCarousel } from '../useTodoCarousel'

const buildItems = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    title: `Item ${index + 1}`,
    url: '#',
    countdownDesc: `${index} 天后`,
    tag: { label: '提醒', tone: 'warning' as const },
  }))

describe('useTodoCarousel', () => {
  it('splits items according to group size', () => {
    const items = ref(buildItems(6))
    const groupSize = ref(3)
    const groups = useTodoCarousel(() => items.value, () => groupSize.value)

    expect(groups.value).toHaveLength(2)
    expect(groups.value[0]).toHaveLength(3)
  })

  it('falls back to single empty group when no data', () => {
    const items = ref([])
    const groupSize = ref(3)
    const groups = useTodoCarousel(() => items.value, () => groupSize.value)

    expect(groups.value).toEqual([[]])
  })

  it('clamps group size to minimum 1', () => {
    const items = ref(buildItems(2))
    const groupSize = ref(0)
    const groups = useTodoCarousel(() => items.value, () => groupSize.value)

    expect(groups.value[0]).toHaveLength(1)
    expect(groups.value[1]).toHaveLength(1)
  })

  it('returns fallback group when getter yields undefined', () => {
    const groups = useTodoCarousel(() => undefined, () => 3)
    expect(groups.value).toEqual([[]])
  })
})
