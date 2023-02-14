import request from '@/utils/request'
//获取用户数字身份信息
export function getInfoDigital() {
  return request({
    url: '/did/getInfo',
    method: 'get'
  })
}
// 绑定手机号
export function editNumber(data) {
    return request({
      url: '/did/bindPhone',
      method: 'post',
      data: data
    })
  }
// 修改邮箱
export function editEmail(data) {
    return request({
      url: '/did/bindEmail',
      method: 'post',
      data: data
    })
  }      
//创建数字身份 
export function createDid(data) {
  return request({
    url: '/did/createDid',
    method: 'post',
    data: data
  })
} 
//导入私钥
export function importPrivateKey(data) {
  return request({
    url: '/did/importPrivateKey',
    method: 'post',
    data: data
  })
} 
//导出私钥
export function exportPrivateKey(data) {
  return request({
    url: '/did/exportPrivateKey',
    method: 'post',
    data: data
  })
}  
//导入数字身份
export function importDid(data) {
  return request({
    url: '/did/importIidAndDoc',
    method: 'post',
    data
  })
} 
//设置密码
export function setPassword(data) {
  return request({
    url: '/did/setPassword',
    method: 'post',
    data: data
  })
}
// 修改登录密码
export function editLoginWord(data) {
  return request({
    url: '/did/updatePassword',
    method: 'post',
    data: data
  })
} 
//判断子链管理员有几条子链
   // 修改登录密码
export function subchainList() {
  return request({
    url: '/did/getUserAcsnWithoutDid',
    method: 'get',
  })
} 