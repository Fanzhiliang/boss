import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import {getToken,TokenKey} from '~/assets/js/auth'
import cookie from 'cookie-parse'

const service = ({
  url = '',
  method = 'get',
  data = {},
  params = {},
  headers = {},
  req = {}
}) => {
  return new Promise(function(resolve,reject){
    axios({
      url: process.env.BASE_URL + url,
      method,
      data,
      params,
      headers: Object.assign(headers, {
        'Authorization': (function () {
          if (process.client){
            return getToken() || '';
          } else if (process.server && req) {
            let cookieObj = cookie.parse(req.headers.cookie);
            return cookieObj[TokenKey] || '';
          } else {
            return '';
          }
        })()
      })
    }).then(response => {
      const res = response.data

      // code 不为200出错
      if (res.code !== 200) {

        //普通错误
        if (res.code === 1) {
          process.client && Message({
            message: res.msg || 'Error',
            type: 'error'
          })
        } else if (res.code === 2) { // code 为2是属于登录相关的错误
          process.client && MessageBox.confirm('你的登录信息已经过期,请重新登录', '提示', {
            confirmButtonText: '重新登录',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            // $nuxt.$store.dispatch('user/logout');
            // router.push({path: '/login'});
          })
        }
        reject(res.msg || 'Error');
      } else {
        resolve(res.data || res.msg || res);
      }
    }).catch(err => {
      console.log(err)
      reject(err);
    })
  })
}

export default service;
