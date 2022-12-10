<template>
  <div>
    <el-dialog :visible="showDialog" v-bind="$attrs" title="新增员工" v-on="$listeners" @open="onOpen" @close="close">
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
              v-for="(item, index) in EmployeesEnum.hireType"
              :key="index"
              :label="item.value"
              :value="item.id"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="form.workNumber" placeholder="请输入工号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="form.departmentName" placeholder="请输入部门" clearable :style="{width: '100%'}" @focus="getDepartments">
          </el-input>
          <el-tree
            v-if="showTree"
            :data="list"
            :props="{label:'name'}"
            default-expand-all
            @node-click="onNodeClick"
          ></el-tree>
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
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getDeparments } from '../../../api/department.js'
import EmployeesEnum from '../../../constant/employees.js'
import { translatelisttotree } from '../../../utils'
import { addEmployee } from '../../../api/employees'
export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      EmployeesEnum,
      showTree: false,
      form: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      list: [],
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
          trigger: 'change'
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
    close() {
      this.$refs['formRef'].resetFields()
      this.$emit('update:showDialog', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        await addEmployee(this.form)
        this.$message.success('操作成功')
        this.$emit('success')
        this.close()
      })
    },
    onNodeClick(data) {
      this.form.departmentName = data.name
      this.showTree = false
    },
    async getDepartments() {
      const { depts } = await getDeparments()
      this.list = translatelisttotree(depts, '')
      this.showTree = true
    }
  }
}

</script>
<style>
</style>
