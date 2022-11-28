// import Vue from 'vue'
import dayjs from 'dayjs'
// 定义过滤器方式1-简化写法
// Vue.filter('formatTime', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

// 定义过滤器方式二  完整写法
export function formatTime(val) {
  return dayjs(val).format('YYYY-MM-DD')
}

import EmployeesEnum from '../constant/employees'
export function formatHireType(val) {
  const f = EmployeesEnum.hireType.find(t => t.id === val)
  return f ? f.value : '未知'
}
