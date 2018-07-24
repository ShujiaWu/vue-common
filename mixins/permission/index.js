export default {
  components: {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  data () {
    return {
      // 用户页面权限
      permission: this.$store.state.page.permissions[this.$route.name] || 0
    }
  },
  methods: {
  }
}
