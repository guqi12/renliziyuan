import { getToken, removeToken, setToken } from '@/utils/auth'
const { myLogin, getUserBaseInfo, getEmployeeBaseInfo } = require('@/api/user')

const state = {
  token: getToken(), // 定义数据
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = undefined
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state, userInfo) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, loginForm) {
    const token = await myLogin(loginForm)
    context.commit('setToken', token)
  },
  async logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  },
  async getInfo(context) {
    const m = await getUserBaseInfo()
    const n = await getEmployeeBaseInfo(m.userId)
    context.commit('setUserInfo', { ...m, ...n })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
