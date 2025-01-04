<template>
  <div class="tags-view-container h-[32px] px-2 flex items-center mt-1">
    <el-scrollbar>
      <div class="flex items-center h-full">
        <router-link
            class="tags-view-item flex items-center text-nowrap border border-solid border-gray-300 rounded-md cursor-pointer"
            :class="isActive(tag) ? 'active' : ''"
            :style="{
            backgroundColor: isActive(tag) ? cssVar.menuActiveText : '',
            borderColor: isActive(tag) ? cssVar.menuActiveText : ''
        }"
            v-for="(tag, index) in tagsViewList"
            :key="tag.fullPath"
            :to="{ path: tag.fullPath }"
            @contextmenu.prevent="openMenu($event, index)"
        >
          <span class="mr-1">{{ tag.title }}</span>
          <template v-if="!isAffiix(tag)">
            <iconpark-icon name="close-small" @click.prevent.stop="onCloseClick(index, tag)"></iconpark-icon>
          </template>
        </router-link>
      </div>
    </el-scrollbar>
    <!--  TODO: 实现右键菜单  -->
    <!--    <context-menu-->
    <!--      v-show="visible"-->
    <!--      :style="menuStyle"-->
    <!--      :index="selectIndex"-->
    <!--    />-->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsStore } from '@/store/modules/tags.ts'

const route = useRoute()
const router = useRouter()
const tagsStore = useTagsStore()

// 获取 tagsViewList 和 cssVar
const tagsViewList = computed(() => tagsStore.tagsViewList)
const cssVar = computed(() => tagsStore.cssVar)

// 判断是否被激活
const isActive = (tag: { path: string }) => {
  return tag.path === route.path;
}

// 判断是否为固钉标签
const isAffiix = (tag: { meta?: { affix?: boolean } }) => {
  return tag.meta && tag.meta.affix;
}

// contextMenu相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: '0px',
  top: '0px',
})

// 展示菜单
const openMenu = (e: MouseEvent, index: number) => {
  const { clientX: x, clientY: y } = e
  menuStyle.left = `${x}px`
  menuStyle.top = `${y}px`
  selectIndex.value = index
  visible.value = true
}

// 关闭标签的点击事件
const onCloseClick = (index: number, tag: any) => {
  tagsStore.removeTagView(index)

  // 如果删除的是当前页面，自动定位到上一个页面
  if (isActive(tag)) {
    const tagsViewList = tagsStore.tagsViewList
    if (index === 0 && tagsViewList.length >= 1) {
      const prePage = tagsViewList[0]
      router.push(prePage.fullPath)
    } else if (tagsViewList.length === 0) {
      router.push('/')
    } else {
      const preIndex = index - 1
      const prePage = tagsViewList[preIndex]
      router.push(prePage.fullPath)
    }
  }
}

// 关闭菜单
const closeMenu = () => {
  visible.value = false
}

// 监听变化
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped>
.tags-view-item {
  padding: 0 10px;
  margin-right: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.tags-view-item.active {
  font-weight: bold;
}

.el-icon-close {
  cursor: pointer;
  margin-left: 5px;
}
</style>
