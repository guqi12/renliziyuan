<template>
  <el-row type="flex" style="width:100%">
    <el-col>{{ data.name }}</el-col>
    <el-col>
      <el-row type="flex" justify="end">
        {{ data.manager }}
        <el-dropdown>
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <slot></slot>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeNode',
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-dropdown{
  margin-left: 10px;
}
</style>
