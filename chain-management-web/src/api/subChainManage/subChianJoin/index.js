import request from '@/utils/request'
//全部子链列表
export function subchainJoinList(params){
    return request({
        url:'/bottomChainJoin/allPage/',
        method:'get',
        params
    })
}
//加入的子链列表
export function subchainJoinRoleList(params){
    return request({
        url:'/bottomChainJoin/rolePage',
        method:'get',
        params
    })
}
//加入子链同意授权
export function subchainJoinApply(data){
    return request({
        url:'/bottomChainJoin/apply',
        method:'post',
        data
    })
}
//撤销子链审核
export function subchainJoinQuash(params){
    return request({
        url:'/bottomChainJoin/quash',
        method:'get',
        params
    })
}
//子链审核详情
export function subchainJoinAuditDetail(params){
    return request({
        url:'/bottomChainJoin/detail',
        method:'get',
        params
    })
}
//子链审核
export function subchainJoinAudit(data){
    return request({
        url:'/bottomChainJoin/audit',
        method:'post',
        data
    })
}
//子链详情信息
export function subchainJoinDetailInfo(params){
    return request({
        url:'/bottomChainStatus/data',
        method:'get',
        params
    })
}
//子链详情最近交易次数
export function subchainJoinDetailTransaction(params){
    return request({
        url:'/bottomChainTransaction/recent',
        method:'get',
        params
    })
}
//子链详情合约调用次数
export function subchainJoinDetailContract(params){
    return request({
        url:'/bottomChainContract/callList',
        method:'get',
        params
    })
}