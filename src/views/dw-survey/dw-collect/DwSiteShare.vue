<template>
  <div>
    <dw-survey-dcs-wrapper is-site-share="true">
      <div slot="dw-dcs-main-slot">
        <div>
          <div class="dw-dcs-main-title">
            <h4>Share on the social platform</h4>
            <div class="dw-dcs-main-p">Invite users to use this product</div>
          </div>
          <div class="dw-dcs-main-content"></div>
        </div>
      </div>
    </dw-survey-dcs-wrapper>
  </div>
</template>

<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import Clipboard from 'clipboard'

export default {
  name: 'DwSiteShare',
  components: {
    DwSurveyDcsWrapper,
    Clipboard
  },
  data () {
    return {
      code: 'http://ent.surveyform.cn/#/diaowen/wdhl2uv6e9x',
      src: 'https://ent.surveyform.cn/api/dwsurvey/anon/response/answerTD.do?surveyId=465d3020-0880-4c37-ab09-cc40869758de'
    }
  },
  methods: {
    copyActiveCode (e, text) {
      const clipboard = new Clipboard(e.target, {text: () => text})
      clipboard.on('success', e => {
        this.$message({type: 'success', message: 'Successfully copied'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({type: 'waning', message: 'Browser does not support this operation'})
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
</style>
