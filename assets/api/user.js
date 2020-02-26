import request from '../js/request'

//账号密码登录
export const loginByPassword = (data,req) => request({
  url: '/user/loginByPassword',
  method: 'post',
  req,
  data
})

//手机验证码登录
export const loginByVerifyCode = (data,req) => request({
  url: '/user/loginByVerifyCode',
  method: 'post',
  req,
  data
})

//获取用户信息
export const getUserInfo = (data,req) => request({
  url: '/user/getUserInfo',
  method: 'get',
  req,
  data
})

//退出登录
export const logout = (params,req) => request({
  url: '/user/logout',
  method: 'get',
  req,
  params
})

//获取手机验证码
export const getVerifyCode = (params,req) => request({
  url: '/user/getVerifyCode',
  method: 'get',
  req,
  params
})
