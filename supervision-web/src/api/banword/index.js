import request from '@/utils/request'

// 查询违禁词列表
export function banWordList(pageNum,pageSize,data) {
  return request({
    url: `/v1/supervision/words-crud/list?pageNum=${pageNum}&&pageSize=${pageSize}`,
    method: 'post',
    data
  })
}
// 增加违禁词
export function banWordAdd(data) {
    return request({
      url: '/v1/supervision/words-crud/add',
      method: 'post',
      data
    })
  }
// 删除违禁词
export function banWordDel(data) {
    return request({
      url: '/v1/supervision/words-crud/del_batch',
      method: 'delete',
      data
    })
  }  
  // 监管处置列表
export function handleList(params) {
  return request({
    url: '/v1/violation_handle/list',
    method: 'get',
    params
  })
}  
