import request from '@/utils/request'
// 跳转业务管理平台
export function redirect(params) {
    return request({
      url: '/redirect/op',
      method: 'get',
      params
    })
  }
  // 跳转融合标识平台
export function redirectIdentity(params) {
  return request({
    url: '/redirect/mir',
    method: 'get',
    params
  })
}
  // 跳转公告服务平台
  export function redirectPublic(params) {
    return request({
      url: '/redirect/ps',
      method: 'get',
      params
    })
  }
    // 跳转监测监管平台
    export function redirectSpv() {
      return request({
        url: '/redirect/spv',
        method: 'get',
      })
    }