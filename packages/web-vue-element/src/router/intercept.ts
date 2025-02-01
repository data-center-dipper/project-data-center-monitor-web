import { NProgress } from '../config'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import router from './index.ts'

/**
 * @description 路由拦截 beforeEach
 */
//@ts-ignore
router.beforeEach(
  (
    to: RouteLocationNormalizedGeneric,
    _from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
  ) => {
    NProgress.start()

    // 如果是访问登陆页，没有 token 直接放行，有 token 跳转首页

    // 如果url中有token

    // 无token 访问 需要token页面

    // 正常访问页面
    next()
  },
)

/**
 * @description 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done()
})

/**
 * @description 路由跳转错误
 */
router.onError((err: any) => {
  NProgress.done()
  throw err
})

export default router
