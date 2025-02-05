<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import request from '@/api/index.ts'
import ChooseData from '@/views/kafka/children/kafka-cluster/components/choose-data.vue'

const emit = defineEmits(['update-clusters'])

// 定义搜索查询的响应式变量
const searchQuery = ref('')

// 控制新增或编辑集群模态框是否显示的响应式变量
const addEditClusterVisible = ref(false)

// 模态框标题的响应式变量，默认为“新增集群”
const addEditModalTitle = ref('新增集群')

// 新集群对象的响应式变量，包含集群的基本信息和监控设置
const newCluster = ref({
  clusterCode: '',
  clusterName: '',
  address: '',
  kafkaJmxAddress: '',
  zookeeperAddress: '',
  clusterDesc: '',
  checkAddress: false,
})

// 显示新增集群模态框的方法
const showAddClusterModal = () => {
  addEditClusterVisible.value = true
  addEditModalTitle.value = '新增集群'

  newCluster.value = {
    clusterCode: '',
    clusterName: '',
    address: '',
    kafkaJmxAddress: '',
    zookeeperAddress: '',
    clusterDesc: '',
    checkAddress: false,
  }
}

// 显示编辑集群模态框的方法
const showEditClusterModal = (cluster) => {
  console.log('ListHeader.vue - 接收到集群:', JSON.stringify(cluster, null, 2))
  addEditClusterVisible.value = true
  addEditModalTitle.value = '编辑集群'

  // 确保所有需要的属性都被正确复制到 newCluster.value 中
  newCluster.value = {
    clusterCode: cluster.clusterCode ?? '',
    clusterName: cluster.clusterName ?? '',
    address: cluster.address ?? '',
    kafkaJmxAddress: cluster.kafkaJmxAddress ?? '',
    zookeeperAddress: cluster.zookeeperAddress ?? '',
    clusterDesc: cluster.clusterDesc ?? '',
    checkAddress:
      cluster.checkAddress !== undefined ? cluster.checkAddress : false,
  }
}

// 提交表单的处理逻辑
const submitClusterForm = async () => {
  // 将表单中的字符串 "true" 和 "false" 转换为布尔值
  newCluster.value.checkAddress = newCluster.value.checkAddress === 'true'

  if (addEditModalTitle.value.includes('新增')) {
    await addCluster()
  } else {
    await editCluster(newCluster.value) // 注意：editCluster 需要接收参数
  }
}

// 新增集群的逻辑
const addCluster = async () => {
  try {
    // 使用自定义封装的 HTTP 请求类添加新集群
    // 当你调用request.post方法时，Vue会自动将newCluster.value转换为JSON格式并作为请求体的一部分发送给后端。
    // 如果后端期望的参数名或结构有所不同，你可能需要在发送请求之前调整数据结构，或者使用一个适配器函数来转换数据格式，以确保前后端参数的一致性。
    const adjustedData = {
      clusterCode: newCluster.value.clusterCode,
      clusterName: newCluster.value.clusterName,
      address: newCluster.value.address,
      kafkaJmxAddress: newCluster.value.kafkaJmxAddress,
      zookeeperAddress: newCluster.value.zookeeperAddress,
      clusterDesc: newCluster.value.clusterDesc,
      checkAddress: newCluster.value.checkAddress,
      // 根据后端需求添加或调整其他属性
    }

    const response = await request.post(
      '/dipper/monitor/api/v1/kafka/cluster/registerCluster',
      adjustedData,
    )
    console.log('集群添加成功:', response.data)

    // 成功后的处理逻辑
    addEditClusterVisible.value = false
  } catch (error) {
    if (error instanceof Error) {
      console.error('集群添加失败:', error.message) // 打印错误消息
    } else {
      console.error('集群添加失败:', error) // 如果不是标准Error对象，直接打印
    }

    // 进一步处理错误，如提示用户等
  }
}

// 编辑集群的逻辑
const editCluster = async (cluster: any) => {
  try {
    // 确保 cluster 不是 undefined 或 null
    if (!cluster) {
      console.error('尝试编辑无效的集群:', cluster)
      return
    }
    console.log('准备编辑集群1:', JSON.stringify(cluster, null, 2))

    // 根据后端需求构造请求体数据
    const adjustedData = {
      clusterCode: cluster.clusterCode,
      clusterName: cluster.clusterName,
      address: cluster.address,
      kafkaJmxAddress: newCluster.value.kafkaJmxAddress,
      zookeeperAddress: newCluster.value.zookeeperAddress,
      clusterDesc: cluster.clusterDesc,
      checkAddress:
        typeof cluster.checkAddress === 'boolean'
          ? cluster.checkAddress
          : false,
    }

    // 发送请求到后端进行更新操作
    const response = await request.post(
      '/dipper/monitor/api/v1/kafka/cluster/updateCluster',
      adjustedData,
    )
    console.log('集群编辑成功:', response.data)

    // 触发自定义事件通知父组件刷新集群列表
    emit('update-clusters')

    // 成功后的处理逻辑
    addEditClusterVisible.value = false
  } catch (error) {
    if (error instanceof Error) {
      console.error('集群编辑失败:', error.message) // 打印错误消息
    } else {
      console.error('集群编辑失败:', error) // 如果不是标准Error对象，直接打印
    }

    // 进一步处理错误，如提示用户等
  }
}

defineExpose({
  showAddClusterModal,
  showEditClusterModal,
})
</script>

<template>
  <!-- 查询输入框和按钮的容器 -->
  <div class="flex justify-between items-center mb-4">
    <!-- 集群查询标签和输入框 -->
    <div class="text-nowrap flex items-center gap-2">
      <div>集群查询:</div>
      <el-input v-model="searchQuery" placeholder="搜索集群..." />
    </div>
    <!-- 新增集群按钮 -->
    <el-button @click="showAddClusterModal"> 新增集群 </el-button>
  </div>

  <!-- 新增或编辑集群的模态框 -->
  <el-dialog
    v-model="addEditClusterVisible"
    :title="addEditModalTitle"
    width="30%"
  >
    <el-form @submit.prevent="submitClusterForm" class="space-y-6 w-full">
      <!-- 使用 el-row 和 el-col 来布局每一对 label 和 input -->
      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">集群唯一识别码:</label>
        <div class="col-span-9">
          <el-input
            id="clusterCode"
            v-model="newCluster.clusterCode"
            required
            placeholder="请输入集群唯一识别码，随机字符即可"
          ></el-input>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">集群名称:</label>
        <div class="col-span-9">
          <el-input
            id="clusterName"
            v-model="newCluster.clusterName"
            required
            placeholder="请输入集群名称"
          ></el-input>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">集群地址:</label>
        <div class="col-span-9">
          <el-input
            id="clusterAddress"
            v-model="newCluster.address"
            required
            placeholder="请输入集群地址"
          ></el-input>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">集群Jmx地址:</label>
        <div class="col-span-9">
          <el-input
            id="kafkaJmxAddress"
            v-model="newCluster.kafkaJmxAddress"
            required
            placeholder="请输入集群jmx地址"
          ></el-input>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">集群zk地址:</label>
        <div class="col-span-9">
          <el-input
            id="zookeeperAddress"
            v-model="newCluster.zookeeperAddress"
            required
            placeholder="请输入集群zk地址"
          ></el-input>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">集群描述:</label>
        <div class="col-span-9">
          <el-input
            type="textarea"
            :rows="4"
            id="clusterDesc"
            v-model="newCluster.clusterDesc"
            required
            placeholder="请输入集群描述"
          ></el-input>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <label class="col-span-3 text-right pr-4 pt-2">检验地址:</label>
        <div class="col-span-9">
          <el-radio-group v-model="newCluster.checkAddress">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!-- 其他表单项可以继续添加 -->
    </el-form>

    <!-- 模态框底部按钮 -->
    <template #footer>
      <el-button type="primary" @click="submitClusterForm">
        {{ addEditModalTitle.includes('新增') ? '添加' : '保存' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
