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