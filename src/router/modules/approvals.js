import Layout from '@/layout/index.vue'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      // 默认路由,空字符串
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index.vue'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
