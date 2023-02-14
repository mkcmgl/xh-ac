import request from '@/utils/request'
//子链节点列表
export function subchainNodeList(params){
    return request({
        url:'/bottomChainNode/list',
        method:'get',
        params
    })
}
//子链节点新增
export function subchainNodeAdd(data){
    return request({
        url:'/bottomChainNode/add',
        method:'post',
        data
    })
}
//子链节点删除
export function subchainNodeDel(params){
    return request({
        url:'/bottomChainNode/delete',
        method:'get',
        params
    })
}