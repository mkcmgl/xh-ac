import request from '@/utils/request'

// 查看单条申请记录
export function getInfo(params) {
    return request({
        url: '/auth/getInfo',
        method: 'get',
        params
    })
}
// 上传认证材料
export function uploadDocument(data) {
    return request({
        url: '/auth/uploadDocument',
        method: 'post',
        data: data
    })
}
// 查询所有省市
export function getProvince() {
    return request({
        url: '/area/getProvince',
        method: 'get',
    })
}
// 查询所有地市
export function getCity(params) {
    return request({
        url: '/area/getCity',
        method: 'get',
        params
    })
}
// 查询所有区县
export function getArea(params) {
    return request({
        url: '/area/getArea',
        method: 'get',
        params
    })
}
// 审核列表
export function reviewList(data) {
    return request({
        url: '/auth/reviewList',
        method: 'post',
        data: data
    })
}
// 审核
export function review(data) {
    return request({
        url: '/auth/review',
        method: 'post',
        data: data
    })
}
// 查看凭证
export function getCert(data) {
    return request({
        url: '/auth/getCert',
        method: 'post',
        data: data
    })
}
//判断是否只能进行实名认证
export function confirmType() {
    return request({
        url: '/userManage/userSubchainCount',
        method: 'get',
    })
}