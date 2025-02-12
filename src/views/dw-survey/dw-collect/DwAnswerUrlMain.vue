<template>
  <div>
    <div>
      <div class="dw-dcs-main-title">
        <h4>Answer Url</h4>
        <div class="dw-dcs-main-p">Duplicate the short url to customers</div>
      </div>
      <div class="dw-dcs-main-content">
        <div class="dw-dcs-main-title">
          <div class="dw-dcs-main-p">Short Url</div>
        </div>
        <el-input id="copyCodeInput" v-model="survey.answerUrl" readonly style="width: 500px;" ></el-input>
        <el-button-group>
          <el-button type="primary" icon="el-icon-copy-document" @click="copyActiveCode($event,survey.answerUrl )" >Duplicate Address</el-button>
          <el-link :href="survey.answerUrl" :underline="false" target="_blank" ><el-button icon="el-icon-link" style="border-bottom-left-radius: 0px;border-top-left-radius: 0px;" >Open Questionnaire</el-button></el-link>
        </el-button-group>
      </div>
      <div class="dw-dcs-main-content">
        <div class="dw-dcs-main-title">
          <div class="dw-dcs-main-p">
            This address supports use in all browsers, such as IE, etc
          </div>
        </div>
        <el-input id="copyCodeInput" v-model="survey.answerUrl1" readonly style="width: 500px;" ></el-input>
        <el-button-group>
          <el-button type="primary" icon="el-icon-copy-document" @click="copyActiveCode($event,survey.answerUrl1 )" >Duplicate Address</el-button>
          <el-link :href="survey.answerUrl1" :underline="false" target="_blank" ><el-button icon="el-icon-link" style="border-bottom-left-radius: 0px;border-top-left-radius: 0px;" >Open questionnaire</el-button></el-link>
        </el-button-group>
      </div>
    </div>
    <div>
      <div class="dw-dcs-main-title">
        <h4>QR Code</h4>
        <div class="dw-dcs-main-p">Scan the QR code to complete questionnaire</div>
      </div>
      <div class="dw-dcs-main-content">
        <el-row type="flex" justify="start" align="middle">
          <el-col :span="4">
            <el-image :src="survey.answerUrlQR" class="dw-dcs-main-img">
              <div slot="placeholder" class="image-slot">
                loading<span class="dot">...</span>
              </div>
            </el-image>
          </el-col>
          <el-col :span="20">
            <el-button type="primary" icon="el-icon-download" style="margin-left: 10px;" @click="downloadAnswerImg(`${survey.answerUrlQR}&down=1`)" >Scan QR Code</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import Clipboard from 'clipboard'

export default {
  name: 'DwAnswerUrlMain',
  components: {
    Clipboard
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    downloadAnswerImg (imgSrc) {
      console.debug(imgSrc)
      window.location.href = imgSrc
    },
    copyActiveCode (e, text) {
      // console.debug(this.$children[0].survey)
      console.debug(this.survey)
      const clipboard = new Clipboard(e.target, {text: () => text})
      clipboard.on('success', e => {
        this.$message({type: 'success', message: 'Successful Duplicate'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({type: 'warning', message: 'The browser does not support the clipboard'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
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
.dw-dcs-main-img{
  border: 1px solid rgb(241, 242, 245);
}
.dw-dcs-main-title{
  padding-bottom: 10px;
}
</style>
