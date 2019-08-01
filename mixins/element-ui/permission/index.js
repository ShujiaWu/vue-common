export default {
  data () {
    return {
      permission: this.$store.state.permission.page[this.$route.name]
    }
  }
}
