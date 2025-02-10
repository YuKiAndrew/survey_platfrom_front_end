<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-user-body">
          <el-row>
            <el-col :span="4" style="height: 600px;">
              <dw-user-menu></dw-user-menu>
            </el-col>
            <el-col :span="20">
              <div style="padding: 30px;width: 400px;">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="100px" label-position="top">
                  <el-form-item label="Original Password" prop="oldPass">
                    <el-input v-model="ruleForm.oldPass" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="pass">
                    <el-input v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="Confirm Password" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
                  </el-form-item>
                  <el-form-item style="padding-top: 20px;">
                    <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                  </el-form-item>
                </el-form>
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
import {dwUserPwd} from '../../api/dw-user'
export default {
  name: 'DwUserPwd',
  components: {
    DwUserMenu
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter a password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Do not match'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          {required: true, message: 'Please enter the new password.', trigger: 'blur'},
          {min: 6, max: 18, message: 'The length should be between 6 characters to 18 characters', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: 'Please enter the new password again.', trigger: 'blur'},
          {min: 6, max: 18, message: 'The length should be between 6 characters to 18 characters', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPass: [
          {required: true, message: 'Please enter the original password:', trigger: 'blur'},
          {min: 6, max: 18, message: 'The length should be between 6 characters to 18 characters', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dwUserPwd(this.ruleForm.oldPass, this.ruleForm.pass).then((response) => {
            const httpResult = response.data
            if (httpResult.resultCode === 200) {
              this.$message.success('Password has been updated')
            } else {
              this.$message.error('Password failed to be updated')
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
.dw-user-body{
  background-color: white;
  min-height: 600px;
}
</style>
