import request from '@/utils/request'
import API from '@/api/index.js'

// login method
export function dwLogin (params) {
  // const params = {userName, password, type: 'account'}
  return request({
    url: API.loginIn,
    method: 'post',
    params
  })
}

export function wxLoginTicket (params) {
  return request({
    url: API.loginWxQrCode,
    method: 'post',
    params
  })
}

export function wxLoginTicketStatus (params) {
  return request({
    url: API.loginWxStatus,
    method: 'post',
    params
  })
}

export function sendFakeCaptcha (params) {
  return request({
    url: API.loginSendSms,
    method: 'post',
    params
  })
}

// quit method
export function logout () {
  return request({
    url: API.logOut,
    method: 'post'
  })
}

// login method
export function dwRegister (params) {
  // const params = {userName, password, type: 'account'}
  return request({
    url: API.register,
    method: 'post',
    params
  })
}

export function answerLoginSurveyInfo (sid) {
  const params = {sid}
  return request({
    url: '/api/dwsurvey/anon/response/survey_info.do',
    method: 'post',
    params
  })
}

export function verifiedCaptchaCode (params) {
  return request({
    url: '/api/dwsurvey/anon/jcap/jcaptcha-check.do',
    method: 'post',
    params
  })
}

export function loginProps () {
  return request({
    url: '/api/dwsurvey/anon/security/login-props.do',
    method: 'get'
  })
}

