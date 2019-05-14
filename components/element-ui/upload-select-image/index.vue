<template>
  <el-dialog title=""
             :visible.sync="value"
             width="800px">
    <div slot="title">图片选择器</div>
    <el-row v-if="mode=='select'">
      <!-- 检索 -->
      <el-col :span="24">
        <list-data-filter :data="FilterConfig" size="mini"/>
      </el-col>
      <!-- 列表 -->
      <el-col :span="16">
        <el-table :data="table.data"
                  v-loading="table.loading"
                  highlight-current-row
                  @current-change="currentChange"
                  ref="table"
                  height="288px"
                  style="width: 100%">
          <!-- ID -->
          <el-table-column prop="id"
                           label="ID"
                           width="50" />
          <!-- 名称 -->
          <el-table-column prop="name"
                           label="名称"
                           min-width="100">
            <div slot-scope="props" class="file-name">{{props.row.name}}</div>
          </el-table-column>
          <!-- 上传日期 -->
          <el-table-column prop="datetime"
                           label="上传日期"
                           width="160">
            <template slot-scope="props">
              <div>
                {{props.row.datetime | datetime('yyyy-MM-dd HH:mm:ss')}}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="text-align: center; padding: 20px 0 10px 0;">
          <el-pagination @size-change="pageSizeChange"
                         @current-change="pageChange"
                         :current-page="pagination.current"
                         :page-sizes="pagination.pageSizeOpts"
                         :page-size="pagination.size"
                         layout="total, prev, pager, next"
                         :total="pagination.total" />
        </div>
      </el-col>
      <!-- 图片预览 -->
      <el-col :span="8">
        <div class="preview" v-if="currentRow">
          <div class="title">图片预览</div>
          <div class="img-preview">
            <div class="img" :style="{'backgroundImage': `url(${currentRow.url})`}" />
          </div>
          <div class="info">
            <div><span>{{currentRow.name}}</span> <span>{{currentRow.size | filesize}}</span></div>
            <div>{{currentRow.datetime | datetime('yyyy-MM-dd HH:mm:ss')}}</div>
          </div>
          <div style="margin-top:10px;">
            <el-link type="primary" @click="uploadNew">上传新图片</el-link>
          </div>
        </div>
        <div class="no-select" v-else>
          <img src="./img/img.png" alt="">
          <div>点击左侧预览图片</div>
          <div>或</div>
          <el-link type="primary" @click="uploadNew">上传新图片</el-link>
        </div>
      </el-col>
    </el-row>
    <div v-if="mode=='upload'">
      <el-row>
        <el-col :span="upload.newFile? 16:24">
          <!-- 图片上传 -->
          <div class="upload-area">
            <!-- 上传组件 -->
            <el-upload
              class="upload"
              drag
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :on-progress="uploadProgress"
              ref="upload"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :data="formData"
              :action="action">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <!-- loading -->
            <div class="loading" v-if="upload.loading">
              <el-progress type="circle" style="vertical-align: middle;" :percentage="upload.percentage" status="text" :color="progressColor">
                <div style="font-size:20px; color: #409EFF;" v-if="upload.status==1">{{upload.percentage}} %</div>
                <div style="font-size:20px; color: #67C23A;" v-if="upload.status==2">上传成功</div>
                <div style="font-size:20px; color: #F56C6C" v-if="upload.status==-1">上传失败</div>
              </el-progress>
            </div>
          </div>
          <!-- 错误提示 -->
          <div class="upload__error_message" v-if="upload.status===-1">
            文件上传失败{{upload.status}}<br>{{upload.msg}}
          </div>
        </el-col>
        <el-col :span="8" v-if="upload.newFile">
          <div class="preview">
            <div class="img-preview">
              <div class="img" :style="{'backgroundImage': `url(${upload.newFile.url})`}" />
            </div>
            <div class="info">
              <div><span>{{upload.newFile.name}}</span> <span>11.99 kb</span></div>
              <div>{{upload.newFile.datetime | datetime('yyyy-MM-dd HH:mm:ss')}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <span slot="footer">
      <el-button @click="close">取 消</el-button>
      <template v-if="mode === 'upload'">
        <el-button type="primary" @click="gotoList">返回列表</el-button>
        <el-button type="primary" v-if="upload.newFile" @click="useImage">使用图片</el-button>
      </template>
      <template v-if="mode === 'select'">
        <el-button type="primary" :disabled="!currentRow" @click="useImage">使用图片</el-button>
      </template>
    </span>
  </el-dialog>
</template>

<script>
import FilterConfig from './filter'
import TableMixin from '@vue-common/mixins/element-ui/table'
import DefaultService from './service'
import filesize from '../../../utils/file-size'
export default {
  name: 'UploadSelectImage',
  mixins: [TableMixin],
  filters: {
    filesize
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: '/api/file/upload'
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataService: {
      type: Object,
      default: () => {
        return DefaultService
      }
    }
  },
  created () {
    this.FilterConfig = FilterConfig(this)
    this.$set(this, 'formData', this.params)
  },
  data () {
    return {
      mode: 'select',
      FilterConfig: {},
      // 分页数据
      pagination: {
        pageSizeOpts: [5],
        total: 0, // 数据量
        current: 1, // 当前页数
        size: 5, // 页面数据量
        pages: 1 // 总共页数
      },
      Service: this.dataService,
      formData: {},
      constants: {},
      currentRow: null,
      upload: {
        loading: false,
        percentage: 0,
        status: 0, // 【-1】上传失败 【0】初始化 【1】上传中 【2】上传成功
        msg: '',
        newFile: null
      }
    }
  },
  watch: {
    params (value) {
      this.$set(this, 'formData', value)
    },
    value (value) {
      if (value) {
        this.mode = 'select'
        this.getList()
        this.$set(this.upload, 'newFile', null)
      }
    }
  },
  computed: {
    progressColor () {
      let color = '#20a0ff'
      switch (this.upload.status) {
        case -1:
          color = '#F56C6C'
          break
        case 2:
          color = '#67C23A'
          break
      }
      return color
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    currentChange (val) {
      this.currentRow = val
    },
    gotoList () {
      this.mode = 'select'
      this.getList()
    },
    uploadNew () {
      this.$refs['table'].setCurrentRow(null)
      this.currentRow = null
      this.mode = 'upload'
      this.$set(this.upload, 'newFile', null)
    },
    useImage () {
      let img = {}
      switch (this.mode) {
        case 'select':
          Object.assign(img, this.currentRow)
          break
        case 'upload':
          Object.assign(img, this.upload.newFile)
          break
      }
      this.$emit('insert', img)
      this.close()
    },
    beforeUpload (file) {
      this.upload.msg = ''
      this.upload.status = 0
      this.upload.loading = true
    },
    uploadError (err, file, fileList) {
      this.upload.msg = err.message ? err.message : ''
      this.upload.percentage = 100
      this.upload.status = -1
      setTimeout(() => {
        this.upload.loading = false
        // 还原初始状态
        this.$nextTick(() => {
          // this.upload.status = 0
          this.upload.percentage = 0
        })
      }, 500)
    },
    uploadSuccess (response, file, fileList) {
      this.upload.status = 2
      this.upload.percentage = 100
      setTimeout(() => {
        this.$refs['upload'].clearFiles()
        this.upload.loading = false
        this.upload.newFile = {
          name: response.result[0].originalName,
          datetime: new Date(response.result[0].uploadDatetime),
          url: response.result[0].url
        }
        // 还原初始状态
        this.$nextTick(() => {
          this.upload.status = 0
          this.upload.percentage = 0
        })
      }, 500)
    },
    uploadProgress (event, file, fileList) {
      this.upload.status = 1
      this.upload.percentage = parseInt(event.percent)
    }
  }
}
</script>

<style lang="less" scoped>
.preview {
  text-align: center;
  .title {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .img-preview {
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('./img/bg.png')
  }
  .img {
    display: inline-block;
    width: 200px;
    height: 200px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #EBEEF5;
  }
  .info {
    font-size: 12px;
    color: #999;
    line-height: 1.5;
  }
}
.no-select {
  text-align: center;
  padding-top: 30px;
  font-size: 14px;
  line-height: 1.5;
  img {
    margin-left: 10px;
  }
}

.upload-area {
  position: relative;
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    vertical-align: middle;
    background: rgba(255,255,255, 0.9);
    &::after {
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.upload {
  text-align: center;
  &__error_message {
    text-align: center;
    color:#F56C6C;
    margin-top: 20px;
    min-height: 16px;
  }
}
.file-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<style lang="scss">
.el-upload-dragger {
  height: 200px;
  .el-icon-upload {
    line-height: 70px;
  }
}
.el-dialog__body {
  padding: 15px 20px;
}
</style>
