<script setup lang="ts">
import { ref, computed, onMounted, watch, type Ref, h } from 'vue'
import ChooseData from './components/choose-data.vue'
import ListHeader from './components/list-header.vue'
import QxDrawer from '@/components/drawers/src/index.vue'
import { useDialog } from '@/components/dialog/useDialog.tsx'
import { useMessageBox, useMessage } from '@/components/toast/index.tsx'

const listHeaderRef: Ref<InstanceType<typeof ListHeader> | null> = ref(null)
const drawerRef: Ref<InstanceType<typeof QxDrawer> | null> = ref(null)

const pageSize = ref(10)
const currentPage = ref(1)

const messageBox = useMessageBox()
const message = useMessage()

const newCluster = ref({
  clusterCode: '',
  clusterName: '',
  address: '',
  clusterDesc: '',
  checkAddress: '',
})

const fakeClusters = [
  {
    id: 1,
    clusterCode: 'C1',
    clusterName: '集群1',
    clusterDesc: '这是集群1的描述',
    address: '192.168.1.1:9092',
    kafkaJmxAddress: '192.168.1.1:9999',
    kafkaZkAddress: '192.168.1.1:2181',
    currentCluster: true,
    defaultCluster: false,
    clusterPolicy: 'now',
    monitorStartTime: '2023-01-01 10:00:00',
    monitorEndTime: null,
    monitoringEnabled: true,
  },
  {
    id: 2,
    clusterCode: 'C2',
    clusterName: '集群2',
    clusterDesc: '这是集群2的描述',
    address: '192.168.1.2:9092',
    kafkaJmxAddress: '192.168.1.2:9999',
    kafkaZkAddress: '192.168.1.2:2181',
    currentCluster: false,
    defaultCluster: true,
    clusterPolicy: 'range',
    monitorStartTime: '2023-02-01 12:00:00',
    monitorEndTime: '2023-02-28 12:00:00',
    monitoringEnabled: false,
  },
  {
    id: 3,
    clusterCode: 'C3',
    clusterName: '集群3',
    clusterDesc: '这是集群3的描述',
    address: '192.168.1.3:9092',
    kafkaJmxAddress: '192.168.1.3:9999',
    kafkaZkAddress: '192.168.1.3:2181',
    currentCluster: false,
    defaultCluster: false,
    clusterPolicy: 'none',
    monitorStartTime: null,
    monitorEndTime: null,
    monitoringEnabled: false,
  },
]

const tableOptions = ref([
  { label: '集群ID', prop: 'id', width: '80', align: 'center' },
  { label: '集群编码', prop: 'clusterCode', width: '120', align: 'center' },
  { label: '集群名称', prop: 'clusterName', width: '150', align: 'center' },
  { label: '集群描述', prop: 'clusterDesc', width: '200', align: 'center' },
  { label: '集群地址', prop: 'address', width: '200', align: 'center' },
  {
    label: '集群jmx地址',
    prop: 'kafkaJmxAddress',
    width: '200',
    align: 'center',
  },
  {
    label: '集群zk地址',
    prop: 'kafkaZkAddress',
    width: '200',
    align: 'center',
  },
  {
    label: '当前集群',
    prop: 'currentCluster',
    width: '100',
    align: 'center',
    slot: 'currentCluster',
  },
  {
    label: '默认集群',
    prop: 'defaultCluster',
    width: '100',
    align: 'center',
    slot: 'defaultCluster',
  },
  {
    label: '监控',
    prop: 'monitoringEnabled',
    width: '480',
    align: 'center',
    slot: 'monitoring',
  },
  {
    label: '当前策略',
    prop: 'clusterPolicy',
    width: '120',
    align: 'center',
    slot: 'clusterPolicy',
  },
  {
    label: '开始时间',
    prop: 'monitorStartTime',
    width: '180',
    align: 'center',
    slot: 'monitorStartTime',
  },
  {
    label: '结束时间',
    prop: 'monitorEndTime',
    width: '180',
    align: 'center',
    slot: 'monitorEndTime',
  },
  {
    label: '操作',
    prop: 'action',
    width: '300',
    align: 'center',
    action: true,
    slot: 'action',
  },
])

const monitoringPolicy = ref('')

const handleMonitoringChange = (val: boolean, scope: any) => {
  // 非监控状态到监控状态, 开启设置抽屉
  if (val) {
    drawerRef.value.openDrawer()
    // 设置监控策略的初始值
    if (scope.row.clusterPolicy === 'none') {
      monitoringPolicy.value = ''
    } else {
      monitoringPolicy.value = scope.row.clusterPolicy
    }
  }
}

const handleBeforeClose = () => {
  // 如果当前有改动,用户离开,才弹出确认框
  if (true) {
    messageBox
      .confirm(
        '存在未保存的修改，是否取消修改？',
        { type: 'warning' },
        '关闭确认',
      )
      .then(() => {
        drawerRef.value.closeDrawer()
      })
  } else {
    drawerRef.value.closeDrawer()
  }
}

const cancelDrawer = () => {
  handleBeforeClose()
}

const handleSave = () => {
  drawerRef.value.closeDrawer()
  message.success('设置监控策略成功')
}

const selectedMonitoringPolicy = () => {}

const handleDelete = (scope: any) => {
  messageBox
    .confirm(
      `确定删除该集群 ${scope.row.clusterName} 吗？`,
      { type: 'warning' },
      '删除确认',
    )
    .then(() => {
      message.success(`删除${scope.row.clusterName}成功`)
    })
    .catch(() => {
      message.info('删除集群操作取消')
    })
}

const handlePreview = (scope: any) => {
  useDialog({
    title: `${scope.row.clusterName} 详情`,
    dialogProps: {
      width: '30%',
    },
    component: () =>
      h('div', [
        h('p', `ID: ${scope.row.id}`),
        h('p', `集群编号: ${scope.row.clusterCode}`),
        h('p', `集群名称: ${scope.row.clusterName}`),
        h('p', `集群描述: ${scope.row.description}`),
        h('p', `集群地址: ${scope.row.address}`),
        h('p', `是否为当前集群: ${scope.row.isCurrent ? '是' : '否'}`),
        h('p', `是否为默认集群: ${scope.row.isDefault ? '是' : '否'}`),
      ]),
  })
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleSizeChange(size: number) {
  pageSize.value = size
}
</script>

<template>
  <div class="kafka-cluster-manager p-4 space-y-4">
    <ListHeader @update-clusters="" ref="listHeaderRef"></ListHeader>

    <qx-table
      :options="tableOptions"
      :data="fakeClusters"
      :pagination="true"
      :currentPage="currentPage"
      :total="fakeClusters.length"
      :pageSize="pageSize"
      paginationLayout="right"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      border
      height="670"
    >
      <template #monitoring="{ scope }">
        <div class="flex items-center justify-center">
          <span>是否开启监控：</span>
          <el-checkbox
            @change="handleMonitoringChange(scope.row.monitoringEnabled, scope)"
            v-model="scope.row.monitoringEnabled"
          ></el-checkbox>
        </div>
      </template>
      <template #currentCluster="{ scope }">
        {{ scope.row.currentCluster ? '是' : '否' }}
      </template>
      <template #clusterPolicy="{ scope }">
        <span v-if="scope.row.clusterPolicy === 'now'">从现在开始</span>
        <span v-else-if="scope.row.clusterPolicy === 'range'">按时间范围</span>
        <span v-else-if="scope.row.clusterPolicy === 'none'">无</span>
        <span v-else>未知策略</span>
      </template>
      <template #defaultCluster="{ scope }">
        {{ scope.row.defaultCluster ? '是' : '否' }}
      </template>
      <template #monitorStartTime="{ scope }">
        {{ scope.row.monitorStartTime ? scope.row.monitorStartTime : '未设置' }}
      </template>
      <template #monitorEndTime="{ scope }">
        {{ scope.row.monitorEndTime ? scope.row.monitorEndTime : '未设置' }}
      </template>
      <template #action="{ scope }">
        <el-button type="text" size="small" @click="handlePreview(scope)"
          >详情</el-button
        >
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope)"
          >删除</el-button
        >
      </template>
    </qx-table>
  </div>
  <qx-drawer ref="drawerRef" :before-close="handleBeforeClose">
    <template #header>
      <span>监控设置</span>
    </template>
    <el-form>
      <el-form-item label="监控策略">
        <el-select
          v-model="monitoringPolicy"
          placeholder="请选择监控策略"
          @change="selectedMonitoringPolicy"
        >
          <el-option label="从现在开始" value="now" />
          <el-option label="时间范围" value="range" />
        </el-select>
      </el-form-item>
      <!-- 当选择了时间范围策略时，才显示 ChooseData 组件 -->
      <div v-if="monitoringPolicy === 'range'">
        <div class="mb-3 text-sm text-gray-500">请选择时间范围</div>
        <choose-data
          :disableToday="true"
          startPlaceholder="请选择开始时间"
          endPlaceholder="请选择结束时间"
        />
      </div>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="cancelDrawer"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="handleSave"
        >保存</el-button
      >
    </template>
  </qx-drawer>
</template>

<style scoped></style>
