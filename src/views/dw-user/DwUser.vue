<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="1">
        <div class="dw-user-body">
          <el-row>
            <el-col :span="4" style="height: 600px;">
              <dw-user-menu></dw-user-menu>
            </el-col>
            <el-col :span="20">
              <div style="padding: 30px;">
                <el-descriptions title="Account information" column="1" border >
                  <el-descriptions-item label="Account">{{ userInfo.loginName }}</el-descriptions-item>
                  <el-descriptions-item label="Status">
                    <el-tag
                      v-if="userInfo.status === 0"
                      type="danger" >Disable</el-tag>
                    <el-tag
                      v-else-if="userInfo.status === 1"
                      type="info" >Inactive</el-tag>
                    <el-tag
                      v-else-if="userInfo.status === 2"
                      type="success" >Active</el-tag>
                    <el-tag v-else disable-transitions style="margin-left: 10px" >Wait until next step</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Create Time">{{ userInfo.createTime }}</el-descriptions-item>
                  <el-descriptions-item label="Login Time">{{ userInfo.lastLoginTime }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DwUserMenu from './DwUserMenu'
import {dwUserInfo} from '../../api/dw-user'

export default {
  name: 'DwUser',
  components: {
    DwUserMenu
  },
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      dwUserInfo().then((response) => {
        const resultData = response.data.data
        this.userInfo = resultData
      })
    }
  }
}
</script>

<style scoped>
.dw-user-body{
  background-color: white;
  min-height: 600px;
}
</style>
