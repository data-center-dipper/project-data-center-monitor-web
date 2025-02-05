import { onMounted, onUnmounted, ref } from 'vue'

// 中等屏幕的阈值
const PC_WIDTH_THRESHOLD = 920
// 移动端宽度的阈值
const MOBILE_WIDTH_THRESHOLD = 768

export function useMobileDetection() {
  const isMobile = ref(false)
  const isMediumScreen = ref(false)

  const checkWindowSize = () => {
    const windowWidth = window.innerWidth
    isMobile.value = windowWidth <= MOBILE_WIDTH_THRESHOLD
    isMediumScreen.value =
      windowWidth > MOBILE_WIDTH_THRESHOLD && windowWidth <= PC_WIDTH_THRESHOLD
  }

  onMounted(() => {
    checkWindowSize()
    window.addEventListener('resize', checkWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize)
  })

  return {
    isMobile,
    isMediumScreen,
  }
}
