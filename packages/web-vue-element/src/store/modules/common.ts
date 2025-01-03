import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useMobileDetection } from '../../hooks';

export const useCommonStore = defineStore('common', () => {
    const isCollapse = ref(false);
    const activeMenu = ref('/kafka/kafka-home');
    const { isMobile } = useMobileDetection();

    watch(isMobile, (newVal) => {
        isCollapse.value = newVal; // 根据 isMobile 的值更新 isCollapse
    });

    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value;
    };

    const toggleMenu = (menu: string) => {
        activeMenu.value = menu;
    };

    return {
        activeMenu,
        isCollapse,
        toggleCollapse,
        toggleMenu,
        isMobile,
    };
});
