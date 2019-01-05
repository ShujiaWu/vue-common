<template>
  <div class="camera-photo">
    <div v-show="!photo">
      <video class="video" :id="videoEleId"
             style="width: 100%;"></video>
      <canvas :id="canvasEleId"
              style="display:none;"></canvas>
      <div class="text-error" v-if="errorMessage">{{errorMessage}}</div>
    </div>
    <div v-show="photo">
      <div class="photo-perview">
        <div class="no-photo" v-if="!photo"></div>
        <img :src="photo" v-else>
      </div>
    </div>
    <div class="text-center margin-t-10" v-if="!disabled && cameraOK && !photo">
      <Button type="primary"
              @click="getPhoto">获取图片</Button>
    </div>
    <div class="text-center margin-t-10" v-if="!disabled && cameraOK && photo">
      <Button
              @click="reselect">重新获取</Button>
      <Button type="primary"
              class="margin-l-10"
              @click="usePhoto">使用图片</Button>
    </div>
    <div class="loading" v-if="loading">
      <Spin fix>
        <div>
          <Icon type="ios-loading" class="spin-icon-load" size="18"/>
        </div>
        <div class="margin-t-10">{{loadingMsg}}</div>
      </Spin>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraPhoto',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loadingMsg: {
      type: String,
      default: '请稍候...'
    }
  },
  mounted () {
    this.initVideo()
  },
  destroyed () {
    this.stopCamera()
  },
  data () {
    return {
      videoEleId: `v_${new Date().getTime()}`,
      canvasEleId: `c_${new Date().getTime()}`,
      videoEleObject: null,
      canvasEleObject: null,
      videoPlaying: false,
      cameraOK: false,
      errorMessage: '',
      photo: '',
      mediaStreamTrack: null
    }
  },
  methods: {
    initVideo () {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(
              new Error('无法获取摄像头，请检查设备已经网页权限。')
            )
          }

          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      this.videoPlaying = false
      this.videoEleObject = document.getElementById(this.videoEleId)
      this.startCamera()
    },
    getPhoto () {
      if (this.videoPlaying) {
        if (!this.canvasEleObject) {
          this.canvasEleObject = document.getElementById(this.canvasEleId)
        }
        this.canvasEleObject.width = this.videoEleObject.videoWidth
        this.canvasEleObject.height = this.videoEleObject.videoHeight
        this.canvasEleObject
          .getContext('2d')
          .drawImage(this.videoEleObject, 0, 0)
        this.photo = this.canvasEleObject.toDataURL('image/jpeg')
        if (this.autoClose) {
          this.stopCamera()
        }
      }
    },
    stopCamera () {
      this.videoEleObject.pause()
      this.mediaStreamTrack.stop()
      this.videoPlaying = false
    },
    startCamera () {
      const constraints = {
        video: true,
        audio: false
      }
      let promise = navigator.mediaDevices.getUserMedia(constraints)
      promise
        .then(stream => {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in this.videoEleObject) {
            this.videoEleObject.srcObject = stream
          } else {
            // 防止再新的浏览器里使用它，应为它已经不再支持了
            this.videoEleObject.src = window.URL.createObjectURL(stream)
          }
          this.mediaStreamTrack = (typeof stream.stop === 'function') ? stream : stream.getTracks()[0]
          this.videoEleObject.onloadedmetadata = e => {
            this.cameraOK = true
            this.errorMessage = ''
            this.videoEleObject.play()
            this.videoPlaying = true
          }
        })
        .catch(err => {
          this.cameraOK = false
          this.errorMessage = err.message
          // console.error(err.name + ': ' + err.message)
        })
    },
    restartCamera () {
      if (this.autoClose) {
        this.startCamera()
      }
      this.photo = undefined
    },
    usePhoto () {
      this.$emit('usePhoto', this.photo)
    },
    reselect () {
      this.restartCamera()
      this.$emit('reselect')
    },
    reset () {
      this.photo = undefined
      this.stopCamera()
      this.startCamera()
    }
  }
}
</script>

<style lang="less" scoped>
.camera-photo {
  position: relative;
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
.video {
  border: 1px solid #dddee1;
  border-radius: 5px;
  background-image: url('./img/camera.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30%;
}
.photo-perview {
  width: 100%;
  img {
    width: 100%;
    background-image: url('./img/photo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30%;
  }
  .no-photo {
    border: 1px solid #dddee1;
    border-radius: 5px;
    width: 100%;
    padding-top: 50%;
    background-image: url('./img/photo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30%;
  }
}
@keyframes spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.spin-icon-load{
  animation: spin 1s linear infinite;
}
</style>
