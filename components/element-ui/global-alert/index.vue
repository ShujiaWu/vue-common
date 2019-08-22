<template>
  <div class="global-alert">
    <el-alert v-bind="attr" @close="close">
      <div slot="title" v-html="title" v-if="title"></div>
      <div v-if="content">{{content}}</div>
    </el-alert>
  </div>
</template>

<script>
export default {
  computed: {
    attr () {
      let attr = {
        type: this.$store.state.app.globalAlert.type,
        closable: this.$store.state.app.globalAlert.closable,
        showIcon: this.$store.state.app.globalAlert.showIcon
      }
      if (this.$store.state.app.globalAlert.closeText) {
        attr.closeText = this.$store.state.app.globalAlert.closeText
      }
      return attr
    },
    title () {
      return this.$store.state.app.globalAlert.title
    },
    content () {
      return this.$store.state.app.globalAlert.content
    }
  },
  data () {
    return {}
  },
  methods: {
    close () {
      this.$store.dispatch('app/AppGlobalAlertClose')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../vue-common/assets/styles/element-ui/variables/variables.scss';
.global-alert {
  background: $pageBgColor;
  padding: 10px 10px 0 10px;
}
</style>

<style lang="scss">
.global-alert {
  .el-alert__content {
    width: 90%;
  }
  .el-alert__description {
    width: 100%;
  }
}
</style>
