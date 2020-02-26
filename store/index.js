import {TokenKey} from '~/assets/js/auth'
import cookie from 'cookie-parse'

export const state = () => ({

})

export const getters = {
  // token: state => state.user.token,
}

export const mutations = {

}

export const actions = {
  nuxtServerInit({commit,dispatch},{req}){
    let cookieObj = cookie.parse(req.headers.cookie);
    let token = cookieObj[TokenKey] || '';
    if (token){
      commit('setToken', token);
      return dispatch('getUserInfo', req);
    }
  }
}

export const namespaced = false;
