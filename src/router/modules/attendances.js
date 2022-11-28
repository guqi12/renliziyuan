import Layout from '@/layout/index.vue'
export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/index.vue'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
