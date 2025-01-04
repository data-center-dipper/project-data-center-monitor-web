import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useRouteChange } from '../../hooks'

export const useTagsStore = defineStore('tags', () => {
    const tagsViewList = ref([
        {
            title: '首页',
            path: '/dashboard',
            fullPath: '/dashboard',
            meta: { affix: true }
        },
    ])

    const cssVar = reactive({
        menuActiveText: 'rgba(46,78,150,0.8)',
    })

    // 删除单个
    const removeTagView = (index: number) => {
        tagsViewList.value.splice(index, 1)
    }

    // 新增
    const addTagView = (tag: { title: string; path: string; fullPath: string; meta: { affix: boolean } }) => {
        const exists = tagsViewList.value.some(existingTag => existingTag.path === tag.path)
        if (!exists) {
            tagsViewList.value.push(tag)
        }
    }

    useRouteChange((newRoute) => {
        addTagView({
            title: newRoute.meta.title,
            path: newRoute.path,
            fullPath: newRoute.fullPath,
            meta: newRoute.meta
        })
    })

    // TODO: 按方向进行删除

    return {
        tagsViewList,
        cssVar,
        removeTagView,
        addTagView
    };
});
