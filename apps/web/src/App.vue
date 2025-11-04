<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f6f7fc;
  color: #050506;
}

.content {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.info-card {
  border: 1px solid rgba(5, 5, 6, 0.08);
  border-radius: 16px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  background: #fff;
}

.info-card button {
  margin-top: 12px;
  background: var(--header-accent);
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
}
</style>
