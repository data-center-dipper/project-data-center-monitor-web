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
        menuActiveText: 'rgba(66,99,182,0.8)',
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

    // 关闭右侧标签
    const closeRightTags = (index: number) => {
        tagsViewList.value = tagsViewList.value.slice(0, index + 1)
    }

    // 关闭其他标签
    const closeOtherTags = (index: number) => {
        const affixTag = tagsViewList.value.find(tag => tag.meta.affix)
        const currentTag = tagsViewList.value[index]

        // 如果当前标签是固钉标签，直接保留，否则保留固钉标签和当前标签
        if (currentTag.meta.affix) {
            tagsViewList.value = [currentTag]
        } else {
            if (affixTag) {
                tagsViewList.value = [affixTag, currentTag]
            } else {
                tagsViewList.value = [currentTag]
            }
        }
    }

    // 关闭所有标签
    const closeAllTags = () => {
        tagsViewList.value = [tagsViewList.value[0]]
    }

    return {
        tagsViewList,
        cssVar,
        removeTagView,
        addTagView,
        closeRightTags,
        closeOtherTags,
        closeAllTags
    }
})
