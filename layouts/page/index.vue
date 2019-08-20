<template>
  <div class="page">
    <slot name="header"></slot>
    <div class="page-container" :style="{background: background}">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  mounted () {
    this.$store.dispatch('window/WindowResize')
  },
  props: {
    background: {
      type: String,
      default: '#FFF'
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  // padding: 10px;
  .page-container {
    margin: 10px;
    padding: 20px;
  }
}
</style>
