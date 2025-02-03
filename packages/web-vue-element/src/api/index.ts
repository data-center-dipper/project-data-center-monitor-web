// 引入 axios 用于发送 HTTP 请求
import axios from 'axios';
// 引入 axios 类型定义，以便进行类型检查和提示
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// 引入 Element Plus 的消息提示组件
import { ElMessage } from 'element-plus';
// 引入自定义的接口类型定义
import type { ResultData } from '../type/api/api';

// 定义 API 基础 URL
const URL: string = 'http://lccweb.natapp1.cc';

// 定义请求相关的枚举值
enum RequestEnums {
  TIMEOUT = 20000, // 请求超时时间设置为 20 秒
  OVERDUE = 600, // 登录失效状态码
  FAIL = 999, // 请求失败状态码
  SUCCESS = 200, // 请求成功状态码
}

// 配置 axios 默认设置
const config = {
  baseURL: URL as string, // 设置基础 URL
  timeout: RequestEnums.TIMEOUT as number, // 设置请求超时时间为 20 秒
  withCredentials: true, // 跨域请求时允许携带凭证（如 cookies）
};

// 创建一个封装了 axios 的类
class RequestHttp {
  service: AxiosInstance; // 定义成员变量并指定类型为 AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    // 使用传入的配置初始化 axios 实例
    this.service = axios.create(config);

    /**
     * 请求拦截器
     * 在客户端发送请求之前执行
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在请求头中添加 Authorization 字段，通常用于传递 token
        return {
          ...config,
          headers: {
            Authorization: 'Bearer ' + 'token', // 注意：这里的 'token' 应该是动态获取的真实 token
          },
        } as any;
      },
      (error: AxiosError) => {
        // 请求出错时返回错误信息
        return Promise.reject(error);
      }
    );

    /**
     * 响应拦截器
     * 在服务器返回响应之后执行
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response; // 解构响应数据
        // 如果响应的状态码表示登录信息失效，则清除本地存储的 token 并返回错误信息
        if (data.code === RequestEnums.OVERDUE) {
          localStorage.setItem('token', '');
          return Promise.reject(data);
        }
        // 如果响应的状态码不是成功的状态码，则显示错误信息并返回错误数据
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          ElMessage.error(data); // 使用 Element Plus 的消息提示组件显示错误信息
          return Promise.reject(data);
        }
        return data; // 返回响应数据
      },
      (error: AxiosError) => {
        const { response } = error;
        // 根据响应的状态码处理错误
        if (response) {
          this.handleCode(response.status);
        }
        // 如果没有网络连接，则显示错误信息
        if (!window.navigator.onLine) {
          ElMessage.error('网络连接失败');
        }
      }
    );
  }

  /**
   * 处理不同状态码的错误信息
   * @param code 状态码
   */
  handleCode(code: number): void {
    switch (code) {
      case 401:
        ElMessage.error('登录失败，请重新登录');
        break;
      default:
        ElMessage.error('请求失败');
        break;
    }
  }

  // 封装常用的 HTTP 方法
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }

  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params);
  }

  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }

  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }
}

// 导出配置好的 RequestHttp 实例
export default new RequestHttp(config);