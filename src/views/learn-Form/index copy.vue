<template>
  <div class="login-container">
    <el-card class="card">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button class="button" @click="onSubmit()">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'LearnIndex',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''

      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6-16位字符', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      this.$refs.ruleForm.validate((isok) => {
        console.log(isok)
      })
    }
  }
}
</script>

<style lang="scss">
.login-container{
  width: 100vm;
  height: 100vh;
  background-image: url('../../assets/404_images/RE4wB6L.jpeg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card{
    background: transparent;

    .el-card__body{
      padding: 70px 70px 0 0 ;
    }
  }
  .card{
    width: 500px;
    height: 300px;
    .el-input__inner{
      opacity: .6;
      color: rgb(255, 38, 74);
    }
  }
  .button{
    width: 100%;
    background: transparent;
    color: #fff;
  }
  .button:active{
    background-color:#82ddfe;
    opacity: .8;
  }
}
</style>
