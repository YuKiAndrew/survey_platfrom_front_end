<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-dcs-main">
          <div class="dw-dcs-main-survey-title">
            <el-row type="flex" justify="space-between" align="middle">
              <el-col>
                <div class="dw-dcs-main-survey-title-content">
                  <div v-if="survey.surveyNameText != null" v-text="survey.surveyNameText"></div>
                  <div v-else v-html="survey.surveyName"></div>
                </div>
              </el-col>
              <el-col :span="4">
                <el-select :value="survey.surveyState" v-model="survey.surveyState" placeholder="Please choose one of options" @change="surveyStateChange" >
                  <el-option key="0" :value="0" label="Design" ></el-option>
                  <el-option key="1" :value="1" label="Publish" ></el-option>
                  <el-option key="2" :value="2" label="End of Collection" ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="dw-dcs-main-survey-step">
            <div class="dw-dcs-main-survey-step-item" style="padding: 13px 16px;">
              <el-row type="flex" justify="space-between" align="middle" >
                <el-col :span="3">
                  <router-link class="dw-link dw-link-1" to="/"><i class="el-icon-edit"></i>Survey Design</router-link>
                </el-col>
                <el-col :span="3" >
                  <router-link :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerUrl || isSurveySet || isSiteShare || isSiteComp || isAnswerWx}" class="dw-link dw-link-1" ><i class="el-icon-link"></i>Survey Save</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/chart/${survey.id}`" :class="{ 'dw-link-primary' : isSurveyChart || isAnswerData }" class="dw-link dw-link-1" ><i class="el-icon-s-data"></i>Survey statistics</router-link>
                </el-col>
                <el-col :span="15" style="text-align: right;">
                  <el-button type="primary" size="small" @click="buttonClickA(`/static/diaowen/design.html?surveyId=${survey.id}`)" >Survey design</el-button>
                  <el-button size="small" @click="handlePush(`${prevPath}/survey/c/url/${survey.id}`)" >Answer address</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="dw-dcs-main-survey-step-item" style="padding-left: 16px;">
              <el-row v-show="isAnswerUrl || isSurveySet || isSiteShare || isSiteComp || isAnswerWx">
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerUrl}" class="dw-link" ><i class="el-icon-link"></i>Answer Url</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/attr/${survey.id}`" :class="{ 'dw-link-primary' : isSurveySet}" class="dw-link" ><i class="el-icon-setting"></i>Answer Design</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/comp/${survey.id}`" :class="{ 'dw-link-primary' : isSiteComp}" class="dw-link" ><i class="el-icon-discount"></i>Website components</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/weixin/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerWx}" class="dw-link" ><i class="el-icon-chat-dot-round"></i>Collection</router-link>
                </el-col>
              </el-row>
              <el-row v-show="isSurveyChart || isAnswerData">
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/chart/${survey.id}`" :class="{ 'dw-link-primary' : isSurveyChart}" class="dw-link" ><i class="el-icon-discount"></i>Statistics</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/data/${survey.id}`" :class="{ 'dw-link-primary' : isAnswerData}" class="dw-link" ><i class="el-icon-receiving"></i>Raw Data</router-link>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="3"></el-col>
              </el-row>
            </div>
            <div class="dw-dcs-main-survey-step-item dw-dcs-main-survey-step-item-status" >
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="4">
                  <div>Process：
                    <el-tag v-if="survey.surveyState === 0" size="mini" >Design Phase</el-tag>
                    <el-tag v-else-if="survey.surveyState === 1" type="success" size="mini" >Collect Phase</el-tag>
                    <el-tag v-else-if="survey.surveyState === 2" type="info" size="mini" >Complete</el-tag>
                    <el-tag v-else disable-transitions style="margin-left: 10px" size="mini" >Other Phase</el-tag>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>collect ammount：{{ survey.answerNum != null ? survey.answerNum : 0 }}</div>
                </el-col>
                <el-col :span="16" style="text-align: right;">
                  Create Date：{{ survey.createDate }}
                </el-col>
              </el-row>
            </div>
            <div class="dw-dcs-main-survey-step-main">
              <slot :survey="survey" name="dw-dcs-main-slot" ></slot>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {dwSurveyInfo} from '@/api/dw-survey'
import {dwSurveyUpState} from '../../api/dw-survey'
export default {
  name: 'DwSurveyDcsWrapper',
  props: {
    id: {type: String, default: ''},
    isAnswerUrl: {type: Boolean, default: false},
    isSurveySet: {type: Boolean, default: false},
    isSiteShare: {type: Boolean, default: false},
    isSiteComp: {type: Boolean, default: false},
    isAnswerWx: {type: Boolean, default: false},
    isSurveyChart: {type: Boolean, default: false},
    isAnswerData: {type: Boolean, default: false},
    isSurveyLog: {type: Boolean, default: false},
    isAnswerLog: {type: Boolean, default: false}
  },
  data () {
    return {
      survey: {
        sid: '',
        answerUrl: '',
        answerUrl1: '',
        answerUrlQR: '',
        siteCompCodeRoot: '',
        surveyState: ''
      },
      prevPath: '/dw'
    }
  },
  mounted () {
    console.debug(process.env)
    this.getSurveyInfo()
  },
  methods: {
    buttonClickA (href) {
      window.location.href = href
    },
    handlePush (to) {
      this.$router.push(to)
    },
    surveyStateChange () {
      console.debug(this.survey.surveyState)
      dwSurveyUpState(this.$route.params.id, this.survey.surveyState).then((response) => {
        const httpResult = response.data
        if (httpResult.resultCode === 200) {
          this.$message.success('Survey Status has been successfully set!')
        } else {
          this.$message.error('Fail to set survey state!')
        }
      })
    },
    getSurveyInfo () {
      dwSurveyInfo(this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.survey = resultData
        this.survey.answerUrl = location.origin + '/#/diaowen/' + this.survey.sid
        this.survey.answerUrl1 = location.origin + '/static/diaowen/answer-p.html?sid=' + this.survey.sid
        this.survey.answerUrlQR = process.env.DW_API_URL+'/api/dwsurvey/anon/response/answerTD.do?surveyId=' + this.survey.id
        this.survey.siteCompCodeRoot = '<div id="dwsurveyWebAnswerCompCode"><div id="dwsurveyWebSiteFixed" style="position: fixed; right: 0px; left: auto; top: 520px; z-index: 99999;"><a target=\'_blank\' id="dwsurveyWebSiteFixedA" href="' + this.survey.answerUrl + '" style="background-color: rgb(24, 144, 255); width: 15px; display: block; padding: 10px 6px 10px 10px; color: white; cursor: pointer; float: right; vertical-align: middle; text-decoration: none; font-size: 12px; box-sizing: content-box; line-height: 20px;">Survey Investigation</a></div></div>'
        this.survey.surveyDetail.effective = resultData.surveyDetail.effective === 1
        this.survey.surveyDetail.effectiveIp = resultData.surveyDetail.effectiveIp === 1
        this.survey.surveyDetail.refresh = resultData.surveyDetail.refresh === 1
        this.survey.surveyDetail.rule = resultData.surveyDetail.rule === 1
        this.survey.surveyDetail.ynEndNum = resultData.surveyDetail.ynEndNum === 1
        this.survey.surveyDetail.ynEndTime = resultData.surveyDetail.ynEndTime === 1
      })
    }
  }
}

</script>
<style scoped>
.dw-dcs-main{
  background-color: white;
  padding: 20px;
}
.dw-dcs-main-survey-title{
  border-bottom: 1px solid rgb(241, 242, 245);
  padding-bottom: 20px;
  padding-left: 10px;
}
.dw-dcs-main-survey-title-content{
  font-size: 26px;
  font-weight: 300;
}
.dw-dcs-main-survey-step{
  padding: 0px;
}
.dw-dcs-main-survey-step-item{
  padding: 20px 10px;
  border-bottom: 1px solid rgb(241, 242, 245);
}
.dw-link{
  text-decoration: none;
  color: #606266;
  font-size: 14px;
}
.dw-link-1{
  font-size: 14px;
}
.dw-link-primary,.dw-link:hover{
  color: #409eff;
  font-weight: bold;
}
.dw-link i{
  margin-right: 6px;
}
.dw-dcs-main-survey-step-main{
  padding: 20px 10px;
}
.dw-dcs-main-survey-step-item-status{
  background-color: rgb(241, 242, 245);
  font-size: 14px;
  padding: 10px;
}
</style>
