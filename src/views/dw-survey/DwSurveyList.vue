<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-table-form" style="padding-left: 60px;">
          <el-form :inline="true" :model="formInline" class="dw-form-inline" size="medium" >
            <el-form-item label="Survey Title">
              <el-input v-model="formInline.surveyName" placeholder="Please type in the survey title" clearable></el-input>
            </el-form-item>
            <el-form-item label="Survey statues" style="margin-left: 40px;">
              <el-select v-model="formInline.surveyState" placeholder="Please choose survey status" clearable>
                <el-option label="Design" value="0"></el-option>
                <el-option label="Collecting" value="1"></el-option>
                <el-option label="Collect Close" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 40px;">
              <el-button @click="onSubmit">Reset</el-button>
              <el-button type="primary" @click="onSubmit">Search</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dw-table">
          <div class="dw-table-title">
            <el-row :span="24" type="flex" justify="space-between" align="middle">
              <el-col :span="4"><h3>My Survey</h3></el-col>
              <el-col :span="20" style="text-align: right;">
                <el-button type="primary" size="medium" @click="form.id=null;form.name=null;dialogTitle = '创建问卷';dialogFormVisible = true" >New Survey</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="Survey" >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p v-html="scope.row.surveyName" ></p>
                  <div slot="reference" class="name-wrapper">
                    <div v-if="scope.row.surveyNameText != null" v-text="scope.row.surveyNameText"></div>
                    <div v-else v-html="scope.row.surveyName"></div>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Surveys Amount" width="80" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.answerNum!=null ? scope.row.answerNum:0 }}&nbsp;份</span>
              </template>
            </el-table-column>
            <el-table-column label="Status" width="80" >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.surveyState === 0" >Designing</el-tag>
                <el-tag v-else-if="scope.row.surveyState === 1" type="success" >Collection</el-tag>
                <el-tag v-else-if="scope.row.surveyState === 2" type="info" >End of Collection</el-tag>
                <el-tag v-else disable-transitions style="margin-left: 10px" >Other Phase</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Create Time" width="180" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Edit" width="280">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip effect="dark" content="Edit Survey" placement="top">
                    <el-button size="mini" content="Edit" icon="el-icon-edit" @click="buttonClickA(`/static/diaowen/design.html?surveyId=${scope.row.id}`)" ></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="Survey Address" placement="top">
                    <el-button size="mini" icon="el-icon-share" @click="handlePush(`/dw/survey/c/url/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="Survey Statistics" placement="top">
                    <el-button size="mini" icon="el-icon-s-data" @click="handlePush(`/dw/survey/d/chart/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="Preview Survey" placement="top">
                    <el-button size="mini" icon="el-icon-view" @click="buttonClickA(`/static/diaowen/preview.html?surveyId=${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="Copy Survey" placement="top">
                    <el-button size="mini" icon="el-icon-copy-document" @click="handleCopy(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="Delete Survey" placement="top">
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
        </div>
      </el-col>
    </el-row>

    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" append-to-body width="40%" >
        <el-form :model="form" label-position="top">
          <el-form-item :label-width="formLabelWidth" label="Survey Title" >
            <el-input v-model="form.name" autocomplete="off" placeholder="Please input survey title" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleDialogConfirm">Confirm</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import {dwSurveyCreate, dwSurveyList} from '@/api/dw-survey'
import {dwSurveyCopy, dwSurveyDelete} from '../../api/dw-survey'

export default {
  name: 'SurveyList',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogTitle: 'Create New Survey',
      formInline: {
        surveyName: null,
        surveyState: null
      },
      dialogFormVisible: false,
      form: {
        name: '',
        id: null
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    buttonClickA (href) {
      window.location.href = href
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleCopy (index, row) {
      console.log(index, row)
      this.form.id = row.id
      if (row.surveyNameText !== undefined && row.surveyNameText !== null) {
        this.form.name = `${row.surveyNameText}`
      } else {
        this.form.name = `Copy Survey Title`
      }
      this.dialogFormVisible = true
      this.dialogTitle = 'Copy Survey'
    },
    handleDelete (index, row) {
      this.$msgbox.confirm('Confirm to Delete This Survey?', 'Delete Warning', {type: 'warning', confirmButtonText: 'Delete Confirm'}).then(() => {
        const data = {id: [row.id]}
        dwSurveyDelete(data).then((response) => {
          console.log(response)
          const httpResult = response.data
          if (httpResult.resultCode === 200) {
            this.$message.success('Delete surccessfully')
            this.queryList(1)
          } else {
            this.$message.error('Fail to Delete')
          }
        })
      }).catch(() => {})
    },
    onSubmit () {
      console.log('submit!')
      this.queryList(1)
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    queryList (pageNo) {
      const {surveyName, surveyState} = this.formInline
      dwSurveyList(this.pageSize, pageNo, surveyName, surveyState).then((response) => {
        const resultData = response.data.data
        this.tableData = resultData
        this.total = response.data.total
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      })
    },
    handleDialogConfirm () {
      if (this.form.id === null) {
        this.createSurvey()
      } else {
        this.copySurvey(this.form.id)
      }
    },
    createSurvey () {
      const data = {surveyName: this.form.name}
      dwSurveyCreate(data).then((response) => {
        const httpResult = response.data
        const resultData = httpResult.data
        if (httpResult.resultCode === 200) {
          this.dialogFormVisible = false
          this.$confirm('Survey has been successfully created', 'Message', {confirmButtonText: 'Edit Survey'}).then(({value}) => {
            window.location.href=`/static/diaowen/design.html?surveyId=${resultData.id}`
          }).catch(() => {
            this.queryList(1)
          })
        } else {
          this.$message.error('Fail to create survey')
        }
      })
    },
    copySurvey (surveyId) {
      dwSurveyCopy(surveyId, this.form.name).then((response) => {
        const httpResult = response.data
        const resultData = httpResult.data
        if (httpResult.resultCode === 200) {
          this.dialogFormVisible = false
          this.$confirm('Survey has been successfully duplicated', 'Message', {confirmButtonText: 'Edit Survey'}).then(({value}) => {
            window.location.href=`/static/diaowen/design.html?surveyId=${resultData.id}`
          }).catch(() => {
            this.queryList(1)
          })
        } else {
          this.$message.error('Fail to create survey')
        }
      })
    }
  }
}
</script>
<style scoped>
.dw-table-form{
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.dw-table{
  background: white;
  padding: 20px;
}
.dw-table .dw-table-title{
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.dw-table .dw-table-title h3{
  padding: 0px;
  margin: 0px;
}
.el-form-item{
  margin-bottom: 0px;
}
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
