import request from '@/utils/request'

// 密码登录方法
export function passwordLogin(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login/password',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// 手机验证码登录方法
export function phoneLogin(phoneNumber, receiveCode, code, uuid) {
  const data = {
    phoneNumber,
    receiveCode,
    code,
    uuid
  }
  return request({
    url: '/login/phone',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// BID登录方法
export function bidLogin(privateKey, code, uuid) {
  const data = {
    privateKey,
    code,
    uuid
  }
  return request({
    url: '/login/privateKey',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// 手机注册
export function phoneRegister(data) {
  return request({
    url: '/register/phone',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户数字信息
export function getUserDigitalInfo() {
  return request({
    url: '/did/getInfo',
    method: 'get'
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
// 获取手机验证码
export function getPhoneCode(data) {
  return request({
    url: '/send/sendSms',
    headers: {
      isToken: false
    },
    method: 'post',
    timeout: 20000,
    data
  })
}
// 获取邮箱验证码
export function getEmailCode(data) {
  return request({
    url: '/send/sendEmail',
    headers: {
      isToken: false
    },
    method: 'post',
    timeout: 20000,
    data
  })
}
// 邮箱注册
export function emailRegister(data) {
  return request({
    url: '/register/email',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// BID注册
export function bidRegister(data) {
  return request({
    url: '/register/bid',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

//登录时获取切换列表
export function switchRole() {
  return request({
    url: '/switchRole/list',
    method: 'get'
  })
}
// 选择角色进行切换
export function chooserole(acsn) {
  return request({
    url: '/switchRole/'+acsn,
    method: 'post'
  })
}