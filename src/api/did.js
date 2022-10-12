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