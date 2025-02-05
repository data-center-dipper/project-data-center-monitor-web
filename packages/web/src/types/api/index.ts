/**
 * @description: 基础结果类型
 */
interface Result {
  code: number
  message?: string
}

/**
 * @description: 非分页查询的结果
 * */
export interface ResultData<T = any> extends Result {
  data?: T
}

/**
 * @description: 分页查询的结果
 * */
export interface PageResult<T = any> extends ResultData<T> {
  total: number
}
