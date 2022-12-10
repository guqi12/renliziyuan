<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template #after>
          <el-button type="primary" size="small" @click="Add({pid:'0',type:1})">新增权限</el-button>
        </template>
      </PageTools>
      <el-table :data="list" :border="true" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="discription"></el-table-column>
        <el-table-column label="操作" prop="">
          <template v-slot="{row}">
            <el-button type="text" @click="Add({pid:row.id,type:2})">添加</el-button>
            <el-button type="text" @click="onEdit(row.id)">编辑</el-button>
            <el-button type="text" @click="Del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-perm v-if="isShowPerm" ref="addPermRef" :visible="isShowPerm" @close="isShowPerm = false"></add-perm>

    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission, getPermissionDetail } from '../../api/Permission.js'
import { translatelisttotree } from '../../utils'
import addPerm from './component/add-perm'
export default {
  name: 'PermissionPage',
  components: { addPerm },
  props: {},
  data() {
    return {
      list: [],
      isShowPerm: false

    }
  },
  created() {
    this.getPermissionList()
  },
  mounted() {

  },
  methods: {

    async getPermissionList() {
      this.list = translatelisttotree(await getPermissionList(), '0')
      console.log('list', this.list)
    },
    Del(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async(action) => {
          await delPermission(id)
          this.$message({
            // type: 'info',
            message: '删除成功'
          })
          this.getPermissionList()
        })
        .catch(action => {

        })
    },
    async onEdit(id) {
      // 打开对话框
      this.isShowPerm = true
      this.$refs.addPermRef.form = await getPermissionDetail(id)
    },
    async Add(data) {
      this.isShowPerm = true
      await this.$nextTick() // 解决异步问题
      Object.assign(this.$refs.addPermRef.form, data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

