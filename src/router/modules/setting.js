import Layout from '@/layout/index.vue'
export default {
  path: '/setting',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'settings',
      component: () => import('@/views/setting/index.vue'),
      meta: { title: '公司设置', icon: 'money' }
    }
  ]
}
