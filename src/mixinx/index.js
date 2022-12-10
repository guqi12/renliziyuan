import Vue from 'vue'
Vue.mixin({
  methods: {
    hasPerm(key) {
      try {
        return this.$store.state.user.userInfo.roles.points.includes(key)
      } catch (error) {
        return false
      }
    }
  }
})
