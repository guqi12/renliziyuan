import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '../directive/index'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import '@/icons/index' // icon
import '@/permission.js' // permission control
import './components/index' // 引入注册公共组件文件简单方式
import Ui from './components/index' // 组件祖册-插件引入方式
// import './filter/index'
// 单个注册过滤器
/*
Vue.filter('formatTime', filters.formatTime)
*/
// 批量注册过滤器
// 循环对象
/*
for (var key in filters) {
  Vue.filter(key, filters[key])
}
*/

import * as filters from './filter/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Ui) // 使用
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
