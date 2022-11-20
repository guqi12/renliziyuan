import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters' // 引入getter模板
import app from './modules/app' // 引入app模板
import settings from './modules/settings' // 引入settings模板
import user from './modules/user' // 引入user模板

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

/*
const store = new Vuex.Store({
  // 配置项
  getters: {
    name: state => state.模板名称.name
  },
  modules: {
    '模板名称': {
      state: { name },
      mutations: {},
      actions: {},
    }
  }
})

// index.js
import getters from 'getters.js'
import user from 'user.js'
const store = new Vuex.Store({
  getters,
  modules: {
    user
  }
})

// getters.js
{
  name: state => state.模板名称.name
}

// user.js
{
  state: { name },
  mutations: {},
  actions: {},
}
*/

export default store
