import request from '@/utils/request'
// 获取部门列表
export const getDeparments = () => request({
  method: 'GET',
  url: '/company/department'
})
// 新增部门
export const addDepartments = (data) => request({
  method: 'POST',
  url: '/company/department',
  data
})
// 删除部门
export const delDepartments = (id) => request({
  url: '/company/department/' + id,
  method: 'delete'
})
// 获取id的数据
export const getDepartmentsById = (id) => request({
  url: '/company/department/' + id,
  method: 'get'
})
// 编辑部门
export const updateDepartmentment = (data) => request({
  url: '/company/department/' + data.id,
  method: 'get',
  data
})

