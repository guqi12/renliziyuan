<template>
  <div>
    <el-dialog v-bind="$attrs" title="Dialog Titile" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="120px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入单行文本姓名" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="form.timeOfEntry"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择入职时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label=" 聘用形式 " prop="formOfEmployment">
          <el-select
            v-model="form.formOfEmployment"
            placeholder="请选择 聘用形式 "
            clearable
            :style="{width: '100%'}"
          >
            <el-option
              v-for="(item, index) in formOfEmploymentOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="form.workNumber" placeholder="请输入工号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="form.departmentName" placeholder="请输入部门" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="form.correctionTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择转正时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      form: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      rules: {
        username: [{
          required: true,
          message: '请输入单行文本姓名',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        timeOfEntry: [{
          required: true,
          message: '请选择入职时间',
          trigger: 'change'
        }],
        formOfEmployment: [{
          required: true,
          message: '请选择 聘用形式 ',
          trigger: 'change'
        }],
        workNumber: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        departmentName: [{
          required: true,
          message: '请输入部门',
          trigger: 'blur'
        }],
        correctionTime: []
      },
      formOfEmploymentOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['formRef'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(valid => {
        if (!valid) return
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
