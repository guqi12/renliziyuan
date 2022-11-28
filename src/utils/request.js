import axios from 'axios'
import { Promise } from 'core-js'
import { Message } from 'element-ui'
import store from '../store/index'
import router from '../router/index'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout   响应时间  超出时间则请求作废
})

// request interceptor
// 请求拦截器 -通过某些条件判断，可以在请求到后端之前添加某些参数
service.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})

// response interceptor
// 响应拦截器-通过某些条件判断，可以在前端接收到后端数据前对数据进行某些操作
service.interceptors.response.use(response => {
  console.log(response)
  const { data: { message, success, data }} = response
  if (!success) {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
  return data
},
error => {
  console.dir(error)
  if (error && error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  }
}
)

export default service
