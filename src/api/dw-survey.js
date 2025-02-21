import request from '@/utils/request'
import API from '@/api/index.js'

/**
 * Survey List
 * @param pageSize
 * @param current
 * @returns {*}
 */
export function dwSurveyList (pageSize, current, surveyName, surveyState) {
  const params = {
    pageSize,
    current,
    surveyName,
    surveyState
  }
  return request({
    url: API.surveyList,
    method: 'get',
    params
  })
}
/**
 * create a survey
 * @param data
 * @returns {*}
 */
export function dwSurveyCreate (data) {
  return request({
    url: API.surveyCreate,
    method: 'post',
    data
  })
}

/**
 * update the survey status
 * @param surveyId
 * @param surveyState
 * @returns {*}
 */
export function dwSurveyUpState (surveyId, surveyState) {
  const params = {
    surveyId,
    surveyState
  }
  return request({
    url: API.surveyUpState,
    method: 'post',
    params
  })
}
/**
 * copy survey
 * @param data
 * @returns {*}
 */
export function dwSurveyCopy (fromSurveyId, surveyName) {
  const params = {
    fromSurveyId,
    surveyName,
    tag: '2'
  }
  return request({
    url: API.surveyCopy,
    method: 'post',
    params
  })
}
/**
 * obtain the survey information
 * @param surveyId
 * @returns {*}
 */
export function dwSurveyInfo (surveyId) {
  const params = {
    id: surveyId
  }
  return request({
    url: API.surveyInfo,
    method: 'get',
    params
  })
}
/**
 * update survey information
 * @param data
 * @returns {*}
 */
export function dwSurveyUpdate (data) {
  return request({
    url: API.surveyUpdate,
    method: 'put',
    data
  })
}
/**
 * update survey information
 * @param data
 * @returns {*}
 */
export function dwSurveyDelete (data) {
  return request({
    url: API.surveyDelete,
    method: 'delete',
    data
  })
}
/**
 * obtain survey statistics
 * @param surveyId
 * @returns {*}
 */
export function dwSurveyReport (surveyId) {
  const params = {
    surveyId
  }
  return request({
    url: API.surveyReport,
    method: 'get',
    params
  })
}
/**
 * obtain survey list
 * @param pageSize
 * @param current
 * @param surveyId
 * @returns {*}
 */
export function dwSurveyAnswerList (pageSize, current, surveyId) {
  const params = {
    pageSize,
    current,
    surveyId
  }
  return request({
    url: API.surveyAnswerList,
    method: 'get',
    params
  })
}
/**
 * update survey information
 * @param data
 * @returns {*}
 */
export function dwSurveyAnswerDelete (data) {
  return request({
    url: API.surveyAnswerDelete,
    method: 'delete',
    data
  })
}
/**
 * obtain the survey detailed information
 * @param answerId
 * @returns {*}
 */
export function dwSurveyAnswerInfo (answerId) {
  const params = {
    answerId
  }
  return request({
    url: API.surveyAnswerInfo,
    method: 'get',
    params
  })
}

/**
 * update survey information
 * @param data
 * @returns {*}
 */
export function dwSurveyAnswerDeleteByEs (data) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/delete-answer.do',
    method: 'delete',
    data
  })
}
