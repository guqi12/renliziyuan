import Layout from '../../layout/index.vue'

export default {
  path: '/employees',
  component: Layout,
  // hidden:true,
  children: [{
    path: '', // 默认路由 。空字符串
    component: () => import('../../views/employees/index.vue'),
    meta: { title: '员工', icon: 'people' }
  }]
}
