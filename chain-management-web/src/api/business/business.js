import request from '@/utils/request'
// 骨干链状态信息分页查询
export function chainStatusList(query) {
    return request({
      url: '/chainStatus/list',
      method: 'get',
      params: query
    })
  }
// 骨干链节点信息分页查询
export function chainNodeList(query) {
    return request({
      url: '/chainNode/list',
      method: 'get',
      params: query
    })
  }  
// 骨干链合约信息分页查询
export function chainContractList(query) {
    return request({
      url: '/chainContract/list',
      method: 'get',
      params: query
    })
  }  
// 骨干链用户信息分页查询
export function chainUserList(query) {
    return request({
      url: '/chainUser/list',
      method: 'get',
      params: query
    })
  } 
// 骨干链区块信息分页查询
export function chainBlockList(query) {
    return request({
      url: '/chainBlock/list',
      method: 'get',
      params: query
    })
  }         
// 骨干链状态详情查询
export function chainStatusDetial(query) {
    return request({
      url: '/chainStatus/detail',
      method: 'get',
      params: query
    })
  }  
// 骨干链节点详情查询
export function chainNodeDetail(query) {
    return request({
      url: '/chainNode/detail',
      method: 'get',
      params: query
    })
  }
// 骨干链合约详情查询
export function chainContractDetail(query) {
    return request({
      url: '/chainContract/detail',
      method: 'get',
      params: query
    })
  }     
// 骨干链用户信息详细查询
export function chainUserDetail(query) {
    return request({
      url: '/chainUser/detail',
      method: 'get',
      params: query
    })
  }  
// 骨干链区块信息详细查询
export function chainBlockDetail(query) {
    return request({
      url: '/chainBlock/detail',
      method: 'get',
      params: query
    })
  }   
  // 获取企业列表
export function getEnterprises(query) {
  return request({
    url: '/chainNode/getEnterprises',
    method: 'get',
    params: query
  })
}  
  // 获取地址
  export function getRegion(query) {
    return request({
      url: '/chainNode/getRegion',
      method: 'get',
      params: query
    })
  }