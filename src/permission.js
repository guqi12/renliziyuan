// 通过路由的守卫来控制页面跳转
import router from './router/index.js'
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
    }
    next()
  } else {
    next('/login')
  }
})

// 后置守卫
router.afterEach((to, from) => { })
