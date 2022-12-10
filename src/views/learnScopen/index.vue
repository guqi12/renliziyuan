<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="fatehr">
        <div>
          <sonPage></sonPage>
        </div>
      </div>
      <!-- <sonPage></sonPage> -->

    </div>
  </div>
</template>

<script>
import sonPage from './components/son'
export default {
  name: '',
  components: { sonPage },
  props: {},
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
// scoped
  // (1)它给组件dom结果添加data-v-xxx的自定义属性
  // (2)它给组件样式'最后面'添加自定义属性
//.son-title[data-v-c88a5e66]
//不起作用,父组件不能作用于子组件里面的dom元素
/*
.son-title{
  color: red;   不能，影响子组件元素
}
*/
//起作用,父组件作用于子组'根'dom元素
/*
.son-box{
  //通过样式继承       能，影响子组件跟元素
  color: red;
}
*/
//不起作用
// .son-box .son-title[data-v-c88a5e66]
/*
.son-box .son-title{
  //通过样式继承    不能，不能影响子组件里面元素
  color: red;
}
*/
// 起作用,把自定义属性放到最前面
//[data-v-c88a5e66] .son-title      能，通过样式继承
::v-deep .son-title{
  color: red;
}
</style>
