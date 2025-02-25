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
  // set the name of component as APP, this is useful for debugging and identifying the components.
  name: 'App',
  // register the important components.
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
  // the lifecycle hook runs after the component is inserted into the DOM
  breforeCreated () {
    this.text = 'initial text'; // This line has no effect
    console.log("beforeCreate: The component is not created yet.");
  },
  mounted () {
    console.log("test,test,test")
    this.loginStatus()
  },
  methods: {
    // A method to check the current route and update the header accordingly.
    loginStatus: function () {
      // the route variable refers to the current route object provided by Vue Router, it contains the information about the current URL, including the path, parameters, query strings and more.

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
