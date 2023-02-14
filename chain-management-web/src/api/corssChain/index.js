import request from '@/utils/request'
//获取跨链通道管理列表
export function chainCrossList(params) {
  return request({
    url: '/crossChannel/getChannels',
    method: 'get',
    params
  })
}

//创建跨链通道
export function creatChainCross(data) {
  return request({
    url: '/crossChannel/createChannel',
    method: 'post',
    data
  })
}
//获取链成员列表
export function getChainCrossMemberList(params) {
  return request({
    url: '/crossChannel/getMembers',
    method: 'get',
    params
  })
}
//添加成员
export function addMember(data) {
  return request({
    url: '/crossChannel/addMember',
    method: 'post',
    data
  })
}
//获链交易列表
export function getChainCrossTradingList(params) {
  return request({
    url: '/crossChannel/queryTxsInChannel',
    method: 'get',
    params
  })
}
//获链事件列表
export function getChainCrossEventsList(params) {
  return request({
    url: '/crossChannel/queryEvent',
    method: 'get',
    params
  })
}
//校验数据
export function testChainCrossEvents(params) {
  return request({
    url: '/crossChannel/validData',
    method: 'get',
    params
  })
}
//修改用户APIURL
export function modifyAPIUrl(data) {
  return request({
    url: '/crossChannel/modifyAPIUrl',
    method: 'POST',
    data
  })
}
