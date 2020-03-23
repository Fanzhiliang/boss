import {getToken} from '~/assets/js/auth'

export default function ({store, redirect ,req}) {
  if (process.server){
    return new Promise(function(resolve,reject){
      let token = getToken(req);//判断是否有 token
      if (token){
        store.commit('setToken', token);
        resolve();
      }else{
        reject();
      }
    }).then(function () {//判断 token 是否有效
      return store.dispatch('getUserInfo', req);
    }).catch(function () {//跳转到登录页面
      redirect('/login');
    })
  }
}
