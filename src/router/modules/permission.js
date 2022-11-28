import Layout from '@/layout/index.vue'
export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index.vue'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
