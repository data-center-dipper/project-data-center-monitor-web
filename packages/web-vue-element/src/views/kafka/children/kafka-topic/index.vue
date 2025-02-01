<template>
  <div class="kafka-topic-monitor p-4">
    <!-- 第一行：主题: 搜索框 topic总数 -->
    <div
      class="header flex justify-between items-center border border-gray-300 mb-4 p-2 w-full max-w-md mx-auto"
    >
      <div class="header-left flex space-x-2">
        <span>主题:</span>
        <input
          type="text"
          placeholder="搜索topic..."
          class="border p-1 rounded"
        />
      </div>
      <div class="header-right">
        <span>topic总数: {{ topics.length }}</span>
      </div>
    </div>

    <!-- 第二行：topic列表 -->
    <div class="topic-list space-y-4">
      <div
        v-for="(topic, index) in paginatedTopics"
        :key="index"
        class="topic-item p-4 border border-gray-300 bg-gray-100"
      >
        <!-- 第1行：topic名称、类型、分区数、副本数、数据平均大小、磁盘占用 -->
        <div class="row flex flex-wrap gap-2.5 mb-2.5">
          <span class="flex-1 min-w-[100px]">topic名称：{{ topic.name }}</span>
          <span class="flex-1 min-w-[100px]">类型：{{ topic.type }}</span>
          <span class="flex-1 min-w-[100px]"
            >分区数：{{ topic.partitions }}</span
          >
          <span class="flex-1 min-w-[100px]">副本数：{{ topic.replicas }}</span>
          <span class="flex-1 min-w-[100px]"
            >数据平均大小：{{ topic.avgSize }}</span
          >
          <span class="flex-1 min-w-[100px]"
            >磁盘占用：{{ topic.diskUsage }}</span
          >
        </div>
        <!-- 第2行：配置 -->
        <div class="row flex flex-wrap gap-2.5 mb-2.5">
          <span class="flex-1 min-w-[100px]">配置：{{ topic.config }}</span>
        </div>
        <!-- 第3-4行：消息速率等指标 -->
        <div class="metrics-row space-y-2.5 mb-2.5">
          <div class="row grid grid-cols-4 gap-2.5">
            <span>消息入栈速率(bytes)/1min：{{ topic.inRateBytesMin }}</span>
            <span>消息出栈速率(bytes)/1min：{{ topic.outRateBytesMin }}</span>
            <span>拉取失败率(Eps)/1min：{{ topic.pullFailEpsMin }}</span>
            <span>发送消息失败率(Eps)/1min：{{ topic.sendFailEpsMin }}</span>
          </div>
          <div class="row grid grid-cols-4 gap-2.5">
            <span>消息入栈速率(Eps)/1min：{{ topic.inRateEpsMin }}</span>
            <span>消息出栈速率(Eps)/1min：{{ topic.outRateEpsMin }}</span>
            <span
              >消息入栈速率(Eps)/15min：{{ topic.inRateEpsFifteenMin }}</span
            >
          </div>
        </div>
        <!-- 第5行：分区状态 -->
        <div class="row flex items-center mb-2.5">
          <span>分区状态：</span>
          <span
            :class="topic.status === '正常' ? 'text-green-500' : 'text-red-500'"
            >{{ topic.status }}</span
          >
        </div>
        <!-- 第6行：操作链接 -->
        <div class="actions row flex gap-2">
          <a
            href="#"
            @click.prevent="showDetails(topic)"
            class="text-blue-700 hover:underline cursor-pointer"
            >查询详情</a
          >
          <a
            href="#"
            @click.prevent="showDataPreview(topic)"
            class="text-blue-700 hover:underline cursor-pointer"
            >数据预览</a
          >
          <a
            href="#"
            @click.prevent="rebuildTopic(topic)"
            class="text-blue-700 hover:underline cursor-pointer"
            >重建topic</a
          >
          <a
            href="#"
            @click.prevent="expandPartitions(topic)"
            class="text-blue-700 hover:underline cursor-pointer"
            >分区扩容</a
          >
          <a
            href="#"
            @click.prevent="produceData(topic)"
            class="text-blue-700 hover:underline cursor-pointer"
            >生产数据</a
          >
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination flex justify-center items-center gap-2 mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-2 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        上一页
      </button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-2 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        下一页
      </button>
    </div>

    <!-- 查询详情模态框 -->
    <transition name="fade">
      <div
        v-if="topicModalVisible"
        class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <div class="modal bg-white p-4 rounded shadow-lg w-4/5 max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ modalTitle }}</h3>
            <button
              @click="closeModal"
              class="bg-transparent border-none text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p><strong>名称:</strong> {{ modalData.name }}</p>
            <p>
              <strong>描述:</strong> 这里是一些关于{{
                modalData.name
              }}的额外信息。
            </p>
            <p>
              <strong>更多细节:</strong>
              模拟的数据，比如最近的更新时间、维护记录等。
            </p>
          </div>
          <div class="modal-footer text-right">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 数据预览模态框 -->
    <transition name="fade">
      <div
        v-if="topicDataShowVisible"
        class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <div class="modal bg-white p-4 rounded shadow-lg w-4/5 max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ modalTitle }}</h3>
            <button
              @click="closeModal"
              class="bg-transparent border-none text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p><strong>名称:</strong> {{ modalData.name }}</p>
            <p>
              <strong>描述:</strong> 这里是一些关于{{
                modalData.name
              }}的额外信息。
            </p>
            <p>
              <strong>更多细节:</strong>
              模拟的数据，比如最近的更新时间、维护记录等。
            </p>
          </div>
          <div class="modal-footer text-right">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 重建topic模态框 -->
    <transition name="fade">
      <div
        v-if="topicRebuildVisible"
        class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <div class="modal bg-white p-4 rounded shadow-lg w-4/5 max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ modalTitle }}</h3>
            <button
              @click="closeModal"
              class="bg-transparent border-none text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p><strong>名称:</strong> {{ modalData.name }}</p>
            <p>
              <strong>描述:</strong> 这里是一些关于{{
                modalData.name
              }}的额外信息。
            </p>
            <p>
              <strong>更多细节:</strong>
              模拟的数据，比如最近的更新时间、维护记录等。
            </p>
          </div>
          <div class="modal-footer text-right">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 分区扩容模态框 -->
    <transition name="fade">
      <div
        v-if="topicKuorongVisible"
        class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <div class="modal bg-white p-4 rounded shadow-lg w-4/5 max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ modalTitle }}</h3>
            <button
              @click="closeModal"
              class="bg-transparent border-none text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p><strong>名称:</strong> {{ modalData.name }}</p>
            <p>
              <strong>描述:</strong> 这里是一些关于{{
                modalData.name
              }}的额外信息。
            </p>
            <p>
              <strong>更多细节:</strong>
              模拟的数据，比如最近的更新时间、维护记录等。
            </p>
          </div>
          <div class="modal-footer text-right">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 生产数据模态框 -->
    <transition name="fade">
      <div
        v-if="producerVisible"
        class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <div class="modal bg-white p-4 rounded shadow-lg w-4/5 max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ modalTitle }}</h3>
            <button
              @click="closeModal"
              class="bg-transparent border-none text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p><strong>名称:</strong> {{ modalData.name }}</p>
            <p>
              <strong>描述:</strong> 这里是一些关于{{
                modalData.name
              }}的额外信息。
            </p>
            <p>
              <strong>更多细节:</strong>
              模拟的数据，比如最近的更新时间、维护记录等。
            </p>
          </div>
          <div class="modal-footer text-right">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 数据初始化
const topics = ref([
  {
    name: 'topic_lxx',
    type: '内置',
    partitions: 1,
    replicas: 2,
    avgSize: '1.14KB',
    diskUsage: '20G',
    config: '直接字符串展示',
    inRateBytesMin: '0.04MB',
    outRateBytesMin: '0.05MB',
    pullFailEpsMin: '0.43',
    sendFailEpsMin: '0.35',
    inRateEpsMin: 65,
    outRateEpsMin: 45,
    inRateEpsFifteenMin: 123,
    status: '正常',
  },
])
const itemsPerPage = 5
const currentPage = ref(1)
const topicModalVisible = ref(false)
const consumerVisible = ref(false)
const topicDataShowVisible = ref(false)
const topicRebuildVisible = ref(false)
const topicKuorongVisible = ref(false)
const producerVisible = ref(false)
const modalData = ref({})
const modalTitle = ref('')

// 计算属性
const paginatedTopics = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return topics.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(topics.value.length / itemsPerPage))

// 方法定义
function showDetails(topic: any) {
  modalTitle.value = `主题详情 - ${topic.name}`
  modalData.value = { ...topic }
  topicModalVisible.value = true
}

function closeModal() {
  topicModalVisible.value = false
  consumerVisible.value = false
  topicDataShowVisible.value = false
  topicRebuildVisible.value = false
  topicKuorongVisible.value = false
  producerVisible.value = false
}

function showDataPreview(topic: any) {
  modalTitle.value = `数据预览 - ${topic.name}`
  modalData.value = { ...topic }
  topicDataShowVisible.value = true
}

function rebuildTopic(topic: any) {
  modalTitle.value = `重建topic - ${topic.name}`
  modalData.value = { ...topic }
  topicRebuildVisible.value = true
}

function expandPartitions(topic: any) {
  modalTitle.value = `分区扩容 - ${topic.name}`
  modalData.value = { ...topic }
  topicKuorongVisible.value = true
}

function produceData(topic: any) {
  modalTitle.value = `生产数据 - ${topic.name}`
  modalData.value = { ...topic }
  producerVisible.value = true
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* 可以保留一些无法通过 Tailwind CSS 实现的自定义样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
