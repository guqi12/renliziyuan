// 通过路由的守卫来控制页面跳转
import router, { constantRoutes } from './router/index.js'
import store from './store/index'
// 前置守卫，每一次跳转前
router.beforeEach(async(to, from, next) => {
  // to:要去的页面信息
  // to.path：要去页面的路径
  // from：从那个页面来的信息
  // from.path：来的页面的路径
  // next方法
  // next（），允许跳转，next（'/路径'）重定向到其他页面去
  // 如果有token才允许跳转
  // 白名单
  if (to.path === '/login' || to.path === '/404' || to.path === 'learn-form') {
    return next()
  }
  if (store.state.user.token) {
    // if (store.state.user.userInfo === undefined) {
    if (!store.state.user.userInfo.id) {
      await store.dispatch('user/getInfo')
      /*
      const menus = store.state.user.userInfo.roles.menus
      const filterRoutes = asyncRouter.filter(t => menus.includes(t.children[0].name))
      console.log(filterRoutes, 'filterRoutes')
      //  添加路由，通过路由api方法添加
      // 注意，addRoutes不会影响路由原始配置
      router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
      // 解决菜单没有显示
      router.options.routes = [...constantRoutes, ...filterRoutes]
      // 解决刷新报404的问题
      // 重新跳转一次
      next(to.path)
       */
      const { roles: { menus }} = await store.dispatch('user/getInfo')
      // 完成表单权限，方式2-标准模式(用vuex)
      // 获取menus数据，准备做菜单过滤
      // const menus = store.state.user.userInfo.roles.menus
      const filterRoutes = await store.dispatch('permission/filterRoutes', menus)
      //  添加路由，通过路由api方法添加
      // 注意，addRoutes不会影响路由原始配置
      router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
      // 解决菜单没有显示
      router.options.routes = [...constantRoutes, ...filterRoutes]
      // 解决刷新报404的问题
      // 重新跳转一次
      next(to.path)
    }
    next()
  } else {
    next('/login')
  }
})

// 后置守卫
router.afterEach((to, from) => { })
