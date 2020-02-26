import { getToken, setToken, removeToken } from '~/assets/js/auth'
import {loginByPassword,loginByVerifyCode,logout,getUserInfo} from '~/assets/api/user'

export const state = () => ({
  token: getToken() || '',
  userInfo: false,
})

export const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  isLogin: state => { //是否已经登录
    return state.token && state.userInfo
  }
}

export const mutations = {
  setToken: (state, token) => {
    if (token) {
      state.token = token;
      setToken(token);
    } else {
      state.token = '';
      removeToken();
    }
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo || false;
  }
}

export const actions = {
  loginByPassword: ({commit}, userInfo) => {
    return new Promise((resolve, reject) => {
      loginByPassword(userInfo).then((token) => {
        commit('setToken', token);
        resolve(token);
      }).catch(reject)
    })
  },
  loginByVerifyCode: ({commit}, userInfo) => {
    return new Promise((resolve, reject) => {
      loginByVerifyCode(userInfo).then((token) => {
        commit('setToken', token);
        resolve(token);
      }).catch(reject)
    })
  },
  logout: ({commit}) => {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        commit('setToken', '');
        resolve(res);
      }).catch(reject)
    })
  },
  getUserInfo: ({commit,state,dispatch},req) => {
    return new Promise((resolve, reject) => {
      getUserInfo({},req).then((userInfo) => {
        commit('setUserInfo', userInfo);
        resolve(userInfo);
      }).catch((err) => {
        dispatch('logout');
        reject(err);
      })
    })
  },
}




export const namespaced = false;
