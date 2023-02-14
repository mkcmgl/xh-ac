import request from '@/utils/request'
//子链合约列表
export function subchainContractList(params){
    return request({
        url:'/bottomChainContract/list',
        method:'get',
        params
    })
}
//子链合约新增
export function subchainContractAdd(data){
    return request({
        url:'/bottomChainContract/add',
        method:'post',
        data
    })
}
//子链合约删除
export function subchainContractDelete(params){
    return request({
        url:'/bottomChainContract/delete',
        method:'get',
        params
    })
}