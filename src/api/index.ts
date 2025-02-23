import axios from 'axios'
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'
import type { ResultData } from '@/types/api'

const URL: string = 'http://lccweb.natapp1.cc'

enum RequestEnums {
  TIMEOUT = 20000, // 请求超时时间设置为 20 秒
  OVERDUE = 600, // 登录失效状态码
  FAIL = 999, // 请求失败状态码
  SUCCESS = 200, // 请求成功状态码
}

const config = {
  baseURL: URL as string,
  timeout: RequestEnums.TIMEOUT as number,
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    /**
     * 请求拦截器
     * 在客户端发送请求之前执行
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return {
          ...config,
          headers: {
            Authorization: 'Bearer ' + 'token',
          },
        } as any
      },
      (error: AxiosError) => {
        // 请求出错时返回错误信息
        return Promise.reject(error)
      },
    )

    /**
     * 响应拦截器
     * 在服务器返回响应之后执行
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        // 如果响应的状态码表示登录信息失效，则清除本地存储的 token 并返回错误信息
        if (data.code === RequestEnums.OVERDUE) {
          localStorage.setItem('token', '')
          return Promise.reject(data)
        }
        // 如果响应的状态码不是成功的状态码，则显示错误信息并返回错误数据
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          ElMessage.error(data) // 使用 Element Plus 的消息提示组件显示错误信息
          return Promise.reject(data)
        }
        return data // 返回响应数据
      },
      (error: AxiosError) => {
        const { response } = error
        // 根据响应的状态码处理错误
        if (response) {
          this.handleCode(response.status)
        }
        // 如果没有网络连接，则显示错误信息
        if (!window.navigator.onLine) {
          ElMessage.error('网络连接失败')
        }
      },
    )
  }

  /**
   * 处理不同状态码的错误信息
   * @param code 状态码
   */
  handleCode(code: number): void {
    switch (code) {
      case 401:
        ElMessage.error('登录失败，请重新登录')
        break
      default:
        ElMessage.error('请求失败')
        break
    }
  }

  // 封装常用的 HTTP 方法
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
  }

  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

// 导出配置好的 RequestHttp 实例
export default new RequestHttp(config)
