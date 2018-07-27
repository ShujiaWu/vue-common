<template>
  <div :id="id"></div>
</template>

<script>
import qrcode from 'qrcode-generator'
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    typeNumber: {
      type: Number,
      default: 0
    },
    errorLevel: {
      type: String,
      default: 'M'
    },
    margin: {
      type: Number,
      default: 8
    },
    width: {
      type: Number
    }
  },
  mounted () {
    this.createCode()
  },
  data () {
    return {
      id: `QR_${new Date().getTime()}`
    }
  },
  watch: {
    value () {
      this.createCode()
    }
  },
  methods: {
    createCode () {
      var qr = qrcode(this.typeNumber, this.errorLevel)
      qr.addData(this.value)
      qr.make()
      if (this.width) {
        let width = (this.width - this.margin - this.margin) / qr.getModuleCount()
        document.getElementById(this.id).innerHTML = qr.createImgTag(width, this.margin)
      } else {
        document.getElementById(this.id).innerHTML = qr.createImgTag()
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
