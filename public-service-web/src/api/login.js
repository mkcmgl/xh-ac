import request from '@/utils/request'
//从账户中心过来获取token
export function getUserToken(params) {
  return request({
    url: '/sso/v1/sign',
    headers: {
      isToken: false
    },
    params
  })
}
// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
// 跳转业务管理平台
export function redirectOp(params) {
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
// 跳转服务平台
export function redirectService(data) {
  return request({
    url: '/oredirect/'+data,
    method: 'get',
  })
}
// 跳转监测监管
export function redirectSpv() {
  return request({
    url: '/redirect/spv',
    method: 'get',
  })
}
//判断个人是否可以进业务
export function subchainJudgr() {
  return request({
    url: '/publicService/v1/getUserSubchainNum',
    method: 'get',
  })
}