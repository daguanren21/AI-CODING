export function useI18n() {
  return {
    t: (key: string, params: Record<string, any> = {}) => {
      if (key === 'customIndex.dialog.subtitle') {
        return `Custom Index: ${params.score}/${params.max}`
      }
      if (key === 'customIndex.dialog.lastUpdated') {
        return `Last updated ${params.date}`
      }
      return key
    },
  }
}

export const createI18n = (..._args: any[]) => ({ global: { t: (key: string) => key } })
