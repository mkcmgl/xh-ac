import request from '@/utils/request'
//子链状态列表
export function subchainStatusList(params){
    return request({
        url:'/bottomChainStatus/list',
        method:'get',
        params
    })
}