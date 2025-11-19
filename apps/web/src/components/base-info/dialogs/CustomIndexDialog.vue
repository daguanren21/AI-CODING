<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ElDialog, ElLink, ElScrollbar, ElSkeleton } from 'element-plus'
import type {
  CustomIndexDetail,
  CustomIndexPenalty,
  CustomIndexSuggestion,
} from '../types'
import { renderCustomIndexRadar } from '../custom-index/CustomIndexRadar'
import CustomIndexDimensionList from '../custom-index/CustomIndexDimensionList.vue'
import CustomIndexSuggestionPanel from '../custom-index/CustomIndexSuggestionPanel.vue'
import { CUSTOM_INDEX_HELP } from '../../../constants/links'

const props = defineProps<{
  visible: boolean
  loading: boolean
  detail?: CustomIndexDetail
  penalties: CustomIndexPenalty[]
  suggestions: CustomIndexSuggestion[]
  error?: string | null
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const title = computed(() => 'Custom Index')
const subtitle = computed(() => {
  if (!props.detail) return ''
  const score = props.detail.total.toFixed(1)
  const max = props.detail.max.toFixed(1)
  return `Custom Index: ${score}/${max}`
})

const radarRef = ref<HTMLDivElement | null>(null)
let radarInstance: any

const renderRadar = () => {
  if (radarRef.value && props.detail) {
    radarInstance = renderCustomIndexRadar(radarRef.value, props.detail)
  }
}

onMounted(() => {
  renderRadar()
})

watch(
  () => props.detail,
  () => {
    if (radarInstance) {
      radarInstance.dispose?.()
      radarInstance = null
    }
    renderRadar()
  }
)

onBeforeUnmount(() => {
  radarInstance?.dispose?.()
})
</script>

<template>
  <ElDialog
    :model-value="visible"
    class="custom-index-dialog"
    width="960px"
    top="6vh"
    :close-on-click-modal="false"
    :show-close="true"
    @close="emit('close')"
  >
    <template #title>
      <div class="flex flex-col gap-1">
        <div class="text-[18px] font-semibold text-[#193465]">{{ title }}</div>
        <div class="text-[14px] text-[#48618B]">
          <span>{{ subtitle }}</span>
          <span v-if="detail" class="ml-2">
            最近更新时间 {{ detail.lastUpdated }} · {{ detail.frequencyNote }}
          </span>
        </div>
      </div>
    </template>

    <div class="custom-index-body box-border">
      <ElSkeleton :loading="loading" animated>
        <div class="grid grid-cols-[360px_1fr] gap-6">
          <div class="px-4 py-3 rounded-[12px] bg-[#EFF3FF] box-border">
            <div ref="radarRef" class="h-[320px]" />
          </div>
          <ElScrollbar height="420px" class="pr-2">
            <CustomIndexDimensionList
              v-if="detail"
              :dimensions="detail.dimensions"
              :penalties="penalties"
            />
            <p v-else class="text-[14px] text-[#E64545]">{{ error }}</p>
          </ElScrollbar>
        </div>
        <div class="mt-4">
          <CustomIndexSuggestionPanel :suggestions="suggestions" :help-link="CUSTOM_INDEX_HELP" />
        </div>
      </ElSkeleton>
    </div>

    <template #footer>
      <div class="flex items-center justify-between w-full text-[13px] text-[#48618B]">
        <span v-if="error" class="text-[#E64545]">{{ error }}</span>
        <span v-else>优化后的项目可关注下次 Custom Index 分数更新。</span>
        <ElLink :href="CUSTOM_INDEX_HELP" target="_blank" rel="noopener" aria-label="Custom Index 帮助">
          帮助文档
        </ElLink>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped>
.custom-index-dialog :deep(.el-dialog__body) {
  padding-top: 12px;
  padding-bottom: 12px;
}
.custom-index-body {
  box-sizing: border-box;
}
</style>
