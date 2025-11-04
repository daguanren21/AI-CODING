<script setup lang="ts">
import { ref } from 'vue'
import {
  LocationFilled,
  Search,
  Bell,
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

const searchValue = ref('')
const userInfo = {
  name: 'Alice Zhang',
  id: '(ID:345879-0209)',
}
</script>

<template>
  <header class="site-header" data-testid="site-header">
    <div class="utility-bar">
      <div class="utility-links">
        <div class="utility-locale">
          <LocationFilled class="icon" />
          <span>{{ utilityLinks[0] }}</span>
        </div>
        <template v-for="(link, index) in utilityLinks.slice(1)" :key="link">
          <span class="divider" aria-hidden="true" />
          <span class="utility-text">{{ link }}</span>
        </template>
      </div>
    </div>

    <div class="main-bar">
      <div class="brand" aria-label="company logo">
        <div class="brand-mark">
          <div class="brand-dot" />
        </div>
        <div>
          <p class="brand-title">North Link</p>
          <p class="brand-subtitle">TECHNOLOGY</p>
        </div>
      </div>

      <nav class="nav" aria-label="main navigation">
        <button v-for="item in navItems" :key="item" class="nav-link" type="button">
          {{ item }}
          <ArrowDown v-if="item === '更多' || item === '品类'" class="icon" />
        </button>
      </nav>

      <div class="actions">
        <div class="product-search" data-testid="product-search">
          <button type="button" class="product-type">
            <span>Products</span>
            <ArrowDown class="icon" />
          </button>
          <input
            v-model="searchValue"
            placeholder="Shower doors"
            aria-label="产品搜索"
            class="search-input"
          />
          <button type="button" class="search-action" aria-label="执行搜索">
            <Search class="icon" />
          </button>
        </div>
        <button type="button" class="advanced-filter" data-testid="advanced-filter">
          <Filter class="icon" />
          <span>高级筛选</span>
        </button>
        <div class="user-card" aria-label="当前用户">
          <UserFilled class="icon" />
          <div>
            <p class="user-name">{{ userInfo.name }}</p>
            <p class="user-id">{{ userInfo.id }}</p>
          </div>
        </div>
        <div class="quick">
          <button v-for="action in quickActions" :key="action.label" type="button" class="quick-button">
            <component :is="action.icon" class="icon" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--header-bg);
  color: var(--header-text);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
}

.utility-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 40px;
  height: 40px;
  font-size: 14px;
  color: var(--header-text);
}

.utility-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.utility-locale,
.utility-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--header-text);
}

.divider {
  width: 1px;
  height: 14px;
  background: var(--header-divider);
  display: inline-block;
}

.main-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 16px;
  gap: 32px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--header-text);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-dot {
  width: 16px;
  height: 16px;
  background: var(--header-accent);
  border-radius: 50%;
}

.brand-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.brand-subtitle {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--header-text-secondary);
}

.nav {
  display: flex;
  gap: 16px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: var(--header-text-secondary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--header-text);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-search {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 4px;
  gap: 8px;
}

.product-type {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: var(--header-text);
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
}

.search-input {
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: var(--header-text);
  font-size: 14px;
}

.search-input::placeholder {
  color: var(--header-text-secondary);
}

.search-action {
  border: none;
  background: transparent;
  color: var(--header-text);
  padding: 4px 8px;
  border-radius: 50%;
  cursor: pointer;
}

.advanced-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: var(--header-text);
  padding: 4px 16px;
  font-size: 14px;
  cursor: pointer;
}

.quick {
  display: flex;
  gap: 8px;
}

.quick-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--header-text);
}

.user-card {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.user-name {
  margin: 0;
  font-size: 14px;
}

.user-id {
  margin: 0;
  font-size: 12px;
  color: var(--header-text-secondary);
}

.icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 1280px) {
  .nav {
    flex-wrap: wrap;
  }
}
</style>
