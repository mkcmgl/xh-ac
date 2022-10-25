import request from '@/utils/request'


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