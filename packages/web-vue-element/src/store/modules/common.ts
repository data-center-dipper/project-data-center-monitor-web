import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
    const isCollapse = ref(false)

    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value
    }

    return {
        isCollapse,
        toggleCollapse
    }
})
