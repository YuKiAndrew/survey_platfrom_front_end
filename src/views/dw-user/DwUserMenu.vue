<template>
  <el-menu
    :default-active="defActive"
    class="el-menu-vertical-demo"
    style="height: 600px;"
    router
  >
    <el-menu-item index="/dw/user" >
      <i class="el-icon-user"></i>
      <span slot="title">My Account</span>
    </el-menu-item>
    <el-menu-item index="/dw/user/pwd">
      <i class="el-icon-key"></i>
      <span slot="title">Modify Password</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'DwUserMenu',
  data () {
    return {
      defActive: '/dw/user'
    }
  },
  mounted () {
    this.setDefActive()
  },
  methods: {
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/dw/user/pwd') >= 0) {
        this.defActive = '/dw/user/pwd'
      }
    }
  }
}
</script>

<style scoped>

</style>
