<script setup lang="ts">
import { ElLink } from 'element-plus'
import type { CustomIndexSuggestion } from '../types'

defineProps<{
  suggestions: CustomIndexSuggestion[]
  helpLink: string
}>()
</script>

<template>
  <div class="p-4 rounded-[12px] border border-[#E5E7EB] bg-white box-border">
    <div class="flex items-center justify-between mb-3">
      <div class="text-[15px] font-semibold text-[#193465]">优化建议</div>
      <ElLink :href="helpLink" target="_blank" rel="noopener">帮助文档</ElLink>
    </div>
    <div v-if="suggestions.length === 0" class="text-[13px] text-[#48618B]">目前没有建议</div>
    <div v-else class="grid gap-3">
      <div
        v-for="item in suggestions"
        :key="item.id"
        class="p-3 rounded-[10px] bg-[#EFF3FF] border border-[#D6E1FF] box-border"
      >
        <div class="text-[14px] font-semibold text-[#193465] mb-1">{{ item.title }}</div>
        <div class="text-[13px] text-[#48618B] mb-2">{{ item.description }}</div>
        <div class="flex items-center justify-between text-[12px] text-[#48618B]">
          <span>{{ item.tips }}</span>
          <ElLink :href="item.linkUrl" target="_blank" rel="noopener">{{ item.linkText }}</ElLink>
        </div>
      </div>
    </div>
  </div>
</template>
