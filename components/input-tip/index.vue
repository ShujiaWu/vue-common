<template>
  <Tooltip>
    <Icon type="ios-information-circle"
          class="icon"
          :size="size"></Icon>
    <div slot="content">
      <slot>{{content}}</slot>
    </div>
  </Tooltip>
</template>

<script>
export default {
  name: 'InputTip',
  props: {
    content: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 20
    }
  }
}
</script>

<style lang="less" scoped>
.icon {
  line-height: 33px;
  color: #999;
}
</style>
