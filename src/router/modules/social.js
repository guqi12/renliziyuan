import Layout from '@/layout/index.vue'
export default {
  path: '/social',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'social',
      component: () => import('@/views/social/index.vue'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
