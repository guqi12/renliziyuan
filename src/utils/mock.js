// 引入模块
import mock from 'mockjs'
// 拦截ajax
// mock.mock('http://localhost:9528/api/sys/profile', 'post', function() {
mock.mock('/api/sys/profile', 'post', function() {
  // 02的账号
  /*
  return {
    success: true,
    code: 10000,
    data: {
      userId: '604f764971f93f3ac8f365c2',
      mobile: '13800000002',
      username: '管理员',
      roles: {
        menus: [
          'employees',
          'settings',
          'permissions',
          'social_securitys',
          'approvals',
          'attendances',
          'salarys',
          'departments'
        ],
        points: ['aa'],
        apis: []
      },
      companyId: '1',
      company: '传智播客'
    },
    message: '获取资料成功'
  }
  */
  // 03
  return {
    success: true,
    code: 10000,
    data: {
      userId: '604f764971f93f3ac8f365c3',
      mobile: '13800000003',
      username: '孙财',
      roles: { menus: [
        'employees',
        'settings',
        'permissions',
        'social_securitys',
        'approvals',
        'attendances',
        'salarys',
        'departments'
      ],
      points: [
        'add-dept'
      ],
      apis: []
      },
      companyId: '1',
      company: '传智播客'
    },
    message: '获取资料成功'
  }
})
