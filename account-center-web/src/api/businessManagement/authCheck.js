import request from '@/utils/request'
//获取待审核列表
export function getTableData(params){
    return request({
        url:'/auth/reviewList',
        method:'get',
        params
    })
}
//进行审核
export function review(data){
    return request({
        url:'/auth/review',
        method:'post',
        data
    })
}