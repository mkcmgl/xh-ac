import resquest from '@/utils/request'
//我的服务列表
export function showServiceStatusList (params){
    return resquest({
        url:'/myService/v1/showServiceStatusList',
        method:'get',
        params
    })
}
//我的服务列表详情
export function myServiceDetail (params){
    return resquest({
        url:'/myService/v1/showMyServiceDetail',
        method:'get',
        params
    })
}