import request from '@/utils/request'
//获取用户信息
export function userList(params) {
    return request({
      url: '/userManage/v1/userList',
      method: 'get',
      params
    })
  }
//查询子链列表
export function subChainList() {
  return request({
    url: '/userManage/v1/subChainList',
    method: 'get',
  })
}
//手机号新增
export function addUserByPhone(data) {
  return request({
    url: '/userManage/v1/addUserByPhone',
    method: 'post',
    data
  })
}
//邮箱新增
export function addUserByEmail(data) {
  return request({
    url: '/userManage/v1/addUserByEmail',
    method: 'post',
    data
  })
}
//用户维护
export function userMaintain(data) {
  return request({
    url: '/userManage/v1/userMaintain',
    method: 'post',
    data
  })
}
//修改登录密码
export function updatePassword(data) {
  return request({
    url: '/userManage/v1/updatePassword',
    method: 'post',
    data
  })
}
//查询成员
export function findUserByBid(params) {
  return request({
    url: '/userManage/v1/findUserByBid',
    method: 'get',
    params
  })
}
//添加子链管理员
export function addSubChainManager(data) {
  return request({
    url: '/userManage/v1/addSubChainManager',
    method: 'post',
    data
  })
}