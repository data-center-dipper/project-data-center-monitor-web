<script setup lang="ts">
import ClusterOverview from './components/cluster-overview.vue'
import KafkaNodeDetection from './components/kafka-node-detection.vue'
import ZookeeperNodeDetection from './components/zookeeper-node-detection.vue'
import NodeMonitoring from './components/node-monitoring.vue'
import ClusterStatic from './components/cluster-static.vue'
import ClusterStableNodes from './components/cluster-stable-nodes.vue'
import TopicTop10 from './components/topic-top-stat.vue'
</script>

<template>
  <div class="flex flex-col gap-4 pt-4">
    <ClusterOverview></ClusterOverview>
    <ClusterStatic></ClusterStatic>
    <ClusterStableNodes></ClusterStableNodes>
    <TopicTop10></TopicTop10>
    <KafkaNodeDetection></KafkaNodeDetection>
    <ZookeeperNodeDetection></ZookeeperNodeDetection>
    <NodeMonitoring></NodeMonitoring>
  </div>
</template>

<style scoped></style>
