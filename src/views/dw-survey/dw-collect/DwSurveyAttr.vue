<template>
  <div>
    <dw-survey-dcs-wrapper is-survey-set="true" >
      <template v-slot:dw-dcs-main-slot >
        <div>
          <div class="dw-dcs-main-title">
            <h4>Survey Properties</h4>
            <div class="dw-dcs-main-p">Design the collection rules</div>
          </div>
          <div class="dw-dcs-main-content">

            <div style="padding: 0px 30px;">
              <el-form ref="form" :label-position="labelPosition" :model="form" >
                <el-row>
                  <el-col :span="12">
                    <h5>Response restriction</h5>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.effective" >Any personal computer or portable device can only answer once</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.effectiveIp" >Every IP can answer once</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.refresh">Use captcha</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.rule">Enable access password</el-checkbox>
                        <el-input v-model="survey.surveyDetail.ruleCode" placeholder="Please enter content" style="width: 160px;"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <h5>Time</h5>
                    <div style="padding-left: 10px;">
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.ynEndNum">Collect
                          <el-input-number :min="1" :max="100000" v-model="survey.surveyDetail.endNum" label="份数" controls-position="right"></el-input-number>
                          then end the collection</el-checkbox>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox v-model="survey.surveyDetail.ynEndTime">Time
                          <el-date-picker
                            v-model="survey.surveyDetail.endTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="Please choose date" >
                          </el-date-picker>
                          ended
                        </el-checkbox>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit"> Save Modification </el-button>
                  <el-button>Cancel</el-button>
                </el-form-item>
              </el-form>
            </div>

          </div>
        </div>
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>

<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import {dwSurveyInfo, dwSurveyUpdate} from '@/api/dw-survey'

export default {
  name: 'DwSurveyAttr',
  components: {
    DwSurveyDcsWrapper
  },
  data () {
    return {
      labelPosition: 'right',
      value1: '',
      survey: {
        surveyDetail: {
          effective: false,
          effectiveIp: false
        }
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted () {
    this.getSurveyInfo()
  },
  methods: {
    getSurveyInfo () {
      dwSurveyInfo(this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.survey = resultData
        this.survey.surveyDetail.effective = resultData.surveyDetail.effective === 1
        this.survey.surveyDetail.effectiveIp = resultData.surveyDetail.effectiveIp === 1
        this.survey.surveyDetail.refresh = resultData.surveyDetail.refresh === 1
        this.survey.surveyDetail.rule = resultData.surveyDetail.rule === 3
        this.survey.surveyDetail.ynEndNum = resultData.surveyDetail.ynEndNum === 1
        this.survey.surveyDetail.endNum = resultData.surveyDetail.endNum
        this.survey.surveyDetail.ynEndTime = resultData.surveyDetail.ynEndTime === 1
        this.survey.surveyDetail.ruleCode = resultData.surveyDetail.ruleCode
      })
    },
    onSubmit () {
      console.log('submit!')
      const surveyDetail = this.survey.surveyDetail
      const data = {
        dirId: surveyDetail.dirId,
        effective: surveyDetail.effective ? 1 : 0,
        effectiveIp: surveyDetail.effectiveIp ? 1 : 0,
        refresh: surveyDetail.refresh ? 1 : 0,
        rule: surveyDetail.rule ? 3 : 0,
        ynEndNum: surveyDetail.ynEndNum ? 1 : 0,
        ynEndTime: surveyDetail.ynEndTime ? 1 : 0,
        endNum: surveyDetail.endNum,
        endTime: surveyDetail.endTime,
        ruleCode: surveyDetail.ruleCode
      }
      console.log(data)
      dwSurveyUpdate(data).then((response) => {
        console.log(response)
        const data = response.data
        if (data.resultCode === 200) {
          this.$message({type: 'success', message: 'Saved Successfully'})
        } else {
          this.$message({type: 'error', message: data.resultMsg})
        }
      })
    }
  }
}

</script>

<style scoped>
.dw-dcs-main-p{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.dw-dcs-main-content{
  padding: 20px 0px;
}
</style>
