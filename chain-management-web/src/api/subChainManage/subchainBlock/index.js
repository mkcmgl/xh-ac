import request from '@/utils/request'
//子链区块列表
export function subchainBlockList(params){
    return request({
        url:'/bottomChainBlock/list',
        method:'get',
        params
    })
}
//子链新增
export function subchainNodeAdd(data){
    return request({
        url:'/bottomChainNode/add',
        method:'post',
        data
    })
}