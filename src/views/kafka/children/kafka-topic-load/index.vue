<template>
  <div class="mt-3">
    <TopicLoadHeader></TopicLoadHeader>
    <SelectIndicatorInformation
      @update:indicator="handleUpdateIndicator"
    ></SelectIndicatorInformation>
    <HostMonitoringTable></HostMonitoringTable>
    <ChartPreview></ChartPreview>
  </div>
</template>

<script setup>
import TopicLoadHeader from './components/topic-load-header.vue'
import SelectIndicatorInformation from './components/select-indicator-information.vue'
import HostMonitoringTable from './components/host-monitoring-table.vue'
import ChartPreview from './components/chart-preview.vue'

function handleUpdateIndicator(indicator) {
  console.log(indicator)
}
</script>
