import request from '@/utils/request'

import requestOp from '@/utils/requestOp'
import requestSpv from '@/utils/requestSpv'
export function getDidInfo() {

    return request({
        url: '/did/getInfo',
        method: 'get',

    })
}
export function getData() {

    return request({
        url: '/overview/getData',
        method: 'get',

    })
}
export function getProvince() {

    return request({
        url: '/area/getProvince',
        method: 'get',

    })
}
export function getCity(params) {

    return request({
        url: "/area/getCity",
        method: 'get',
        params
    })
}

export function getArea(params) {

    return request({
        url: "/area/getArea",
        method: 'get',
        params
    })
}
export function uploadDocument(data) {

    return request({
        url: "/auth/uploadDocument",

        method: 'post',
        data
    })
}

export function authGetInfo(params) {

    return request({
        url: "/auth/getInfo",
        method: 'get',
        params
    })
}

export function reviewList(params) {

    return request({
        url: "auth/reviewList",
        method: 'get',
        params
    })
}

export function review(data) {

    return request({
        url: "auth/review",
        method: 'post',
        data
    })
}
export function redirect(params) {

    return request({
        url: `redirect/${params.clientId}`,
        method: 'get',
        params
    })
}
export function redirectSpv(params) {

    return request({
        url: `redirect/${params.clientId}`,
        method: 'get',
    })
}
export function getOpToken(params) {

    return requestOp({
        url: '/sso',
        method: 'get', 
        headers: {
            isToken: false
        },
        params
    })
}
export function getTop(params) {

    return requestSpv({
        url: '/sso',
        method: 'get',
        
        params
    })
}