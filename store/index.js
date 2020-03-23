import {getToken} from '~/assets/js/auth'

export const state = () => ({

})

export const getters = {
  // token: state => state.user.token,
}

export const mutations = {

}

export const actions = {
  nuxtServerInit({commit,dispatch},{req}){
    return new Promise((resolve) => {
      let token = getToken(req);
      if (token) {
        commit('setToken', token);
        dispatch('getUserInfo', req).then(resolve).catch(resolve);
      } else {
        resolve();
      }
    })
  }
}

export const namespaced = false;
