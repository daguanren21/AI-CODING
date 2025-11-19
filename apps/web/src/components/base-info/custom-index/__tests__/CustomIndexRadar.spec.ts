import { describe, it, expect, vi } from 'vitest'

const setOptionSpy = vi.fn()
const initSpy = vi.fn(() => ({
  setOption: setOptionSpy,
}))

vi.mock('echarts/core', () => ({
  init: initSpy,
  use: vi.fn(),
  RadarChart: {},
  TitleComponent: {},
  TooltipComponent: {},
  LegendComponent: {},
  CanvasRenderer: {},
}))

import { renderCustomIndexRadar } from '../CustomIndexRadar'

describe('renderCustomIndexRadar', () => {
  it('sets option with scores', () => {
    const el = document.createElement('div')
    renderCustomIndexRadar(el, {
      total: 10,
      max: 100,
      lastUpdated: '2025-01-01',
      frequencyNote: '测试',
      dimensions: [
        { id: 'a', label: 'A', weight: 50, score: 80 },
        { id: 'b', label: 'B', weight: 50, score: 60 },
      ],
      penalties: [],
      suggestions: [],
    })
    expect(initSpy).toHaveBeenCalled()
    expect(setOptionSpy).toHaveBeenCalled()
  })
})
