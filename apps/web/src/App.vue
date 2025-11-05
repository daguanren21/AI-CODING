<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import MainContentShell from './components/MainContentShell.vue'
import BaseInfoSection from './components/base-info/BaseInfoSection.vue'
</script>

<template>
  <div class="min-h-screen bg-page text-header-text">
    <SiteHeader />
    <MainContentShell>
      <BaseInfoSection />
    </MainContentShell>
  </div>
</template>
