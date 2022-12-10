import Layout from '../../layout/index.vue'

export default {
  path: '/employees',
  component: Layout,
  // hidden:true,
  children: [{
    path: '', // 默认路由 。空字符串
    name: 'employees',
    component: () => import('../../views/employees/index.vue'),
    meta: { title: '员工', icon: 'people' }
  },
  {
    path: 'detail/:id',

    hidden: true,
    component: () => import('../../views/employees/detail.vue')
  },
  {
    path: 'print/:id',
    name: 'print',
    hidden: true,
    component: () => import('../../views/employees/print.vue')
  }
  ]
}
