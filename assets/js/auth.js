import Cookies from 'js-cookie'
import {
  parse as CookieParse
} from 'cookie-parse'

export const TokenKey = 'boss_user_token'

export function getToken(req) {
  if (process.client) { //客户端浏览器
    return Cookies.get(TokenKey);
  } else if (process.server && req && req.headers && req.headers.cookie) { //服务器从请求头中获取 cookie
    let cookieObj = CookieParse(req.headers.cookie || '');
    return cookieObj[TokenKey] || '';
  } else {
    return '';
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
