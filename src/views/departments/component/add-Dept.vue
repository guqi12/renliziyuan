<template>
  <div>
    <el-dialog :visible="showDialog" v-bind="$attrs" :title="form.id?'编辑部门':'新增部门'" v-on="$listeners" @open="onOpen" @close="close">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入部门编码" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="下拉选择" prop="field105">
          <el-select v-model="form.field105" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in mangerOptions"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多行文本" prop="field106">
          <el-input
            v-model="form.field106"
            type="textarea"
            placeholder="请输入多行文本"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          ></el-input>
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
import { getEmployeessimple } from '../../../api/employees.js'
import { getDeparments, addDepartments, updateDepartmentment } from '../../../api/department'

export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object,
      // required: ture,
      default: () => ({})
    }
  },
  data() {
    const validateName = async(rule, value, callback) => {
      // 同级部门中禁止出现重复部门
      // 理解,当前输入的部门名称,和兄弟部门名称不能重复
      // 当前输入的部门名称
      //   this.form.name或者value
      // 父部门
      //   this.node
      // 所有部门
      //   const { depts } = await getDepartments()
      // 兄弟部门
      //   depts.filter(t=> t.pid === this.node.id)
      const { depts } = await getDeparments()
      const brothers = depts.filter(t => t.pid === this.node.id)
      if (brothers.find(t => t.name === value)) {
        callback(new Error('名称重复'))
      } else {
        callback
      }
    }
    const validateCode = async(rule, value, callback) => {
      // 部门编码在整个模块中都不允许重复
      // 理解,当前输入部门编号,和所有的部门编号不能重复
      // 前输入部门编号
      //  this.form.code或者value
      // 所有的部门
      //  const { depts } = await getDepartments()
      // 编号不能重复,查找(find)
      const { depts } = await getDeparments()
      let result
      if (this.form.id) {
        // 编辑，排除当前自己，自己可以编辑自己
        result = depts.filter(t => t.id !== this.form.id).find(t => t.code === value)
      } else {
        // 新增
        result = depts.find(t => t.code === value)
      }
      if (result) {
        callback(new Error('编号重复'))
      } else {
        callback
      }
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        },
        { validator: validateName, trigger: 'blur' },
        { min: 1, max: 50, message: '1-50个字符', trigger: 'blur' }],

        code: [{
          required: true,
          message: '请输入部门编码',
          trigger: 'blur'
        },
        { validator: validateCode, trigger: 'blur' },
        { min: 1, max: 50, message: '1-50个字符', trigger: 'blur' }],
        manager: [{
          required: true,
          message: '请输入部门负责人',
          trigger: 'blur'
        }],
        introduce: [{
          required: true,
          message: '请输入部门介绍',
          trigger: 'blur'
        },
        { min: 1, max: 300, message: '1-300个字符', trigger: 'blur' }]
      },
      mangerOptions: []
    }
  },

  computed: {},
  watch: {},
  async created() {
    this.mangerOptions = await getEmployeessimple()
  },
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // 重置表单
      // 对整个表单进行重置，将所有的字段重置为初始值并移除校验结果
      // 理解:
      // 移除校验结果-删除页面上红色的错误提示
      //   重置为初始值-重置为赋值的数据而不是重置为undefined
      //    将所有字段值-所有在el-form-item配置prop属性字段
      this.$refs['formRef'].resetFields()
      // 手动重置数据
      this.form = {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      }
      // 关闭对话框
      this.$emit('update:showDialog', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return

        if (this.form.id) {
          // 编辑
          await updateDepartmentment(this.form)
        } else {
          // 发请求
          await addDepartments({
            ...this.form,
            pid: this.node.id
          })
        }
        // 提示成功
        this.$message.success('发送请求成功')
        // 刷新列表
        this.$emit('success')
        // 关闭对话框
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
