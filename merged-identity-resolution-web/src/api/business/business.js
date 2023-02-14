import request from '@/utils/request'
// 标识解析数据查询
export function indentityResolveStatistics(params) {
    return request({
      url: '/identityResolve/statistics',
      method: 'get',
      params
    })
  }
// 标识解析搜索
export function indentityResolveSearch(query) {
    return request({
      url: '/identityResolve/resolve',
      method: 'get',
      params: query
    })
  }  
// 标识注册BID列表
export function registerList(query) {
  return request({
    url: '/identityRegister/page',
    method: 'get',
    params: query
  })
}  
// 标识模板列表
export function templateList(query) {
  return request({
    url: '/identityTemplate/page',
    method: 'get',
    params: query
  })
} 
// 添加模板
export function templateAdd(data) {
  return request({
    url: '/identityTemplate/add',
    method: 'post',
    data
  })
} 
// 添加注册
export function identityRegisterAdd(data) {
  return request({
    url: '/identityRegister/add',
    method: 'post',
    data
  })
} 

