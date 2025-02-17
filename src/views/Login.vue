<template>
  <div id="loginPage" >
    <el-row :gutter="0">
      <el-col :span="10" :offset="7">
        <div class="loginFormContent" >
          <div style="text-align: center;">
            <h3>Welcome Page</h3>
            <div>
              <el-tag type="success">Questionnaire</el-tag>
              <el-tag type="warning">Professional</el-tag>
              <el-tag>Open-Source</el-tag>
              <el-tag type="success">Practical</el-tag>
              <el-tag type="warning">Questionnaire System</el-tag>
            </div>
          </div>
          <div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
              <el-form-item label="username" prop="email">
                <el-input v-model="ruleForm.email" autocomplete="on" ></el-input>
              </el-form-item>
              <el-form-item label="password" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" style="width: 100%;" @click="submitForm('ruleForm')" >login in</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import DwAuthorized from '../utils/dw-authorized'
import {msgError} from '../utils/dw-msg'
import {dwLogin} from '@/api/dw-login'

export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          {required: true, message: 'Email', trigger: 'blur'}
          // {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pass: [
          {required: true, message: 'Password', trigger: 'blur'},
          {min: 6, max: 18, message: 'The password length should fit in between 6 to 18 characters.', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.pageH = window.height
  },
  methods: {
    submitForm (formName) {
      // 进行登录验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwLogin(this.ruleForm.email, this.ruleForm.pass).then((response) => {
            const resultData = response.data
            console.log('login-begin')
            console.log(resultData)
            if (resultData.status === 'ok') {
              DwAuthorized.setAuthority(resultData.currentAuthority)
              DwAuthorized.setUserName(this.ruleForm.email)
              this.$router.push('/dw/survey/')
            } else {
              if (resultData.hasOwnProperty('httpResult') && resultData.httpResult!=null && resultData.httpResult.hasOwnProperty('resultMsg')) {
                msgError(resultData.httpResult.resultMsg)
              } else {
                msgError('Login failed! Please check your username and password!')
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
#loginPage{
  /*background-image: url("http://localhost:8181/diaowen/images/style-model/login_bg/1.jpg");*/
}
.loginFormContent{
  padding: 20px;
  margin-top: 50px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 3px;
}
</style>
