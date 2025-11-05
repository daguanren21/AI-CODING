<script setup lang="ts">
import { ElPopover, ElIcon } from 'element-plus'
import { ArrowDown, Message, Phone } from '@element-plus/icons-vue'
import type { ManagerInfo } from './types'

const props = defineProps<{ manager: ManagerInfo }>()
</script>

<template>
  <ElPopover trigger="hover" placement="bottom-start" width="360" popper-class="manager-popover" :teleported="false">
    <template #reference>
      <button type="button" class="manager-trigger" data-testid="manager-entry">
        招商经理 · {{ manager.name }}
        <ElIcon size="14">
          <ArrowDown />
        </ElIcon>
      </button>
    </template>

    <div class="manager-card flex flex-col rounded-[18px] overflow-hidden bg-[var(--manager-card-bg)]" role="group" aria-label="招商经理名片">
      <div class="bg-[var(--manager-card-title-bg)] text-[var(--manager-card-title-text)] text-[14px] text-center py-[10px] px-[16px]">
        招商经理 · {{ manager.name }}
      </div>
      <div class="grid grid-cols-[1fr_auto] gap-[16px] items-center p-[18px_20px]">
        <div class="flex items-center gap-[12px] text-[#1B1E2C]">
          <img :src="manager.avatar" :alt="manager.name" class="w-[72px] h-[72px] rounded-[16px] object-cover" />
          <div class="flex flex-col gap-[6px]">
            <p class="m-0 text-[18px] font-semibold">{{ manager.name }}</p>
            <p class="m-0 text-[14px] text-[#4B5672]">{{ manager.title }}</p>
            <div class="flex items-center gap-[6px] text-[14px]">
              <ElIcon size="16"><Phone /></ElIcon>
              <a :href="`tel:${manager.phone}`" class="text-[#1B1E2C] no-underline hover:underline">{{ manager.phone }}</a>
            </div>
            <div class="flex items-center gap-[6px] text-[14px]">
              <ElIcon size="16"><Message /></ElIcon>
              <a :href="`mailto:${manager.email}`" class="text-[#1B1E2C] no-underline hover:underline">{{ manager.email }}</a>
            </div>
          </div>
        </div>
        <img :src="manager.qr" alt="manager QR" class="w-[102px] h-[102px] rounded-[12px] object-cover" />
      </div>
    </div>
  </ElPopover>
</template>
