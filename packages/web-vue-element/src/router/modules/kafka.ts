// 从 vue-router 导入 RouteRecordRaw 类型定义
import type { RouteRecordRaw } from 'vue-router';

const EmptyComponent = {
  template: `<div><h1>Error loading component</h1></div>`,
};

// 定义 Kafka 相关路由配置数组
const kafkaRouter: Array<RouteRecordRaw> = [
  {
    // 主路径 '/kafka'
    path: '/kafka',
    // 动态加载布局组件
    component: () =>
      import('@/layout/index.vue').catch((error) => {
        console.error('Failed to load component:', error);
        return EmptyComponent;
      }),
    // 默认重定向到 '/kafka/kafka-nodes'
    //         redirect: '/kafka/kafka-nodes',
    // 路由名称
    name: 'kafka-management',
    // 路由元数据
    meta: {
      keepAlive: false, // 是否启用缓存
      requiresAuth: true, // 是否需要身份验证
      title: 'Kafka监控', // 页面标题
      key: 'kafka-management', // 唯一标识符
      to: { name: 'kafka' }, // 跳转目标
      icon: 'Kafka', // 图标
    },
    // 子路由配置
    children: [
      {
        // 子路径 '/kafka/kafka-nodes'
        path: '/kafka/kafka-nodes',
        // 子路由名称
        name: 'kafkaHome',
        // 动态加载概览页面组件
        component: () =>
          import('@/views/kafka/children/kafka-nodes/index.vue').catch(
            (error) => {
              console.error('Failed to load component:', error);
              return EmptyComponent;
            },
          ),
        // 子路由元数据
        meta: {
          keepAlive: false, // 是否启用缓存
          requiresAuth: true, // 是否需要身份验证
          title: '概览', // 页面标题
          key: 'kafka-nodes', // 唯一标识符
          to: { name: 'kafkaHome' }, // 跳转目标
          parentKey: 'kafka-management', // 父级唯一标识符
        },
      },
      // 集群管理子路由配置
      {
        path: '/kafka/kafka-cluster',
        name: 'kafkaCluster',
        component: () =>
          import('@/views/kafka/children/kafka-cluster/index.vue').catch(
            (error) => {
              console.error('Failed to load component:', error);
              return EmptyComponent;
            },
          ),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: '集群管理',
          key: 'kafka-cluster',
          to: { name: 'kafkaCluster' },
          parentKey: 'kafka-management',
        },
      },
      // Topic 监控子路由配置
      {
        path: '/kafka/kafka-topic',
        name: 'kafkaTopic',
        component: () =>
          import('@/views/kafka/children/kafka-topic/index.vue').catch(
            (error) => {
              console.error('Failed to load component:', error);
              return EmptyComponent;
            },
          ),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: 'Topic监控',
          key: 'kafka-topic',
          to: { name: 'kafkaTopic' },
          parentKey: 'kafka-management',
        },
      },
      // 消费者监控子路由配置
      {
        path: '/kafka/kafka-consumer',
        name: 'kafkaConsumer',
        component: () =>
          import('@/views/kafka/children/kafka-consumer/index.vue').catch(
            (error) => {
              console.error('Failed to load component:', error);
              return EmptyComponent;
            },
          ),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: '消费者监控',
          key: 'kafka-consumer',
          to: { name: 'kafkaConsumer' },
          parentKey: 'kafka-management',
        },
      },
      // 主机负载子路由配置
      {
        path: '/kafka/kafka-host-load',
        name: 'kafkaHostLoad',
        component: () =>
          import('@/views/kafka/children/kafka-host-load/index.vue').catch(
            (error) => {
              console.error('Failed to load component:', error);
              return EmptyComponent;
            },
          ),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: '主机负载',
          key: 'kafka-load',
          to: { name: 'kafkaHostLoad' },
          parentKey: 'kafka-management',
        },
      },
      // Topic 负载子路由配置
      {
        path: '/kafka/kafka-topic-load',
        name: 'kafkaTopicLoad',
        component: () =>
          import('@/views/kafka/children/kafka-topic-load/index.vue').catch(
            (error) => {
              console.error('Failed to load component:', error);
              return EmptyComponent;
            },
          ),
        meta: {
          keepAlive: false,
          requiresAuth: true,
          title: 'Topic负载',
          key: 'kafka-topic-load',
          to: { name: 'kafkaTopicLoad' },
          parentKey: 'kafka-management',
        },
      },
    ],
  },
];

// 导出 Kafka 路由配置供其他地方使用
export default kafkaRouter;
