<template>
  <div class="buyer-card-empty">
    <div class="buyer-card-empty__icon">
      <slot name="icon">
        <i class="i-ep-box" aria-hidden="true"></i>
      </slot>
    </div>
    <p class="buyer-card-empty__text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text?: string }>()
</script>

<style scoped>
.buyer-card-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
  gap: 6px;
  padding: 16px 0;
}

.buyer-card-empty__icon {
  font-size: 20px;
}

.buyer-card-empty__text {
  font-size: 12px;
}
</style>
