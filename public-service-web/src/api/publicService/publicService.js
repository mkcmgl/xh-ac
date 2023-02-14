import request from '@/utils/request'
// 公共服务分类列表
export function serviceTypeList() {
    return request({
      url: '/publicService/v1/serviceTypeList',
      method: 'get',
    })
  }
// 公共服务分类服务
export function serviceList(data) {
    return request({
      url: '/publicService/v1/serviceList',
      method: 'post',
      data
    })
  }  
//公共服务-获取图标/图片
export function getIconOrImage(data) {
  return request({
    url: '/publicService/v1/getIconOrImage',
    method: 'post',
    data
  })
} 
//公共服务-服务详情
export function ServiceDetail(params) {
  return request({
    url: '/publicService/v1/showServiceDetail',
    method: 'get',
    params,
    timeout:60000
  })
} 



//公共服务-用户是否已获取服务
export function showUserServiceStatus(params) {
  return request({
    url: '/publicService/v1/showUserServiceStatus',
    method: 'get',
    params
  })
} 
//公共服务-获取服务
export function getService(params) {
  return request({
    url: '/publicService/v1/getService',
    method: 'get',
    params
  })
} 

// 获取审核列表
export function getReviewList(data) {
  return request({
    url: `/openingReview/v1/reviewList?pageSize=${data.pageSize}&pageNum=${data.pageNum}`,
    method: 'POST',
    // headers: {
    //   isToken:false
    // },
    data
  })
}
//开通公共服务-详情
export function showUserServiceDetail(data) {
  return request({
    url: '/publicService/v1/showUserServiceDetail',
    method: 'POST',
    data
  })
} 

//开通公共服务-审核
export function review(data) {
  return request({
    url: '/openingReview/v1/review',
    method: 'POST',
    data
  })
} 


// 判断获取状态
export function reviewStatus(data) {
  return request({
    url: '/openingReview/v1/reviewStatus',
    method: 'POST',
    data
  })
} 
