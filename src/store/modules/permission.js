import { asyncRouter, constantRoutes } from '../../router/index'
export default {
  namespaced: true,
  state: {
    routes: [...constantRoutes]
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    removeRoutes(state, routes) {
      state.routes = []
    }
  },
  actions: {
    filterRoutes(context, menus) {
      const filterRoutes = asyncRouter.filter(t => menus.includes(t.children[0].name))
      context.commit('setRoutes', filterRoutes)
      return filterRoutes
    }
  }
}
