import request from '@/utils/request'


// 登录方法
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