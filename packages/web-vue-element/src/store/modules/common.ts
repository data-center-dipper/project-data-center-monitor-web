import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
    const isCollapse = ref(false)
    const activeMenu = ref('/kafka/kafka-home')

    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value
    }
    const toggleMenu = (menu: string) => {
        activeMenu.value = menu
    }

    return {
        activeMenu,
        isCollapse,
        toggleCollapse,
        toggleMenu,
    }
})
