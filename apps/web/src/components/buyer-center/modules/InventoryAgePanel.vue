<template>
  <BuyerCard title="实时库龄分布" :link-url="linkUrl ?? undefined">
    <div class="inventory-age-head">
      <div class="inventory-age-head__title">
        <div class="inventory-age-head__label-wrap">
          <p class="inventory-age-head__label">总库存（件）</p>
          <ElTooltip
            content="总库存 = 协议库存 + 系统在途 + Buyer 锁定 + 手机协议锁定"
            placement="top"
          >
            <ElIcon class="inventory-age-head__icon">
              <QuestionFilled />
            </ElIcon>
          </ElTooltip>
        </div>
        <p class="inventory-age-head__value">{{ formattedTotal }}</p>
      </div>
      <p class="inventory-age-head__desc">总库存 = 协议库存 + 系统在途 + Buyer 锁定 + 手机协议锁定</p>
    </div>
    <div v-if="!data" class="inventory-age-empty">暂无库存数据</div>
    <div
      v-else
      ref="chartRef"
      class="inventory-age-chart"
      data-testid="inventory-age-chart"
      aria-label="实时库龄柱状图"
    ></div>
  </BuyerCard>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { ElIcon, ElTooltip } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'

import BuyerCard from '../BuyerCard.vue'
import type { IInventoryAge } from '../../../types/buyerCenter'
import { InventoryAgeStyle } from '../../../types/enum'
import type { InventoryAgeStyleValue } from '../../../types/enum'

const props = withDefaults(
  defineProps<{
    data: IInventoryAge | null
    ticks: number[]
    linkUrl?: string | null
  }>(),
  {
    data: null,
    ticks: () => [],
    linkUrl: null,
  },
)

const formattedTotal = computed(() => props.data?.total_qty?.toLocaleString?.() ?? '--')

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const formatter = new Intl.NumberFormat('zh-CN')

const colorByStyle = (style: InventoryAgeStyleValue) => {
  switch (style) {
    case InventoryAgeStyle.HIGHLIGHT:
      return '#FF8B38'
    case InventoryAgeStyle.WARNING:
      return '#FFA238'
    default:
      return '#75A0F4'
  }
}

const renderChart = () => {
  if (!chart || !props.data) return
  const maxTick = props.ticks.at(-1) ?? props.data.max_qty ?? 0
  const option: echarts.EChartsOption = {
    grid: { left: 120, right: 56, top: 24, bottom: 24 },
    tooltip: { show: false },
    xAxis: {
      type: 'value',
      min: 0,
      max: Math.max(maxTick, 0),
      splitLine: { show: false },
      axisLabel: { color: 'var(--buyer-muted-text)', formatter: (value: number) => formatter.format(value) },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        interval: 0,
        color: 'var(--buyer-secondary-text)',
        margin: 32,
        lineHeight: 18,
      },
      data: props.data.vertical.map((row) => `${row.day_desc}\n${row.storage_fee_desc}`),
    },
    series: [
      {
        type: 'bar',
        data: props.data.horizontal.map((item) => ({
          value: item.qty,
          style: item.style,
          qty: item.qty,
          proportion: item.proportion,
        })),
        barWidth: 24,
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => `${formatter.format(params.data.qty)}\n${params.data.proportion}`,
          color: (params: any) => colorByStyle(params.data.style as InventoryAgeStyleValue),
          fontSize: 12,
          lineHeight: 16,
        },
        itemStyle: {
          color: (params: any) => colorByStyle(params.data.style as InventoryAgeStyleValue),
          borderRadius: [0, 4, 4, 0],
        },
      },
    ],
  }
  chart.setOption(option)
}

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    renderChart()
    useResizeObserver(chartRef, () => chart?.resize())
  }
})

onBeforeUnmount(() => {
  chart?.dispose()
  chart = null
})

watch(
  () => [props.data, props.ticks],
  () => {
    queueMicrotask(() => {
      if (!chart && chartRef.value) {
        chart = echarts.init(chartRef.value)
        useResizeObserver(chartRef, () => chart?.resize())
      }
      renderChart()
    })
  },
  { deep: true, flush: 'post' },
)
</script>

<style scoped>
.inventory-age-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px dashed var(--buyer-divider);
  padding-bottom: 12px;
  margin-bottom: 16px;
  gap: 16px;
}

.inventory-age-head__title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.inventory-age-head__label-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.inventory-age-head__label {
  font-size: 14px;
  color: var(--buyer-secondary-text);
  margin: 0;
}

.inventory-age-head__icon {
  font-size: 14px;
  color: var(--buyer-muted-text);
}

.inventory-age-head__value {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: var(--buyer-primary-text);
}

.inventory-age-head__desc {
  font-size: 12px;
  color: var(--buyer-muted-text);
  max-width: 320px;
  margin: 0;
  text-align: right;
}

.inventory-age-chart {
  width: 100%;
  height: 320px;
}

.inventory-age-empty {
  text-align: center;
  color: var(--buyer-muted-text);
  padding: 60px 0;
}
</style>
