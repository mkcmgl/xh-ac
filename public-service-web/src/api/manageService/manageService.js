import request from '@/utils/request'
//服务管理列表
export function serviceList (params){
    return request({
        url:'/manageService/v1/serviceList',
        method:'get',
        params
    })
}
//新增服务
export function create (data){
    return request({
        url:'/manageService/v1/create',
        method:'post',
        data,
        timeout:60000
    })
}
//编辑服务
export function update (data){
    return request({
        url:'/manageService/v1/update',
        method:'post',
        data,
        timeout:60000
    })
}