<template>
  <div>
    <ul class="upload-list">
      <li v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <div class="img" :style="{'background-image': `url(${getFileIcon(item.name,item.url)})`}"></div>
          <div class="file-info">{{item.name}}</div>
          <div class="upload-list-cover">
            <Icon type="ios-eye-outline" v-if="perviewable(item.name, item.url)" @click.native="preview(item.url)"></Icon>
            <Icon type="ios-cloud-download-outline" v-if="!perviewable(item.name, item.url)" @click.native="download(item.url)"></Icon>
            <Icon type="ios-trash-outline" @click.native="remove(item)" v-if="!disabled"></Icon>
          </div>
        </template>
        <template v-else>
          <img :src="getFileIcon(item.name,item.url)">
          <div class="progress">
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </div>
        </template>
      </li>
    </ul>
    <Upload
      ref="upload"
      :multiple="multiple"
      type="select"
      :format="format"
      :accept="accept"
      :on-format-error="handleFormatError"
      :data="params"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :on-progress="progress"
      :before-upload="beforeUpload"
      :on-exceeded-size="handleMaxSize"
      :show-upload-list="false"
      :action="url"
      :max-size="15000"
      :default-file-list="defaultList"
      :hidden="disabled || !(maxCount < 0 || (maxCount > 0 && maxCount > uploadList.length))">
      <Button type="ghost" icon="ios-cloud-upload-outline">{{buttonName}}</Button>
    </Upload>
    <div>
      <Modal title="查看文件" v-model="dialog.show" :transfer="false">
        <div class="original-img" :style="{'background-image': `url(${dialog.img})`}" :src="dialog.img"></div>
        <div slot="footer">
          <Button type="primary" @click="dialog.show=false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    // 附加参数
    params: {
      type: Object,
      default () {
        return {
          version: 'v1',
          channel: 'h5',
          fileSubject: 'Tester',
          fileOwner: -1
        }
      }
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 最大文件数
    maxCount: {
      type: Number,
      default: -1
    },
    // 已经上传的文件列表
    // [{
    //    name: 'img1.jpg',
    //    url: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
    //    uuid: '97784842-34c2-4cfa-b7f8-bed519bcd260'
    // }]
    defaultList: {
      type: Array,
      default: () => []
    },
    // 按钮名称
    buttonName: {
      type: String,
      default: '上传文件'
    },
    url: {
      type: String,
      default: ''
    },
    // 选择文件的类型
    accept: {
      type: String,
      default: undefined
    },
    // 上传的文件类型
    format: {
      type: Array,
      default: () => {
        return ['jpg', 'jpeg', 'png', 'gif']
      }
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  data () {
    return {
      uploadComponent: undefined,
      dialog: {
        show: false,
        img: undefined
      },
      uploadList: []
    }
  },
  watch: {
    'defaultList' () {
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList
      })
    }
  },
  methods: {
    /**
     * 上传失败
     */
    uploadError (error, file, fileList) {
      console.log('[文件上传错误]', error)
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    /**
     * 上传成功
     */
    uploadSuccess (response, file, fileList) {
      // console.log('[文件上传成功]')
      // console.log(fileList)
      // console.log(file)
      if (file.response.code === '10000') {
        file.url = file.response.result.downPath
        this.$emit('file-change', this.getFileUUIDList(fileList))
        this.$emit('fileChange', response.result)
      } else {
        this.uploadError(file.response.subMsg || file.response.msg, file, fileList)
      }
    },
    /**
     * 文件上传中
     */
    progress (event, file, fileList) {
      // console.log('[文件上传中]')
      // console.log(file.percentage)
    },
    /**
     * 文件预览
     */
    preview (url) {
      this.dialog.img = url
      this.dialog.show = true
    },
    /**
     * 文件从列表中删除
     */
    remove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.$emit('file-change', this.getFileUUIDList(fileList))
      this.$emit('file-remove', file)
    },
    /**
     * 文件上传前
     */
    beforeUpload () {
      if (this.maxCount >= 0 && this.$refs.upload.fileList.length + 1 > this.maxCount) {
        this.$Notice.error({
          title: '超过文件上传个数限制',
          desc: `限制个数：${this.maxCount}， 当前文件个数${this.$refs.upload.fileList.length + 1}`
        })
        return false
      }
      return true
    },
    /**
     * 获取图标
     */
    getFileIcon (fileName, url) {
      let ext
      let iconName
      fileName = fileName || url || ''
      let pointPos = fileName.lastIndexOf('.')
      if (pointPos !== -1) {
        ext = fileName.substring(pointPos + 1).toUpperCase()
      }
      switch (ext) {
        case 'JPG':
        case 'JPEG':
        case 'PNG':
        case 'GIF':
          iconName = url || '/static/file-icon/ImageFile.png'
          break
        case 'TXT':
          iconName = '/static/file-icon/TXT.png'
          break
        case 'PDF':
          iconName = '/static/file-icon/PDF.png'
          break
        case 'ZIP':
          iconName = '/static/file-icon/ZIP.png'
          break
        case 'RAR':
          iconName = '/static/file-icon/RAR.png'
          break
        case 'MP4':
        case 'FLV':
        case 'MPEG':
        case 'MPG':
        case 'MOV':
          iconName = '/static/file-icon/VideoFile.png'
          break
        case 'MP3':
          iconName = '/static/file-icon/AudioFile.png'
          break
        default:
          iconName = '/static/file-icon/Document.png'
      }
      return iconName
    },
    /**
     * 是否可以预览
     */
    perviewable (fileName, url) {
      let ext
      fileName = fileName || url || ''
      let pointPos = fileName.lastIndexOf('.')
      if (pointPos !== -1) {
        ext = fileName.substring(pointPos + 1).toUpperCase()
      }
      switch (ext) {
        case 'JPG':
        case 'JPEG':
        case 'PNG':
        case 'GIF':
          return true
        default:
          return false
      }
    },
    getFileUUIDList (fileList) {
      let result = []
      fileList.forEach((element) => {
        result.push({
          url: element.downPath || element.response.result.downPath,
          uuid: element.uuid
        })
      }, this)
      return result
    },
    /**
     * 下载文件
     */
    download (url) {
      window.open(url)
    },
    // 文件超过限制
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小超过限制',
        desc: '文件：' + file.name + '太大，上传文件不能超过15M'
      })
    },
    // 文件类型错误提示
    handleFormatError (file) {
      this.$Notice.warning({
        title: '无法上传的文件类型',
        desc: `文件：${file.name} 无法上传，请改用 ${this.format.join(', ')} 格式的图片`
      })
    }
  }
}
</script>

<style scoped>
  .upload-list {
    margin-bottom: 10px;
  }

  .upload-list li {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 1px solid #EEE;
    /* padding: 10px; */
    position: relative;
    line-height: 150px;
    text-align: center;
    margin-right: 10px;
  }

  .upload-list li img,
  .upload-list li .img {
    width: 100%;
    height: 100%;
    display: block;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .upload-list-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: none;
  }

  .upload-list li:hover .upload-list-cover {
    display: block;
  }

  .upload-list-cover i {
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    margin: 0 10px;
  }

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .file-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 1.5;
    color: #FFF;
    background: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .upload-list li:hover .file-info {
    display: none;
  }
  .original-img {
    width: 100%;
    height: 400px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
