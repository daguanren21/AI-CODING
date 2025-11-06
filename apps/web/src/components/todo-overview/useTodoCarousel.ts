import { computed } from "vue"
import type { IToDoListModuleItem } from "./types"

/**
 * 根据给定的 groupSize 将待办列表切片，供 Swiper 轮播展示。
 * - groupSize 小于 1 时自动回退为 1
 * - 无数据时始终返回 `[[]]`，便于模板渲染空态
 */
export function useTodoCarousel(getItems: () => IToDoListModuleItem[] | undefined, getGroupSize: () => number | undefined) {
  return computed(() => {
    const source = getItems()
    const normalizedItems = Array.isArray(source) ? source : []
    const size = Math.max(getGroupSize() ?? 1, 1)
    const groups: IToDoListModuleItem[][] = []

    for (let index = 0; index < normalizedItems.length; index += size) {
      groups.push(normalizedItems.slice(index, index + size))
    }

    return groups.length > 0 ? groups : [[]]
  })
}