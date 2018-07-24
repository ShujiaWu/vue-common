export default {
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      defaule: () => {}
    },
    constants: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  data () {
    return {
      content: {}
    }
  },
  computed: {
  },
  watch: {
    value (value) {
      if (!value) {
      } else {
        if (this.type === 'edit') {
          if (this.Service && this.Service.getDetail) {
            // 有获取详情的接口--直接从后台拉取最新数据
            // this.getDetail()
          } else {
            // 没有取详情的接口--直接从列表项中获取数据
            Object.assign(this.content, this.data)
            // this.$set(this.form, 'data', this.data)
          }
        }
      }
    }
  },
  methods: {
    /**
     * ===========================================================
     * 取消
     * ===========================================================
     */
    close () {
      this.$emit('input', false)
    },
    /**
     * ===========================================================
     * 添加
     * ===========================================================
     */
    getDetail () {
      this.Service.getDetail(this.data).then(result => {
        if (result.isSuccess) {
          this.$set(this.form, 'data', result.data)
        } else {
          this.$Message.error(result.message)
        }
      })
    }
  }
}
