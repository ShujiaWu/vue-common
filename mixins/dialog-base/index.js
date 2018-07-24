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
      btnLoadingStatus: {}
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    /**
     * ===========================================================
     * 取消
     * ===========================================================
     */
    close () {
      this.$emit('input', false)
    }
  }
}
