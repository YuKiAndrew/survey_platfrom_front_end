<template>
  <div>
    <dw-survey-dcs-wrapper is-site-comp="true">
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div>
          <div class="dw-dcs-main-title">
            <h4>Quickly collect questionnaires through website widgets.</h4>
            <div class="dw-dcs-main-p">Copy the widget code generated on the right and paste it into the website's footer page to enable the questionnaire widget across the entire site.</div>
          </div>
          <div class="dw-dcs-main-content"></div>
        </div>
        <div>
          <el-row>
            <el-col :span="8">
              <div class="site-comp-left">
                <div class="site-comp-left-title">Style settings</div>
                <div>
                  <el-row>
                    <el-col :span="16">
                      <div class="dw-c-from-item">Widget position:
                        <el-radio-group v-model="radio" size="small" @change="handleLRButton($event)">
                          <el-radio-button label="left"></el-radio-button>
                          <el-radio-button label="right" ></el-radio-button>
                        </el-radio-group>
                      </div>
                      <div class="dw-c-from-item dw-c-from-item-color">
                        <span>background color:</span>
                        <el-color-picker v-model="color1" @active-change="handleBgColor($event)"></el-color-picker>
                      </div>
                      <div class="dw-c-from-item dw-c-from-item-color">
                        <span>font color:</span>
                        <el-color-picker v-model="color2" @active-change="handleTextColor($event)"></el-color-picker>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="dw-c-from-item">
                        <div>Widget height:</div>
                        <div style="margin-top: 15px;">
                          <el-slider
                            v-model="value"
                            vertical
                            height="200px"
                            @input="handleSlider">
                          </el-slider>
                        </div>
                        <div style="padding-top: 15px;">
                          <el-input-number v-model="value" :min="1" :max="100" controls-position="right" size="small"></el-input-number>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="2" style="text-align: center;color: rgb(211, 211, 211);">
              <i class="el-icon-right"></i>
            </el-col>
            <el-col :span="14">
              <div class="site-comp-right">
                <div>
                  <el-input v-model="siteCompCode" :autosize="{ minRows: 2, maxRows: 8}" type="textarea" placeholder="请输入内容" disabled></el-input>
                </div>
                <div style="padding-top: 10px;">
                  <el-button type="primary" icon="el-icon-copy-document" style="width: 100%;" @click="copyActiveCode($event,siteCompCode)">复制挂件代码</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <div v-html="survey.siteCompCodeRoot" > </div>
        </div>
      </template>
    </dw-survey-dcs-wrapper>
  </div>
</template>

<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import Clipboard from 'clipboard'

export default {
  name: 'DwSiteComp',
  components: {
    DwSurveyDcsWrapper,
    Clipboard
  },
  data () {
    return {
      color1: '#409EFF',
      color2: '#FFFFFF',
      value: 60,
      radio: 'right',
      siteCompCode: '<div id="dwsurveyWebSiteFixed" style="position: fixed; right: 0px; left: auto; top: 520px; z-index: 99999;"><a target=\'_blank\' id="dwsurveyWebSiteFixedA" href="" style="background-color: rgb(24, 144, 255); width: 15px; display: block; padding: 10px 6px 10px 10px; color: white; cursor: pointer; float: right; vertical-align: middle; text-decoration: none; font-size: 12px; box-sizing: content-box; line-height: 20px;">Survey</a></div>'
    }
  },
  methods: {
    copyActiveCode (e, text) {
      const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode')
      this.siteCompCode = webSiteElementCode.innerHTML
      const clipboard = new Clipboard(e.target, {text: () => this.siteCompCode})
      clipboard.on('success', e => {
        this.$message({type: 'success', message: 'Copy successfully'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({type: 'waning', message: 'This browser does not support automatic copying.'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    },
    handleSlider (val) {
      let posHeight = window.innerHeight - val * 10
      if (posHeight < 0) {
        posHeight = 0
      }
      const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode')
      const webSiteElement = document.getElementById('dwsurveyWebSiteFixed')
      webSiteElement.style.top = posHeight + 'px'
      console.debug(webSiteElementCode.innerHTML)
      this.siteCompCode = webSiteElementCode.innerHTML
    },
    handleLRButton (val) {
      console.debug(val)
      const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode')
      const webSiteElement = document.getElementById('dwsurveyWebSiteFixed')
      if (val === '左边') {
        webSiteElement.style.left = '0px'
        webSiteElement.style.right = 'auto'
      } else {
        webSiteElement.style.left = 'auto'
        webSiteElement.style.right = '0px'
      }
      console.debug(webSiteElementCode.innerHTML)
      this.siteCompCode = webSiteElementCode.innerHTML
    },
    handleBgColor (color) {
      const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode')
      const webSiteElement = document.getElementById('dwsurveyWebSiteFixedA')
      webSiteElement.style.backgroundColor = color
      console.debug(webSiteElementCode.innerHTML)
      this.siteCompCode = webSiteElementCode.innerHTML
    },
    handleTextColor (color) {
      const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode')
      const webSiteElement = document.getElementById('dwsurveyWebSiteFixedA')
      webSiteElement.style.color = color
      console.debug(webSiteElementCode.innerHTML)
      this.siteCompCode = webSiteElementCode.innerHTML
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
.site-comp-left{
  border: 1px solid rgb(217, 217, 217);
  padding: 10px;
}
.site-comp-left-title{
  padding: 10px 0px;
  font-size: 16px;
  font-weight: bold;
}
.dw-c-from-item{
  margin: 15px 0px;
  font-size: 14px;
  color: rgba(0,0,0,.85);
}
.dw-c-from-item-color{
  vertical-align: middle;
  display: flex;
  align-items: center;
}
.el-input-number--small{
 width: 100%;
}
</style>
