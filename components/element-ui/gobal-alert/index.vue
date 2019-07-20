<template>
  <div class="gobal-alert">
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
        type: this.$store.state.app.gobalAlert.type,
        closable: this.$store.state.app.gobalAlert.closable,
        showIcon: this.$store.state.app.gobalAlert.showIcon
      }
      if (this.$store.state.app.gobalAlert.closeText) {
        attr.closeText = this.$store.state.app.gobalAlert.closeText
      }
      return attr
    },
    title () {
      return this.$store.state.app.gobalAlert.title
    },
    content () {
      return this.$store.state.app.gobalAlert.content
    }
  },
  data () {
    return {}
  },
  methods: {
    close () {
      this.$store.dispatch('AppGobalAlertClose')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../vue-common/assets/styles/element-ui/variables/variables.scss';
.gobal-alert {
  background: $pageBgColor;
  padding: 5px 10px;
}
</style>

<style lang="scss">
.gobal-alert {
  .el-alert__content {
    width: 90%;
  }
  .el-alert__description {
    width: 100%;
  }
}
</style>
