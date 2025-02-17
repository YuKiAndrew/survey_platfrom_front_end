<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>

import Header from '@/components/layouts/DwHeader.vue'
import HeaderLogin from '@/components/layouts/DwHeaderLogin.vue'
import NavMenu from '@/components/layouts/DwNavMenu.vue'
import Footer from '@/components/layouts/DwFooter.vue'

export default {
  name: 'App',
  components: {
    'dw-nav-menu': NavMenu,
    'dw-header': Header,
    'dw-header-login': HeaderLogin,
    'dw-footer': Footer
  },
  data () {
    return {
      currentHeader: 'dw-header'
    }
  },
  mounted () {
    this.loginStatus()
  },
  methods: {
    loginStatus: function () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('login') >= 0) {
        this.currentHeader = 'dw-header-login'
      } else {
        this.currentHeader = 'dw-header'
      }
    }
  }
}
</script>
<style>
body{
  background-color: #F1F1F1;
  /*#ffb25c*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header{
  background-color: #25292E;
}
.el-footer {
  /*background-color: #B3C0D1;*/
  line-height: 60px;
  color: #7c7c7c;
}
.el-aside {
}
</style>
