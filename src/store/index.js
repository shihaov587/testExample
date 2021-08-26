import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    // 获取用户信息
    user: (state) => (key) => {
      if (state.user !== null && key !== undefined) {
        return state.user !== undefined ? state.user[key] : ''
      } else {
        return state.user
      }
    }
  },
  mutations: {
    initUser (state, user) {
      if (user === null || user ===undefined) {
        user = localStorage.getItem('user')
        if (user !== null) {
          user = JSON.parse(user)
          if ((user.local_time !== undefined && user.validata !== undefined) && _.now() - user.local_time < user.validata * 1000) {
            state.user = user
          } else {
            state.user = null
          }
        } else {
          state.user = null
        }
      } else {
        state.user = null
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
