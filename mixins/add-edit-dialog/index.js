import DialogMixin from '@common/mixins/dialog'
export default {
  mixins: [DialogMixin],
  components: {
  },
  props: {
    type: {
      type: String,
      default: 'add'
    },
    permission: {
      type: Number,
      default: 0
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
      btnLoadingStatus: {
        add: false,
        modify: false
      }
    }
  },
  computed: {
    readonly () {
      return false
    }
  },
  watch: {
    // data (value) {
    //   if (this.type === 'edit') {
    //     Object.assign(this.form.data, value)
    //   }
    // },
    value (value) {
      if (!value) {
        this.$refs['form'].resetFields()
      } else {
        if (this.type === 'edit') {
          if (this.Service && this.Service.getDetail) {
            // 有获取详情的接口--直接从后台拉取最新数据
            // this.getDetail()
          } else {
            // 没有取详情的接口--直接从列表项中获取数据
            Object.assign(this.form.data, this.data)
            // this.$set(this.form, 'data', this.data)
          }
        }
      }
    }
  },
  methods: {
    /**
     * ===========================================================
     * 添加
     * ===========================================================
     */
    add () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 表单合法
          this.btnLoadingStatus.add = true
          this.Service.add(this.form.data).then(result => {
            this.btnLoadingStatus.add = false
            if (result.isSuccess) {
              // 成功
              this.$Message.success('添加成功')
              this.$emit('input', false)
              this.$emit('success', 'add')
            } else {
              // 失败
              this.$Message.error(result.message)
            }
          })
        } else {
          // 表单不合法
          this.$Message.error('请检查输入的信息是否有误')
        }
      })
    },
    /**
     * ===========================================================
     * 修改
     * ===========================================================
     */
    modify () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 表单合法
          this.btnLoadingStatus.modify = true
          this.Service.modify(this.form.data).then(result => {
            this.btnLoadingStatus.modify = false
            if (result.isSuccess) {
              // 成功
              this.$Message.success('修改成功')
              this.$emit('input', false)
              this.$emit('success', 'edit')
            } else {
              // 失败
              this.$Message.error(result.message)
            }
          })
        } else {
          this.$Message.error('请检查输入的信息是否有误')
        }
      })
    }
  }
}
