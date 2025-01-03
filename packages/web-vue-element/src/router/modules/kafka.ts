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
            icon: 'Kafka'
        },
        children: [
            {
                path: '/kafka/kafka-home',
                name: 'kafkaHome',
                component: () => import('@/views/kafka/children/kafka-home/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '概览',
                    key: 'kafka-home',
                    to: { name: 'kafkaHome' },
                    parentKey: 'kafka-management',
                },
            },
            {
                path: '/kafka/kafka-cluster',
                name: 'kafkaCluster',
                component: () => import('@/views/kafka/children/kafka-cluster/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '集群管理',
                    key: 'kafka-cluster',
                    to: { name: 'kafkaCluster' },
                    parentKey: 'kafka-management',
                },
            },
            {
                path: '/kafka/kafka-topic',
                name: 'kafkaTopic',
                component: () => import('@/views/kafka/children/kafka-topic/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: 'Topic监控',
                    key: 'kafka-topic',
                    to: { name: 'kafkaTopic' },
                    parentKey: 'kafka-management',
                },
            },
            {
                path: '/kafka/kafka-consumer',
                name: 'kafkaConsumer',
                component: () => import('@/views/kafka/children/kafka-consumer/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '消费者监控',
                    key: 'kafka-consumer',
                    to: { name: 'kafkaConsumer' },
                    parentKey: 'kafka-management',
                },
            },
            {
                path: '/kafka/kafka-host-load',
                name: 'kafkaHostLoad',
                component: () => import('@/views/kafka/children/kafka-host-load/index.vue'),
                meta: {
                    keepAlive: false,
                    requiresAuth: true,
                    title: '主机负载',
                    key: 'kafka-load',
                    to: { name: 'kafkaHostLoad' },
                    parentKey: 'kafka-management',
                },
            },
            {
                path: '/kafka/kafka-topic-load',
                name: 'kafkaTopicLoad',
                component: () => import('@/views/kafka/children/kafka-topic-load/index.vue'),
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
]

export default kafkaRouter