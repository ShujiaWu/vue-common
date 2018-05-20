<template>
  <Modal :value="value" width="680" transfer :mask-closable="false" :closable="false">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>选择并插入图片</span>
    </p>
    <div class="content">
      <row :gutter="20">
        <i-col :span="16" class="list">
          <div v-if="mode=='select'">
            <div class="margin-b-10">点击预览并选择图片： <a @click="getList">刷新</a></div>
            <!-- 表格 -->
            <Table
              class="margin-b-10"
              stripe
              highlight-row
              :loading="table.loading"
              :columns="table.columns"
              :data="table.data"
              ref="currentRowTable"
              @on-row-click="rowClick"/>
              <!-- 翻页 -->
            <div class="margin-b-10 text-center">
              <Page
                :page-size-opts="page.pageSizeOpts"
                :total="page.total"
                :page-size="page.size"
                :current="page.current"
                show-elevator show-total
                placement="top"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"/>
            </div>
          </div>
          <div v-else>
            <div class="margin-b-10">图片上传：</div>
            <div class="upload-area">
              <Upload class="margin-b-20"
                :show-upload-list="false"
                :data="formData"
                accept=".jpg,.jpeg,.jpe,.png"
                type="drag"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :on-error="onError"
                :action="action">
                <div style="padding: 30px 0">
                  <Icon type="ios-cloud-upload" size="36" style="color: #3399ff"></Icon>
                  <p>点击选择 或 将文件拖放到该区域</p>
                </div>
              </Upload>
              <div>
                <div>{{upload.message}}</div>
              </div>
              <div class="cover" v-if="upload.uploading"></div>
            </div>
          </div>
        </i-col>
        <i-col :span="8" class="perview">
          <div class="margin-b-10">图片预览：</div>
          <div v-if="mode=='select'">
            <div class="img v-align-middle text-center" :style="{'background-image': `url(${table.currentRow && table.currentRow.url})`}">
              <div class="tips v-middle" v-if="!table.currentRow">
                <div class="text-999">点击左侧预览图片</div>
                <Button size="small" class="margin-t-10" @click="changeUpload">上传新图片</Button>
              </div>
            </div>
            <div class="text-center" v-if="table.currentRow">
              <Button size="small" class="margin-t-10" @click="changeUpload">上传新图片</Button>
            </div>
          </div>
          <div v-else>
            <div class="img v-align-middle text-center" :style="{'background-image': `url(${upload.url})`}">
              <div class="tips v-middle" v-if="!upload.url">
                <div class="text-999">预览图片</div>
              </div>
            </div>
          </div>
        </i-col>
      </row>
    </div>
    <div slot="footer">
      <div v-if="mode=='select'">
        <span v-if="!table.currentRow" class="text-warning margin-r-20">当前未选择图片</span>
        <span v-else class="text-info margin-r-20">当前选择: {{table.currentRow.name}}</span>
        <Button :disabled="upload.uploading" @click="close">取消</Button>
        <Button type="primary" :disabled="!table.currentRow" @click="selectInsert">插入</Button>
      </div>
      <div v-else>
        <Button :disabled="upload.uploading" @click="close">取消</Button>
        <Button v-if="!upload.uploading" @click="changeSelect">返回选择</Button>
        <Button :disabled="!upload.url" type="primary" @click="uploadInsert">插入</Button>
      </div>
    </div>
  </Modal>
</template>
<script>
import TableMixins from '@/common/mixins/table'
import Table from './table'
import Service from './service'
export default {
  mixins: [TableMixins],
  beforeMount () {
    this.table.columns = Table(this)
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      mode: 'select',
      page: {
        size: 5 // 页面数据量
      },
      formData: {
      },
      show: true,
      Service: Service,
      upload: {
        uploading: false,
        success: true,
        message: '',
        url: ''
      }
    }
  },
  watch: {
    params (value) {
      Object.assign(this.formData, value)
    },
    value (value) {
      if (value) {
        this.mode = 'select'
      }
    }
  },
  methods: {
    /**
     * ===========================================================
     * 文件上传之前
     * ===========================================================
     */
    beforeUpload (file) {
      this.upload.uploading = true
      this.upload.message = ''
    },
    /**
     * ===========================================================
     * 文件上传成功
     * ===========================================================
     */
    onSuccess (response, file, fileList) {
      console.log(response)
      this.upload.uploading = false
      this.upload.url = response.result[0]
      this.upload.message = `上传成功，图片地址：${response.result[0]}`
    },
    /**
     * ===========================================================
     * 文件上传失败
     * ===========================================================
     */
    onError (error, file, fileList) {
      this.upload.uploading = false
      console.log(error)
      this.upload.message = `文件上传失败：${error.message}`
    },
    changeSelect () {
      this.mode = 'select'
    },
    changeUpload () {
      this.mode = 'upload'
    },
    close () {
      this.$emit('input', false)
    },
    uploadInsert () {
      this.$emit('insert', this.upload.url)
      this.close()
    },
    selectInsert () {
      this.$emit('insert', this.table.currentRow.url)
      this.close()
    }

  }
}
</script>

<style lang="less" scoped>
.perview {
  .img {
    width: 100%;
    height: 180px;
    border: 1px solid #F1EEEE;
    border-radius: 5px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.upload-area {
    position: relative;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0
    }
  }
</style>
