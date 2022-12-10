<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="角色管理">
          <el-row>
            <el-button type="primary" size="'small" @click="onAdd">新增角色</el-button>
          </el-row>
          <el-table
            :data="list"
            border
            stripe
            style="width: 100%;margin-top:15px;"
          >
            <el-table-column
              label="序号"
              type="index"
              width="80"
            >
            </el-table-column>
            <el-table-column
              label="角色"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              label="描述"
              prop="description"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              prop="Operation"
            >
              <template v-slot="{row}">
                <el-button type="success" size="small" @click="onShowAssignPermDialog(row.id)">分配权限</el-button>
                <el-button type="primary" size="small" @click="onupdate(row.id)">编辑</el-button>
                <el-button type="danger" size="small" @click="onDel(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-row type="flex" justify="end" style="margin-top:15px;">
            <el-pagination
              layout="prev, pager, next"
              :page-size="page.pagesize"
              :total="page.total"
              @current-change="onCurrentChange"
            >
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
          >
          </el-alert>
          <el-form label-width="80px" style="width: 400px;margin-top:15px;">
            <el-form-item label="公司名称">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="form.companyAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司邮件">
              <el-input v-model="form.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remarks" type="textarea" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :visible="showDialog" v-bind="$attrs" :title="formData.id?'编辑角色':'新建角色'" v-on="$listeners" @open="onOpen" @close="close">
      <el-form ref="formRef" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入单行文本角色名称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description" placeholder="请输入角色描述" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 模块 -->
    <el-dialog
      title="分配权限"
      :visible.sync="showAssignPermDialog"
      width="50%"
    >
      <el-tree
        ref="treeRef"
        node-key="id"
        :data="permList"
        :props="{label:'name'}"
        show-checkbox
        default-expand-all
        check-strictly
      ></el-tree>
      <el-row slot="footer" type="flex" justify="center">
        <el-button size="small" @click="showAssignPermDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="assignPerm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyById, getRoles, addRole, deleteRole, getRoleDetail, updateRole, assignPerm } from '../../api/setting.js'
import { translatelisttotree } from '../../utils'
import { getPermissionList } from '../../api/Permission'
export default {
  name: 'SettingPage',
  components: {},
  props: {},
  data() {
    return {
      currentId: undefined,
      showDialog: false,
      showAssignPermDialog: false,
      formData: {
        name: undefined,
        description: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入单行文本角色名称',
          trigger: 'blur'
        }],
        description: []
      },
      activeName: 'first',
      form: {},
      list: [],
      permList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      }
    }
  },
  async created() {
    this.form = await getCompanyById(this.$store.state.user.userInfo.companyId)
    this.getRoles()
  },
  mounted() {},
  methods: {
    async onShowAssignPermDialog(id) {
      this.currentId = id
      // 获取权限树
      this.permList = translatelisttotree(await getPermissionList(), '0')
      console.log(this.permList)
      this.showAssignPermDialog = true
      const { permIds } = await getRoleDetail(id)
      // await this.$nextTick()   解决异步问题
      this.$refs.treeRef.setCheckedKeys(permIds)
    },
    async assignPerm() {
      const permIds = this.$refs.treeRef.getCheckedKeys()
      console.log(permIds)
      await assignPerm({
        id: this.currentId,
        permIds
      })
      this.$message.success('操作成功')
      this.showAssignPermDialog = false
    },
    onAdd() {
      this.showDialog = true
    },
    async getRoles() {
      const { rows, total } = await getRoles(this.page)
      this.list = rows
      this.page.total = total
    },
    onCurrentChange(val) {
      this.page.page = val
      this.getRoles()
    },
    onOpen() {},
    close() {
      this.$refs['formRef'].resetFields()
      this.formData = {
        name: undefined,
        description: undefined
      }
      this.showDialog = false
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          // 编辑
          await updateRole(this.formData)
          this.$message.success('修改成功')
        } else {
          // 添加
          await addRole(this.formData)
          this.$message.success('添加成功')
        }
        this.getRoles()
        this.close()
      })
    },
    async onupdate(id) {
      const res = await getRoleDetail(id)
      this.formData = res
      console.log(res)
      this.showDialog = true
    },
    async onDel(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await deleteRole(id) // 发请求
        this.$message.success('删除成功') // 提示成功
        this.getRoles() // 刷新页面
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

