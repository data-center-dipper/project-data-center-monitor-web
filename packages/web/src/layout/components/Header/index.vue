<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Crumbs from '../Crumbs/index.vue'
import { useCommonStore } from '@/store/modules/common.ts'
import { ref } from 'vue'

const status = ref(false)
const inputValue = ref('')
const size = ref(20)
const ball = ref('cut-in')
const halo = ref('flex')
const finish = ref('now')
const delay = ref(2000)

const getStatus = (value) => {
  status.value = value
}

const commonStore = useCommonStore()
const { isCollapse } = storeToRefs(commonStore)

const handleCollapse = () => {
  commonStore.toggleCollapse()
}
</script>

<template>
  <header
    class="flex justify-between items-center px-4 py-3 bg-gray-100 shadow-sm"
  >
    <div class="flex items-center space-x-2">
      <iconpark-icon
        size="24"
        :name="isCollapse ? 'unfold' : 'fold'"
        @click="handleCollapse"
        class="cursor-pointer"
      ></iconpark-icon>
      <Crumbs />
    </div>
    <div class="user-avatar flex gap-2 items-center text-nowrap">
      <div
        class="button_box"
        :class="{ 'background-sun': !status, 'background-night': status }"
      >
        <qx-switch
          :size="size"
          :ball="ball"
          :halo="halo"
          :delay="delay"
          :finish="finish"
          @onStatus="getStatus"
        />
      </div>
      <div class="avatar-name text-gray-600 text-sm">一勺</div>
      <div
        class="avatar p-3 bg-[linear-gradient(180deg,#FFA9D9_0%,#E83D3D_100%)] rounded-full cursor-pointer"
      ></div>
    </div>
  </header>
</template>

<style scoped></style>
