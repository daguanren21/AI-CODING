<template>
  <BuyerCard
    title="平台小秘书"
    tip="需优先处理的事项"
    :link-url="linkUrl ?? undefined"
    :message="message ?? undefined"
  >
    <ul ref="listRef" class="helpdesk-list" data-testid="helpdesk-list">
      <li v-for="item in items" :key="item.msg_id" class="helpdesk-item">
        <div class="helpdesk-item__head">
          <span class="helpdesk-item__badge" :title="item.msg_type_show">{{ item.msg_type_show }}</span>
          <span v-if="item.is_reply === replyFlag" class="helpdesk-item__status">需回复</span>
          <div v-if="item.count_down_seconds > 0" class="helpdesk-item__countdown">
            <i class="i-ep-time" aria-hidden="true"></i>
            <span>剩余{{ formatCountdown(item.count_down_seconds) }}</span>
          </div>
        </div>
        <p class="helpdesk-item__title">{{ item.title }}</p>
        <div class="helpdesk-item__footer">
          <span class="helpdesk-item__date">{{ item.create_time }}</span>
          <span v-if="item.is_read === 0" class="helpdesk-item__dot" aria-label="未读"></span>
        </div>
      </li>
    </ul>
  </BuyerCard>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { ref } from 'vue'

import BuyerCard from '../BuyerCard.vue'
import type { IPlatformHelpDesk } from '../../../types/buyerCenter'
import { IsReply } from '../../../types/enum'

withDefaults(
  defineProps<{
    items: IPlatformHelpDesk[]
    linkUrl?: string | null
    message?: string | null
  }>(),
  {
    items: () => [],
    linkUrl: null,
    message: null,
  },
)

const replyFlag = IsReply.REPLIED

const emit = defineEmits<{
  (e: 'height-change', height: number): void
}>()

const listRef = ref<HTMLElement | null>(null)
useResizeObserver(listRef, (entries) => {
  const entry = entries[0]
  if (!entry) return
  emit('height-change', entry.contentRect.height)
})

const formatCountdown = (seconds: number) => {
  if (seconds <= 0) return '0分钟'
  const days = Math.floor(seconds / 86400)
  if (days > 0) return `${days}天`
  const hours = Math.floor((seconds % 86400) / 3600)
  if (hours > 0) return `${hours}小时`
  const minutes = Math.floor((seconds % 3600) / 60)
  if (minutes > 0) return `${minutes}分钟`
  return '不足1分钟'
}
</script>

<style scoped>
.helpdesk-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.helpdesk-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.helpdesk-item__head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.helpdesk-item__badge {
  max-width: 140px;
  padding: 4px 10px;
  border-radius: 8px;
  background: #f6f6f6;
  font-size: 12px;
  color: #666666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.helpdesk-item__status {
  font-size: 12px;
  color: #ff4d4f;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(255, 77, 79, 0.12);
}

.helpdesk-item__countdown {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #ff4d4f;
}

.helpdesk-item__title {
  margin: 0;
  font-size: 14px;
  color: #303133;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.helpdesk-item__footer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.helpdesk-item__date {
  font-size: 12px;
  color: #a0a0a0;
}

.helpdesk-item__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff4d4f;
}
</style>
