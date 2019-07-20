<template>
  <div class="tips">
    <div class="title text-title"><slot name="title"></slot></div>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TipsCard'
}
</script>

<style lang="less" scoped>
.tips {
  background: #FFF;
  padding: 20px;
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 16px;
  }
}
</style>
