<template>
  <i v-if="icon.startsWith('el-icon')" :class="icon" :style="{fontSize: size, color:color}"></i>
  <svg-icon  v-else :icon="icon" :color="color" :size="size"/>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: undefined
    }
  }
}
</script>
