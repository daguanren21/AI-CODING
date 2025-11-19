<script setup lang="ts">
import { ElLink } from 'element-plus'
import type { CustomIndexDimension, CustomIndexPenalty } from '../types'

defineProps<{
  dimensions: CustomIndexDimension[]
  penalties: CustomIndexPenalty[]
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="dim in dimensions"
      :key="dim.id"
      class="flex items-start justify-between p-3 rounded-[12px] border border-[#E5E7EB] box-border"
    >
      <div class="flex flex-col gap-1">
        <div class="text-[14px] font-semibold text-[#193465]">{{ dim.label }}</div>
        <div class="text-[13px] text-[#48618B]">
          {{ dim.score.toFixed(2) }}/{{ dim.weight }}%
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span v-if="dim.suggestionCount && dim.suggestionCount > 0" class="text-[#FA5E43] text-[13px]">
          {{ dim.suggestionCount }} 项优化建议
        </span>
        <span v-else class="text-[13px] text-[#48618B]">此项表现良好</span>
      </div>
    </div>

    <div
      v-for="penalty in penalties"
      :key="penalty.id"
      class="flex items-center justify-between p-3 rounded-[12px] bg-[#FFF5F0] border border-[#FA5E43] box-border"
    >
      <div class="text-[14px] text-[#E64545]">
        {{ penalty.label }}：{{ penalty.value }}
      </div>
      <ElLink
        :href="penalty.linkUrl || '#'"
        target="_blank"
        rel="noopener"
        aria-label="查看平台扣分方案"
      >
        {{ penalty.actionLabel }}
      </ElLink>
    </div>
  </div>
</template>
