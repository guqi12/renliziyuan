<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel :on-success="onSuccess"></UploadExcel>
    </div>
  </div>
</template>

<script>
import UploadExcel from '../components/UploadExcel/index'
import { importEmployee } from '../api/employees'
export default {
  name: '',
  components: {
    UploadExcel
  },
  props: {},
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSuccess({ results }) {
      console.log(results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const data = results.map(t => {
        const item = {}
        for (var key in t) {
          const newKey = userRelations[key]
          item[newKey] = t[key]
        }
        return item
      })
      await importEmployee(data)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
