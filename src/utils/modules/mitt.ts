/**
 * 全局事件总线，用于全局事件的发布与订阅
 * mittBus.on('event', callback)
 * mittBus.emit('event', data)
 */
import mitt from 'mitt'

export const mittBus = mitt()
