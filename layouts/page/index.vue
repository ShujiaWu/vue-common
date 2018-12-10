<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageLayout'
}
</script>

<style lang="less" scoped>
.page {
  padding: 20px;
  background: #FFF;
}
</style>
