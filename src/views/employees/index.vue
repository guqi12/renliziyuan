<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #before>共xxx条数据</template>
        <template #after>
          <el-button type="danger">员工导出</el-button>
          <el-button type="success">员工导入</el-button>
          <el-button type="primary">新增员工</el-button>
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
            <el-button type="text">查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button type="text">角色</el-button>
            <el-button type="text">删除</el-button>
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
  </div>
</template>

<script>
import { getEmployeeList } from '../../api/employees'
import QrcodeVue from 'qrcode.vue'
export default {
  name: '',
  components: {
    QrcodeVue
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
      showqrDialog: false,
      staffPhoto: undefined
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {},
  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
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
