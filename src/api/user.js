// import store from '@/store'
import request from '@/utils/request'
// 用户登录
export const myLogin = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})
// 获取用户基本资料
export const getUserBaseInfo = data => request({
  method: 'POST',
  url: '/sys/profile',
  // headers: {
  //   Authorization: 'Bearer ' + store.state.user.token
  // },
  data
})
// 获取员工基本信息
export const getEmployeeBaseInfo = id => request({
  method: 'get',
  url: '/sys/user/' + id // 注意id和路径之间有/
  // headers: {
  //   Authorization: 'Bearer ' + store.state.user.token
  // }
})
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

