import type { RouteRecordRaw } from 'vue-router'

const kafkaRouter: Array<RouteRecordRaw> = [
    {
        path: '/kafka',
        component: () => import('@/layout/index.vue'),
        redirect: '/kafka/kafka-home',
        meta: {
            keepAlive: false,
            requiresAuth: true,
            title: 'Kafka监控',
            key: 'kafka-management',
            to: { name: 'kafka' },
        },
        children: [
            {
                path: 'kafka-home',
                name: 'kafkaHome',
                component: () => import('@/views/kafka/children/kafka-home/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '概览',
                    key: 'kafka-home',
                    parentKey: 'kafka-management',
                },
            },
            {
                path: 'kafka-cluster',
                name: 'kafkaCluster',
                component: () => import('@/views/kafka/children/kafka-cluster/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '集群管理',
                    key: 'kafka-cluster',
                    parentKey: 'kafka-management',
                },
            },
            {
                path: 'kafka-topic',
                name: 'kafkaTopic',
                component: () => import('@/views/kafka/children/kafka-topic/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: 'Topic监控',
                    key: 'kafka-topic',
                    parentKey: 'kafka-management',
                },
            },
            {
                path: 'kafka-consumer',
                name: 'kafkaConsumer',
                component: () => import('@/views/kafka/children/kafka-consumer/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '消费者监控',
                    key: 'kafka-consumer',
                    parentKey: 'kafka-management',
                },
            },
            {
                path: 'kafka-host-load',
                name: 'kafkaHostLoad',
                component: () => import('@/views/kafka/children/kafka-host-load/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '主机负载',
                    key: 'kafka-load',
                    parentKey: 'kafka-management',
                },
            },
            {
                path: 'kafka-topic-load',
                name: 'kafkaTopicLoad',
                component: () => import('@/views/kafka/children/kafka-topic-load/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: 'Topic负载',
                    key: 'kafka-topic-load',
                    parentKey: 'kafka-management',
                },
            },
        ],
    },
]

export default kafkaRouter