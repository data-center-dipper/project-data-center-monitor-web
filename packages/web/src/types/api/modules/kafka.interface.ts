/**
 * Kafka集群运行时长信息
 */
export interface IKafkaRuntimeInfoResponse {
  avgDate?: string
  instabilityNodes?: string
  maxDate?: string
  minDate?: string
  nodeCount?: number
  offlineCount?: number
  status?: string
  [property: string]: any
}

/**
 * Kafka Broker列表信息
 */
export interface IKafkaBrokerListResponse {
  brokers?: KafkaBrokerConnectivity[]
  nodeCount?: number
  nodeEx?: number
  [property: string]: any
}

export interface KafkaBrokerConnectivity {
  health?: boolean
  hostName?: string
  hostPort?: number
  hostPortError?: boolean
  jmxPort?: number
  jmxPortError?: boolean
  [property: string]: any
}

/**
 * Zookeeper集群视图信息
 */
export interface IZookeeperClusterViewResponse {
  nodeCount?: number
  nodeEx?: number
  zkIdConsistencies?: ZkIdConsistency[]
  zookeeperNodes?: KafkaZookeeperConnectivity[]
  [property: string]: any
}

/**
 * ZkIdConsistency
 */
export interface ZkIdConsistency {
  consistencyStatus?: string
  hostName?: string
  kafkaBrokerIds?: string
  zkBrokerIds?: string
  [property: string]: any
}

/**
 * KafkaZookeeperConnectivity
 */
export interface KafkaZookeeperConnectivity {
  health?: boolean
  hostName?: string
  hostPort?: number
  hostPortError?: boolean
  [property: string]: any
}
