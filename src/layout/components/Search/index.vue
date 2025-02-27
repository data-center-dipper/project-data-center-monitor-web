<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import QxIcon from '@/components/Icon/src/index.vue'
import { mittBus } from '@/utils'
import { useMobileDetection } from '@/hooks'

const router = useRouter()
const { isMobile } = useMobileDetection()

const showSearchDialog = ref(false)
const searchVal = ref('')
const searchInput = ref(null)
const searchResult = ref([
  {
    children: [
      { path: '/page1', meta: { title: '页面一' } },
      { path: '/page2', meta: { title: '页面二' } },
    ],
  },
  {
    children: [
      { path: '/page3', meta: { title: '页面三' } },
      { path: '/page4', meta: { title: '页面四' } },
    ],
  },
])

const highlightedIndex = ref([0, 0])
const historyHIndex = ref(0)

const closeSearchDialog = () => {
  showSearchDialog.value = false
}

const search = () => {}

const searchBlur = () => {}

const openSearchDialog = () => {
  showSearchDialog.value = true
}

const searchGoPage = (item: any) => {
  showSearchDialog.value = false

  router.push(item.path)
  searchVal.value = ''
  searchResult.value = []
}

const highlightOnHover = (pIndex: number, cIndex: number) => {
  highlightedIndex.value = [pIndex, cIndex]
}

const isHighlighted = (parentIndex: number, childIndex?: number) => {}

const historyResult = computed(() => {
  return []
})

const deleteHistory = (index: number) => {}

onMounted(() => {
  mittBus.on('openSearchDialog', openSearchDialog)
})
</script>

<template>
  <el-dialog
    v-model="showSearchDialog"
    :width="isMobile ? '80%' : '40%'"
    :show-close="false"
    :lock-scroll="false"
    modal-class="search-modal"
    @close="closeSearchDialog"
  >
    <!-- 搜索框 -->
    <el-input
      ref="searchInput"
      v-model.trim="searchVal"
      @blue="searchBlur"
      @input="search"
      placeholder="搜索页面"
      :prefix-icon="Search as any"
    >
      <template #suffix>
        <div
          class="flex items-center h-[20px] px-[4px] text-[12px] color-gray-500 bg-white rounded-sm"
        >
          <span>ESC</span>
        </div>
      </template>
    </el-input>
    <!--  搜索结果  -->
    <div
      class="result w-full mt-[30px] rounded-md"
      v-show="searchResult.length && searchResult.length > 0"
    >
      <div
        class="box mt-0 text-[13px] line-height-1.5 cursor-pointer font-bold"
        v-for="(item, pIndex) in searchResult"
        :key="pIndex"
      >
        <div
          v-for="(cItem, cIndex) in item.children"
          :key="cIndex"
          @click="searchGoPage(cItem)"
          @mouseenter="highlightOnHover(pIndex, cIndex)"
          :class="{
            'text-[#fff] bg-pink-300': isHighlighted(pIndex, cIndex),
          }"
          class="flex items-center justify-between h-12 px-4 mt-2 text-base font-normal text-art-gray-700 bg-gray-100 rounded-md"
        >
          {{ cItem.meta.title }}
          <i
            class="selected-icon iconfont-sys"
            v-show="isHighlighted(pIndex, cIndex)"
            >&#xe6e6;</i
          >
        </div>
      </div>
    </div>
    <!-- 历史搜索 -->
    <div
      class="history-box w-full mt-[5px] text-gray-500"
      v-show="
        !searchVal && searchResult.length === 0 && historyResult.length > 0
      "
    >
      <p class="title">历史搜索</p>
      <div class="history-result">
        <div
          class="box flex items-center justify-between h-12 px-4 mt-2 text-sm font-normal text-gray-800 cursor-pointer bg-gray-100 rounded-md"
          v-for="(item, index) in historyResult"
          :key="index"
          :class="{
            'text-[#fff] bg-pink-300': historyHIndex === index,
          }"
          @click="searchGoPage(item)"
          @mouseenter="historyHIndex = index"
        >
          {{ item.meta.title }}
          <i
            class="selected-icon selected-icon w-20 h-20 text-center text-gray-500 font-normal text-sm user-select-none rounded-full transition-colors duration-300 hover:bg-gray-900 hover:bg-opacity-20 iconfont-sys"
            @click.stop="deleteHistory(index)"
            >&#xe83a;</i
          >
        </div>
      </div>
    </div>
    <!--  底部按钮  -->
    <template #footer>
      <div class="flex items-center pt-[10px] border-t border-gray-200">
        <div class="flex items-center gap-2">
          <div
            class="bg-gray-200 py-1 px-2 flex items-center justify-center rounded-sm cursor-pointer"
          >
            <qx-icon icon="arrow-up" size="1x"></qx-icon>
          </div>
          <div
            class="bg-gray-200 py-1 px-2 flex items-center justify-center rounded-sm cursor-pointer"
          >
            <qx-icon icon="arrow-down" size="1x"></qx-icon>
          </div>
          <div class="text-gray-500 text-sm">切换</div>
          <div class="flex items-center gap-2">
            <div
              class="bg-gray-200 py-1 px-2 flex items-center justify-center rounded-sm cursor-pointer"
            >
              <qx-icon icon="arrows-turn-to-dots" size="1x"></qx-icon>
            </div>
            <span class="text-gray-500 text-sm">选择</span>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-input {
  height: 48px;
}

:deep(.el-dialog__header) {
  padding: 5px 0;
}
:deep(.el-dialog) {
  padding: 0 15px;
  border-radius: 4px;
}
:deep(.el-input__wrapper) {
  background-color: rgba(241, 241, 244, 0.8);
  border: 1px solid #dbdfe9;
  border-radius: 4px !important;
  box-shadow: none;
}
:deep(.el-input__inner) {
  color: #e5e5e5;
}
</style>
