import Layout from '@/layout/index.vue'
export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'departments',
      component: () => import('@/views/departments/index.vue'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
