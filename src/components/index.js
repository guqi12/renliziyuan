// 全局组件简单注册方式
// import Vue from 'vue'
// import pageTools from './PageTools/index.vue' // 引入组件
// Vue.component('page-tools', pageTools) // 注册全局公共组件

// 全局组件-插件注册方式
import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import ImageUpload from './ImageUpload/index.vue'
import screenfull from './screenfull/index.vue'
function install(Vue) {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
  Vue.component('ImageUpload', ImageUpload)
  Vue.component('screenfull', screenfull)
}

export default {
  install
}
