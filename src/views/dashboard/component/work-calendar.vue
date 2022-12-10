<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" @change="onchangeDate">
        <el-option
          v-for="item in currentList"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{date}">
        <div class="date-content">
          {{ date|formatTime('D') }}
          <span v-if="[0,6].includes(date.getDay())" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    const currentDate = new Date()
    const currentYear = new Date().getFullYear()
    // const currentList = []
    // for (let i = -5; i <= 5; i++) {
    //   currentList.push(currentYear + i)
    // }

    // es6写法
    const currentList = Array.from({ length: 11 }, (t, i) => currentYear + i - 5)
    return {
      currentYear: currentDate.getFullYear(),
      currentMonth: currentDate.getMonth() + 1,
      currentDate,
      currentList
    }
  },
  created() {},
  mounted() {},
  methods: {
    onchangeDate() {
      // new Date('2022-1')
      this.currentDate = new Date(this.currentYear + '-' + this.currentMonth)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select:first-child {
    margin-right: 15px;
}
::v-deep .el-calendar__header{
    display: none;
}

::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
