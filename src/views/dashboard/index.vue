<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <QrcodeVue :value="value" :size="size" level="H"> </QrcodeVue>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: 'https ://example. com',
      size: 100
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
