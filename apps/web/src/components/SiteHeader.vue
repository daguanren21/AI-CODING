<script setup lang="ts">
import { ref } from 'vue'
import {
  LocationFilled,
  Search,
  StarFilled,
  ShoppingCart,
  UserFilled,
  ChatLineSquare,
  ArrowDown,
  Filter,
} from '@element-plus/icons-vue'

const utilityLinks = ['USA / $', '帮助中心', 'Buyer 中心', '消息中心(99+)', '退出']
const navItems = ['首页', '新品速递', '即将到货', '限时促销', '更多', '品类']
const quickActions = [
  { icon: ChatLineSquare, label: '消息' },
  { icon: StarFilled, label: '收藏' },
  { icon: ShoppingCart, label: '采购车' },
]
const productOptions = ['Products', 'Suppliers', 'Categories']

const searchValue = ref('')
const selectedProduct = ref(productOptions[0])
const userInfo = {
  name: 'Alice Zhang',
  id: '(ID:345879-0209)',
}

const onProductCommand = (command: string) => {
  selectedProduct.value = command
}
</script>

<template>
  <header class="bg-header text-header flex flex-col gap-[8px] pt-[8px]" data-testid="site-header">
    <div class="flex justify-end items-center px-[40px] h-[40px] text-[14px] text-header">
      <div class="flex items-center gap-[8px]">
        <div class="flex items-center gap-[6px]">
          <LocationFilled class="w-[16px] h-[16px]" />
          <span>{{ utilityLinks[0] }}</span>
        </div>
        <template v-for="link in utilityLinks.slice(1)" :key="link">
          <span class="divider-line" aria-hidden="true" />
          <span class="text-header">{{ link }}</span>
        </template>
      </div>
    </div>

    <div class="flex flex-col gap-[16px] px-[24px] pb-[16px] md:px-[40px] lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center gap-[10px]" aria-label="company logo">
        <div class="w-[44px] h-[44px] rounded-full border-[2px] border-white flex items-center justify-center">
          <div class="w-[16px] h-[16px] rounded-full bg-[var(--accent)]" />
        </div>
        <div>
          <p class="text-[16px] font-semibold leading-[22px] m-0">North Link</p>
          <p class="text-[12px] tracking-[0.2em] text-header-muted m-0">TECHNOLOGY</p>
        </div>
      </div>

      <nav class="flex flex-wrap gap-[16px] flex-1" aria-label="main navigation">
        <button
          v-for="item in navItems"
          :key="item"
          type="button"
          class="flex items-center gap-[4px] bg-transparent border-none text-[16px] font-semibold text-header-muted hover:text-header transition-colors cursor-pointer"
        >
          {{ item }}
          <ArrowDown v-if="item === '更多' || item === '品类'" class="w-[16px] h-[16px]" />
        </button>
      </nav>

      <div class="flex flex-wrap items-center gap-[12px] justify-end">
        <div class="flex items-center gap-[8px] bg-[var(--pill-bg)] rounded-full px-[8px] py-[4px]" data-testid="product-search">
          <ElDropdown class="product-selector inline-flex h-[32px] items-stretch" trigger="click" @command="onProductCommand">
            <span
              class="pill-highlight px-[16px] inline-flex items-center gap-[4px] cursor-pointer select-none h-full"
              role="button"
              tabindex="0"
            >
              {{ selectedProduct }}
              <ArrowDown class="w-[16px] h-[16px]" />
            </span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem v-for="option in productOptions" :key="option" :command="option">
                  {{ option }}
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
          <ElInput v-model="searchValue" placeholder="Shower doors" class="search-input flex-1 min-w-[140px]" />
          <ElButton class="search-action" :icon="Search" circle aria-label="执行搜索" text />
        </div>
        <ElButton class="pill-base px-[16px] py-[4px] inline-flex items-center gap-[4px] text-[14px]" round plain :icon="Filter">
          高级筛选
        </ElButton>
        <div class="flex items-center gap-[8px] px-[12px] py-[4px] border border-white/20 rounded-[12px]" aria-label="当前用户">
          <UserFilled class="w-[16px] h-[16px]" />
          <div class="text-[14px] leading-[20px]">
            <p class="m-0">{{ userInfo.name }}</p>
            <p class="m-0 text-[12px] text-header-muted">{{ userInfo.id }}</p>
          </div>
        </div>
        <div class="flex gap-[8px]">
          <ElButton
            v-for="action in quickActions"
            :key="action.label"
            class="action-icon"
            circle
            :icon="action.icon"
            text
            :aria-label="action.label"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.search-input :deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.search-input :deep(.el-input__inner) {
  color: var(--header-text);
}

.search-input :deep(.el-input__inner::placeholder) {
  color: var(--header-text-secondary);
}

.search-action :deep(.el-button) {
  border: none;
  background: var(--pill-highlight);
  color: var(--header-text);
  width: 32px;
  height: 32px;
  padding: 0;
}
.product-selector {
  display: inline-flex;
  height: 32px;
}

.product-selector :deep(.el-tooltip__trigger) {
  display: flex;
  align-items: center;
  height: 100%;
}




.pill-base :deep(.el-button) {
  background: transparent;
  color: var(--header-text);
  border: none;
  padding: 0;
}

.pill-base :deep(.el-button):hover,
.pill-base :deep(.el-button):focus {
  background: transparent;
  color: var(--header-text);
  border: none;
}

.action-icon :deep(.el-icon) {
  width: 36px;
  height: 36px;
  padding: 0;
  color: #fff;
  background: transparent;
}

.action-icon :deep(.el-icon):hover,
.action-icon :deep(.el-icon):focus {
  color: #333;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
}
</style>
