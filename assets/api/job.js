import request from '../js/request'

//获取热门搜索
export const getHotSearch = (params,req) => request({
  url: '/jobs/getHotSearch',
  method: 'get',
  req,
  params
})

//获取职位类型
export const getJobType = (params,req) => request({
  url: '/jobs/getJobType',
  method: 'get',
  req,
  params
})
