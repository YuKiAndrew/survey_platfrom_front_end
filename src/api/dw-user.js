import request from '@/utils/request'
import API from '@/api/index.js'

export function dwUserInfo () {
  return request({
    url: API.curUserInfo,
    method: 'get'
  })
}

export function dwUserPwd (curpwd, pwd) {
  const params = {
    curpwd,
    pwd
  }
  return request({
    url: API.curUserPwdUpdate,
    method: 'post',
    params
  })
}

