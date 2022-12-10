<template>
  <div>
    <el-dialog v-bind="$attrs" :title="form.id? '编辑权限':'添加权限'" v-on="$listeners" @open="onOpen">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入单行文本权限名称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code" placeholder="请输入权限标识" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入权限描述" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="开启" prop="enVisible">
          <el-switch v-model="form.enVisible" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="$listeners.close()">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addPermission, updatePermission } from '../../../api/Permission'
export default {
  components: {},
  inheritAttrs: false,
  // props: {
  //   isShowPerm: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        description: undefined,
        enVisible: 0,
        pid: undefined,
        type: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入单行文本权限名称',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入权限标识',
          trigger: 'blur'
        }],
        description: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
      this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '保存',
        cancelButtonText: '放弃修改'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '保存修改'
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃保存并离开页面'
              : '停留在当前页面'
          })
        })
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        this.form.id
          ? await updatePermission(this.form)
          : await addPermission(this.form)
        this.$message.success('添加成功')
        this.$parent.getPermissionList() // $parent 调用父组件方法
        this.$emit('close')
      })
    }
  }

}

</script>
<style>
</style>
