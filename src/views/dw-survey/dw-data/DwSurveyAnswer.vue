<template>
  <div>
    <dw-survey-dcs-wrapper :id="id" is-answer-data="true" >
      <template v-slot:dw-dcs-main-slot="{survey}" >
        <div class="dw-dcs-main-title">
          <el-row type="flex">
            <el-col :span="18"><div style="font-size: 14px;padding: 10px;"><strong>Raw Data</strong></div></el-col>
            <el-col :span="6" style="text-align: right;padding-right: 16px;" ><el-button type="primary" size="small" @click="handleExport" >Export</el-button></el-col>
          </el-row>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="IP address" >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-html="scope.row.ipAddr" ></p>
                <div slot="reference" class="name-wrapper">
                  <div v-html="scope.row.ipAddr"></div>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="Answer amount" >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.completeItemNum!=null ? scope.row.completeItemNum:0 }}&nbsp;</span>
            </template>
          </el-table-column>
          <el-table-column label="Response Time" >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.endAnDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operation" width="160" >
            <template slot-scope="scope">
              <el-button-group>
                <el-tooltip effect="dark" content="Review Data" placement="top">
                  <el-button size="mini" icon="el-icon-view" @click="handleGo(`/no-top/dw-survey/d/data/${scope.row.surveyId}/${scope.row.id}`)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="Delete Data" placement="top">
                  <el-button size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <div class="dw-pagination">
          <el-pagination
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </dw-survey-dcs-wrapper>

    <el-dialog :visible.sync="dialogFormVisible" append-to-body title="Export table" width="40%" >
      <div style="line-height: 30px;">Choose to download upload document as well?</div>
      <div style="color: grey;line-height: 30px;font-size: 12px;"><span>If there is upload document, please check the size of download zip file</span></div>
      <el-switch
        v-model="expUpQu"
        active-text="Suppress file upload"
        inactive-text="Only download excel files"
        active-value="1"
        inactive-value="0">
      </el-switch>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="executeExportData">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper'
import {dwSurveyAnswerList, dwSurveyAnswerDelete} from '@/api/dw-survey'
import API from '@/api/index'

export default {
  name: 'DwSurveyAnswer',
  components: {
    DwSurveyDcsWrapper
  },
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      expUpQu: 0
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    handleGo (to) {
      this.$router.push(to)
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$msgbox.confirm('Confirm to delete this survey?', 'Warning', {type: 'warning', confirmButtonText: 'Confirm'}).then(() => {
        const data = {id: [row.id]}
        dwSurveyAnswerDelete(data).then((response) => {
          console.log(response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.$message.success('Successfully deleted')
            this.queryList(1)
          } else {
            this.$message.error('Fail to delete')
          }
        })
      }).catch(() => {})
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    handleExport () {
      this.dialogFormVisible = true
    },
    executeExportData () {
      const downUrl = `${process.env.DW_API_URL}${API.surveyAnswerExport}?surveyId=${this.$route.params.id}&expUpQu=${this.expUpQu}`
      this.dialogFormVisible = false
      window.location.href = downUrl
    },
    queryList (pageNo) {
      dwSurveyAnswerList(this.pageSize, pageNo, this.$route.params.id).then((response) => {
        const resultData = response.data.data
        this.tableData = resultData
        this.total = response.data.total
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      })
    }
  }
}

</script>
<style scoped>
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
