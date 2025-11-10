<template>
  <BuyerCard title="平台公告" tip="最新平台通知" :link-url="linkUrl ?? undefined" :message="message ?? undefined">
    <ul class="notice-list" data-testid="notice-list">
      <li v-for="item in items" :key="item.notice_id" class="notice-item" :data-unread="item.is_read === 0">
        <div class="notice-item__head">
          <span class="notice-item__type" :title="item.type_id_name">{{ item.type_id_name }}</span>
          <p class="notice-item__title">{{ item.title }}</p>
          <span v-if="item.is_read === 0" class="notice-item__dot" aria-label="未读"></span>
        </div>
        <div class="notice-item__meta">
          <span class="notice-item__date">{{ item.publish_date }}</span>
          <span v-if="item.make_sure_status === '1'" class="notice-item__tag">需确认</span>
        </div>
      </li>
    </ul>
  </BuyerCard>
</template>

<script setup lang="ts">
import BuyerCard from '../BuyerCard.vue'
import type { IPlatformSystemNotice } from '../../../types/buyerCenter'

withDefaults(
  defineProps<{
    items: IPlatformSystemNotice[]
    linkUrl?: string | null
    message?: string | null
  }>(),
  {
    items: () => [],
    linkUrl: null,
    message: null,
  },
)
</script>

<style scoped>
.notice-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notice-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.notice-item__head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notice-item__type {
  max-width: 120px;
  padding: 2px 8px;
  border-radius: 8px;
  background: #f6f6f6;
  font-size: 12px;
  color: #666666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-item__title {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 14px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-item__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff4d4f;
}

.notice-item__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #a0a0a0;
}

.notice-item__tag {
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid #ff8b38;
  color: #ff8b38;
}
</style>
