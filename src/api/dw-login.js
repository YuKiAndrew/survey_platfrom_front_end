import request from '@/utils/request'
import API from '@/api/index.js'

// login in
export function dwLogin (userName, password) {
  const params = {
    userName,
    password,
    type: 'account'
  }
  return request({
    url: API.loginIn,
    method: 'post',
    params
  })
}

// exit
export function logout () {
  return request({
    url: API.logOut,
    method: 'post'
  })
}

