import Layout from '@/layout/index.vue'
export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys/index.vue'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
