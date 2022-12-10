<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #before>共xxx条数据</template>
        <template #after>
          <el-button type="danger" size="small" @click="onExport">员工导出</el-button>
          <el-button type="success" size="small" @click="$router.push('/import')">员工导入</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>

        </template>
      </page-tools>
      <el-card>
        <el-table :data="list" :border="true" :stripe="true" style="width:100%;">
          <el-table-column label="序号" prop="index" :sortable="true" width="50"></el-table-column>
          <el-table-column laybel="姓名" prop="username" :sortable="true"></el-table-column>
          <el-table-column label="头像" prop="staffPhoto" :sortable="true" width="130">
            <template v-slot="{row}">
              <img
                v-imgerror="require('../../assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="border-radius: 50%;width: 100px;height: 100px;padding: 10px;"
                @click="onshowOrDialog(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" :sortable="true" width="130"></el-table-column>
          <el-table-column label="工号" prop="workNumber" :sortable="true"></el-table-column>
          <el-table-column label="聘用形式" prop="formOfEmployment" :sortable="true" width="130">
            <template v-slot="{row}">
              {{ row.formOfEmployment | formatHireType }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" :sortable="true"></el-table-column>
          <el-table-column label="入职时间" prop="timeofEntry" :sortable="true" width="130">
            <template v-slot="{row}">
              {{ row.timeofEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="enableState" :sortable="true">
            <template v-slot="{row}">
              <el-switch
                v-model="row.enableState"
                disabled
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="enableState" :sortable="true" width="260" fixed="right">
            <template v-slot="{row}">
              <el-button type="text" @click="$router.push('/employees/detail/'+row.id +'?username=zs&age=100')">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="onShowAssignRoleDialog(row.id)">角色</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="margin-top:15px;">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :total="page.total"
            @current-change="onCurrentChange"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <el-dialog
      title="头像预览"
      :visible.sync="showqrDialog"
      width="50%"
    >
      <el-row type="flex" justify="center">
        <QrcodeVue :value="staffPhoto" :size="250" level="H"> </QrcodeVue>
      </el-row>
    </el-dialog>
    <add-emp :show-dialog.sync="showDialog" @success="getEmployeeList"></add-emp>
    <el-dialog title="分配角色" :visible.sync="showAssignRoleDialog">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-button size="small" @click="showAssignRoleDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="assignRole">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeeList, assignRoles } from '../../api/employees'
import QrcodeVue from 'qrcode.vue'
import addEmp from './component/add-emp'
import { pick } from 'lodash'
import { formatHireType, formatTime } from '../../filter'
import { getRoles } from '../../api/setting'
import { getEmployeeBaseInfo } from '../../api/user'

export default {
  name: 'EmployeesIndex',
  components: {
    QrcodeVue,
    addEmp
  },
  props: {},
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      roleIds: [], // 选中的角色列表
      roleList: [], // 候选的角色列表
      currentId: undefined, // 当前操作用户的id
      showAssignRoleDialog: false,
      showqrDialog: false,
      staffPhoto: undefined,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {},
  methods: {
    async onShowAssignRoleDialog(id) {
      this.currentId = id
      const { rows } = await getRoles({ page: 1, pagesize: 50 })
      const { roleIds } = await getEmployeeBaseInfo(id)
      this.roleIds = roleIds
      this.roleList = rows
      this.showAssignRoleDialog = true
    },

    async assignRole() {
      await assignRoles({
        id: this.currentId,
        roleIds: this.roleIds
      })
      this.$message.success('"给用户分配角色成功"')
      this.showAssignRoleDialog = false
    },
    onExport() {
      import('../../vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        console.log(rows)
        // 表头对应关系
        const headers = {
          '姓名': 'username',
          '手机号': 'mobile',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        const data = rows.map(t => {
          const item = pick(t, Object.values(headers))
          item.timeOfEntry = formatTime(item.timeOfEntry)
          item.correctionTime = item.correctionTime ? formatTime(item.correctionTime) : ''
          item.formOfEmployment = formatHireType(item.formOfEmployment)
          return Object.values(item)
        })
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头，必填
          data, // 具体数据，必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      console.log('rowsid', rows)
    },
    onCurrentChange(val) {
      this.page.page = val
      this.getEmployeeList()
    },
    onshowOrDialog(staffPhoto) {
      if (!staffPhoto) {
        staffPhoto = require('../../assets/common/head.jpg')
      }
      this.staffPhoto = staffPhoto
      this.showqrDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
