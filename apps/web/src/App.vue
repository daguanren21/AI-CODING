<template>
  <main class="min-h-screen flex items-center justify-center bg-surface">
    <el-card class="max-w-md w-full text-center space-y-4" shadow="hover">
      <template #header>
        <h1 class="text-xl font-semibold">Monorepo Starter</h1>
      </template>
      <p>Vue + Element Plus + UnoCSS + Vite + Vitest</p>
      <el-button type="primary">It works!</el-button>
    </el-card>
  </main>
</template>

<style scoped>
:global(body) {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.bg-surface {
  background-color: var(--el-bg-color-page);
}
</style>