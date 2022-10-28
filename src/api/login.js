import request from '@/utils/request'

// 登录方法  密码登录
export function login(username, password, code, uuid) {
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
// 登录方法  私钥登录
export function privateKey(privateKey, code, uuid) {
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

// 登录方法  手机号登录
export function phone(phoneNumber, code, uuid, receiveCode) {
    const data = {
        phoneNumber,
        code,
        uuid,
        receiveCode
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
// 注册方法
export function register(data) {
    return request({
        url: '/register/phone',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}
export function registerBid(data) {
    return request({
        url: '/register/bid',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}
export function registerEamil(data) {
    return request({
        url: '/register/email',
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
export function getCodeSms(code, phone, type, uuid) {
    return request({
        url: '/send/sendSms',
        headers: {
            isToken: false
        },
        method: 'post',
        timeout: 20000,
        data: { code, phone, type, uuid }
    })
}
export function getCodeEmail(code, email, type, uuid) {
    return request({
        url: '/send/sendEmail',
        headers: {
            isToken: false
        },
        method: 'post',
        timeout: 20000,
        data: { code, email, type, uuid }
    })
}





//导出私钥
export function exportPrivateKey(securePassword, did) {
    const data = {
        securePassword,
        did
    }
    return request({
        url: '/login/exportPrivateKey',

        method: 'post',
        data: data
    })
}
//修改私钥安全密码 

export function updatePasswordKey(password, currentPassword, type, did) {
    const data = {
        password,
        currentPassword,
        type,
        did
    }
    return request({
        url: '/did/updatePassword',

        method: 'post',
        data: data
    })
}

//绑定手机号

export function bindPhone(phoneNumber, receiveCode) {
    const data = {
        phoneNumber,
        receiveCode
    }
    return request({
        url: '/did/bindPhone',

        method: 'post',
        data: data
    })
}

//绑定邮箱

export function bindEmail(email, receiveCode) {
    const data = {
        email,
        receiveCode
    }
    return request({
        url: '/did/bindEmail',

        method: 'post',
        data: data
    })
}