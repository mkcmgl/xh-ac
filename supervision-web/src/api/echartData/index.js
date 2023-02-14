import request from '@/utils/request'
//获取骨干链累计上链/接受交易量
export function getAllTransaction() {
    return request({
        url: 'largeScreen/allTransaction',
        method: 'get',
    })
}
//获取骨干链上链/交易趋势
export function getRecentTransaction() {
    return request({
        url: 'largeScreen/recentTransaction',
        method: 'get',
    })
}
//获取子链行业分布
export function getIndustryPercent() {
    return request({
        url: 'largeScreen/industryPercent',
        method: 'get',
    })
}
//获取子链动态
export function getSubchainList() {
    return request({
        url: 'largeScreen/subchainList',
        method: 'get',
    })
}
//bid注册趋势
export function getRecentRegister() {
    return request({
        url: 'largeScreen/recentRegister',
        method: 'get',
    })
}
//合约热度
export function getHotContract() {
    return request({
        url: 'largeScreen/hotContract',
        method: 'get',
    })
}
//服务热度
export function getTopService() {
    return request({
        url: 'largeScreen/topService',
        method: 'get',
    })
}
//骨干链详情
export function backboneChainDetail() {
    return request({
        url: 'largeScreen/backboneChainDetail',
        method: 'get',
    })
}