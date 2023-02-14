import request from '@/utils/request'
//获取用户信息
export function getInfo() {
    return request({
      url: '/did/getInfo',
      method: 'get'
    })
  }