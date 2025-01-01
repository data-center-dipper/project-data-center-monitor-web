/**
 * @description: 定义请求响应参数,不含data
 */
interface Result {
    code: number
    msg: string
}

/**
 * @description: 请求响应参数,包含data
 * */
export interface ResultData<T = any> extends Result {
    data?: T
}