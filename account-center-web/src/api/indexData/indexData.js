import request from '@/utils/request'
// 获取用户详细信息
export function getIndexData() {
    return request({
      url: '/overview/getData',
      method: 'get'
    })
  }