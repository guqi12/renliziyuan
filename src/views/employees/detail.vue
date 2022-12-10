<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <el-form :model="form" :rules="rules" label-width="100px" style="width:400px;">
              <el-form-item prop="username" label="姓名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import jobInfo from './component/job-info'
import userInfo from './component/user-info'
import { getEmployeeBaseInfo } from '../../api/user.js'
import { saveUserDetailById } from '../../api/employees'
export default {
  name: 'EmployeesDeatil',
  components: {
    jobInfo,
    userInfo
  },
  props: {},
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    // this.form = await getEmployeeBaseInfo(this.$route.params.id)
    // this.form.password = ''
    const form = await getEmployeeBaseInfo(this.$route.params.id)
    form.password = ''
    this.form = form
    setTimeout(() => {
      // 服务器返回的数据没有password
      // this.form = { username: 'zs' }
      // this.form.password = ''
      // 解决办法1
      // this.$set(this.form, 'password', '')
      // 解决办法2
      // const form = { username: 'zs' }
      // form.password = ''
      // this.form = form
    }, 1000)
  },
  mounted() {

  },
  methods: {
    async onSubmit() {
      await saveUserDetailById(this.form)
      this.$message.success('修改成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
