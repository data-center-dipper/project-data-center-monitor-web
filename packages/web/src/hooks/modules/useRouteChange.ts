import { watch } from 'vue'
import { useRoute } from 'vue-router'

export const useRouteChange = (callback: (newRoute: any) => void) => {
  const route = useRoute()

  watch(route, (newRoute) => {
    if (callback) {
      callback(newRoute)
    }
  })
}
