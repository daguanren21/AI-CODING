import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { CustomIndexDetail } from '../types'

echarts.use([RadarChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer])

export const renderCustomIndexRadar = (
  el: HTMLDivElement,
  detail: CustomIndexDetail
) => {
  const chart = echarts.init(el)
  const option = {
    tooltip: {},
    radar: {
      indicator: detail.dimensions.map((d) => ({
        name: `${d.label} (${d.weight}%)`,
        max: 100,
      })),
      splitArea: { areaStyle: { color: '#EFF3FF' } },
      axisLine: { lineStyle: { color: '#4877FF' } },
      splitLine: { lineStyle: { color: '#4877FF' } },
    },
    series: [
      {
        type: 'radar',
        areaStyle: { color: 'rgba(72, 119, 255, 0.22)' },
        lineStyle: { color: '#2861CE' },
        data: [
          {
            value: detail.dimensions.map((d) => d.score),
            name: 'Score',
          },
        ],
      },
    ],
  }
  chart.setOption(option)
  return chart
}
