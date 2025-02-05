import http from '../index.ts'

export function test() {
  return http.get(`/kafka/test`)
}
