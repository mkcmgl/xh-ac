import request from '@/utils/request'


// 接入服务

export function serviceAddList(data) {
    return request({
        url: `/access/v1/serviceAddList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
        method: 'POST',
        data,
    })
}

// 新增服务
export function addService(data) { 
    return request({
        url: '/access/v1/addService',
        method: 'POST',
        data,
        timeout: 60000
    }) 
}
//编辑服务
export function updateService(data) {
    return request({
        url: '/access/v1/updateService',
        method: 'post',
        data,
        timeout: 60000
    })
}


// 审核列表
export function getReviewList(data) {
    return request({
        url: `/access/v1/reviewList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
        method: 'POST',
        // headers: {
        //   isToken:false
        // },
        data
    })
}
//接入服务审核
export function review(data) {
    return request({
        url: '/access/v1/review',
        method: 'POST',
        data
    })
} 
