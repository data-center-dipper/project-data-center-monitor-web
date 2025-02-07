import http from '../index.ts'

/**
 * @description 获取Kafka集群运行时长信息
 * */
export const getKafkaRuntimeInfo = () => {
  return http.get('/dipper/monitor/api/v1/kafka/broker/brokerTime')
}

/**
 * @description 获取Kafka Broker列表信息
 * */
export const getKafkaBrokerList = () => {
  return http.get('/dipper/monitor/api/v1/kafka/broker/brokerList')
}

/**
 * @description 获取Zookeeper集群视图信息
 * */
export const getZookeeperClusterView = () => {
  return http.get('/dipper/monitor/api/v1/kafka/broker/zookeeper_list')
}

// /dipper/monitor/api/v1/kafka/cluster/getAllCluster  获取集群信息

// /dipper/monitor/api/v1/kafka/cluster/deleteCluster  删除集群

// /dipper/monitor/api/v1/kafka/cluster/updateMonitoring  监控策略更新

// /dipper/monitor/api/v1/kafka/cluster/updateMonitoring 取消监控策略

// <!-- 监控策略选择弹窗 -->
// <el-dialog
// v-model="monitoringDialogVisible"
// title="选择监控策略"
// width="30%"
//     >
//     <el-form>
//     <el-form-item label="监控策略">
//     <el-select
// v-model="selectedMonitoringPolicy"
// placeholder="请选择监控策略"
//     >
//     <el-option label="从现在开始" value="now" />
//     <el-option label="时间范围" value="range" />
//     </el-select>
//     </el-form-item>
//     <!-- 当选择了时间范围策略时，才显示 ChooseData 组件 -->
//     <div v-if="selectedMonitoringPolicy === 'range'">
//     <choose-data
//     :disableToday="true"
// startPlaceholder="请选择开始时间"
// endPlaceholder="请选择结束时间"
// @startDateChange="handleStartDateChange"
// @endDateChange="handleEndDateChange"
//     />
//     </div>
//     </el-form>
//     <template #footer>
// <span class="dialog-footer">
//     <el-button @click="monitoringDialogVisible = false">取消</el-button>
//     <el-button type="primary" @click="saveMonitoringSettings"
//     >保存</el-button
//     >
//     </span>
//     </template>
//     </el-dialog>
//
//     <!-- 集群详情弹窗 -->
//     <el-dialog v-model="clusterModalVisible" :title="modalTitle" width="30%">
// <div class="modal-body">
//     <p><strong>ID:</strong> {{ modalData.id }}</p>
// <p><strong>集群编码:</strong> {{ modalData.clusterCode }}</p>
// <p><strong>集群名称:</strong> {{ modalData.clusterName }}</p>
// <p><strong>集群描述:</strong> {{ modalData.clusterDesc }}</p>
// <p><strong>集群地址:</strong> {{ modalData.address }}</p>
// <p>
//     <strong>是否为当前集群:</strong>
// {{ modalData.currentCluster ? '是' : '否' }}
// </p>
// <p>
// <strong>是否为默认集群:</strong>
// {{ modalData.defaultCluster ? '是' : '否' }}
// </p>
// </div>
// <template #footer>
// <span class="dialog-footer">
//     <el-button @click="closeModal">关闭</el-button>
//     </span>
//     </template>
//     </el-dialog>
