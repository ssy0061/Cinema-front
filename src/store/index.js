import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: null,
    
  },
  mutations: {
    GET_LOGIN_USER: function (state) {
      const token = localStorage.getItem('JWT')
      const config = {
          Authorization: `Bearer ${token}`
      }
      console.log(state.isLogin)
      if (token) {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/accounts/get/',
          headers: config
        })
        .then(res => {
          console.log(res.data)
          state.loginUser = res.data
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    DO_LOGIN: function (state) {
      state.isLogin = true
      // console.log(state.loginUser)
    },
    DO_LOGOUT: function (state) {
      state.isLogin = false
      state.loginUser = null
      // console.log(state.loginUser)
    }
  },
  actions: {
    getLoginUser: function ({commit}) {
      commit('GET_LOGIN_USER')
    },
    doLogin: function ({commit}) {
      // console.log(user)
      commit('DO_LOGIN')
      commit('GET_LOGIN_USER')
    },
    doLogout: function({commit}) {
      commit('DO_LOGOUT')
    },
  },
  modules: {
  }
})
