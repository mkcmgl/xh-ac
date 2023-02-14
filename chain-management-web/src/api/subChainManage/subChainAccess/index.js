import request from '@/utils/request'
//子链接入列表
export function subchainApplyList(params){
    return request({
        url:'bottomChainApply/page',
        methods:'get',
        params
    })
}
//子链接入详情
export function subchainApplyDetail(params){
    return request({
        url:'bottomChainApply/detail',
        methods:'get',
        params,
    })
}
//子链接入申请
export function subchainApply(data){
    return request({
        url:'bottomChainApply/add',
        method:'post',
        data,
    })
}
//验证数字身份
export function verifyPwd(data){
    return request({
        url:'bottomChainApply/verifyPwd',
        method:'post',
        data,
    })
}

//子链接入审核
export function auth(data){
    return request({
        url:'bottomChainApply/audit',
        method:'post',
        data,
    })
}