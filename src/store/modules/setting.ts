import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const isRouterAlive = ref(true)
  const isLoading = ref(false)

  return {
    isRouterAlive,
    isLoading,
  }
})
