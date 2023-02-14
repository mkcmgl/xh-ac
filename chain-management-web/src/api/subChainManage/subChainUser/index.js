import request from '@/utils/request'
//子链用户列表
export function subchainUserList(params){
    return request({
        url:'/bottomChainUser/page',
        method:'get',
        params
    })
}