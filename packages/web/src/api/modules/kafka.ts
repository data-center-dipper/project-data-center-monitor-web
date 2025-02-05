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
