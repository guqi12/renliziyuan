<template>
  <div class="login-container">
    <el-card class="card">
      <el-form ref="formRef" :rules="rules" :model="form">
        <el-form-item style="margin-top:50px" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="onSubmit()">登录</el-button>
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
      form: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },

          { validator: this.validatoMobile, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码为6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validatoMobile(rule, value, callback) {
      if (value.charAt(2) === '9') {
        callback()
      } else {
        callback(new Error('手机号第三位必须是9'))
      }
    },
    onSubmit() {
      console.log('点击了登录')
      this.$refs.formRef.validate((isOk) => {
        console.log(isOk)
      })
    }
  }
}
</script>

<style lang="scss">
  .login-container{
    display: flex;
    width: 100%;
    height: 100%;
    background-color: pink;
    justify-content: center;
    align-items: center;
    .card{
      width: 400px;
      height: 300px;
    }
  }
</style>
