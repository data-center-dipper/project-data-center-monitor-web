import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('common', () => {
    const uploadData = reactive({})
    const AbortController = {}
    return { uploadData, AbortController }
})
