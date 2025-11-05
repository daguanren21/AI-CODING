<script setup lang="ts">
const shellStyles = {
  paddingTop: '40px',
  width: '100%',
  maxWidth: '1600px',
  minWidth: '1200px',
}
</script>

<template>
  <div class="w-full overflow-x-auto" data-testid="main-content-shell">
    <div
      class="mx-auto px-[24px] md:px-[40px]"
      data-testid="main-content-wrapper"
      :style="shellStyles"
    >
      <slot />
    </div>
  </div>
</template>
