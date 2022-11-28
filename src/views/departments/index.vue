<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- <el-row>
           <el-col :span="23">左</el-col>
           <el-col :span="1">右</el-col>
         </el-row> -->
        <TreeNode :data="companyInfo">
          <el-dropdown-item @click.native="onAdd(companyInfo)">
            添加子部门
          </el-dropdown-item>
        </TreeNode>
        <el-tree :data="list" :props="{label:'name'}" default-expand-all>
          <template v-slot="{data}">
            <TreeNode :data="data">
              <el-dropdown-item @click.native="onAdd(data)">添加子部门</el-dropdown-item>
              <el-dropdown-item @click.native="onUpdate(data.id)">编辑部门</el-dropdown-item>
              <el-dropdown-item @click.native="onDel(data.id)">删除部门</el-dropdown-item>
            </TreeNode>
          </template>
        </el-tree>
      </el-card>
      <!-- 表单 -->
      <add-Dept
        ref="addRef"
        :show-dialog.sync="showDialog"
        :node="currentNode"
        @success="getDeparments"
      ></add-Dept>
    </div>
  </div>
</template>

<script>
import { getDeparments, delDepartments, getDepartmentsById } from '../../api/department.js'
import { translatelisttotree } from '../../utils/index.js'
import TreeNode from './component/tree-node'
import addDept from './component/add-Dept'
export default {
  name: 'DepartmentsPage',
  components: { TreeNode, addDept },
  props: {},
  data() {
    return {
      showDialog: false,
      companyInfo: { name: '传智教育', manager: '负责人', id: '' },
      list: [],
      currentNode: {}
    }
  },
  created() {},
  mounted() {
    this.getDeparments()
  },
  methods: {
    async getDeparments() {
      try {
        const { depts } = await getDeparments()
        console.log(depts)
        this.list = translatelisttotree(depts, '')
      } catch (error) {
        console.log(error)
      }
    },
    onAdd(node) {
      console.log('点击新增')
      this.showDialog = true
      this.currentNode = node
    },
    async onUpdate(id) {
      const data = await getDepartmentsById(id)
      console.log('data', data)
      this.$refs.addRef.form = data
      console.log('点击编辑')
      this.showDialog = true
    },
    onDel(id) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonClass: '取消',
        type: 'warning'
      }).then(async action => {
        // 点击确定
        await delDepartments(id)
        // 提示成功
        this.$message.success('删除成功')
        // 刷新列表
        this.getDeparments()
      }).catch(() => {

      })
      console.log('点击删除')
    }

  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
.el-dropdown{
  margin-left: 10px;
}
</style>

