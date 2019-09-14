<template>
  <div :class="{shrink: shrink}">
    <!-- 正常模式 -->
    <MenuNormal :menus="menus"
                :activeName="activeName"
                v-if="!shrink"
                :open-names="openNames"
                @click="itemClick"
                ref="normal" />
    <!-- 缩小模式 -->
    <MenuShrink :menus="menus"
                :activeName="activeName"
                @click="itemClick"
                v-else />
  </div>
</template>

<script>
import MenuNormal from './menu-normal'
import MenuShrink from './menu-shrink'
export default {
  name: 'Menu',
  components: {
    MenuShrink,
    MenuNormal
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  created () {
    // this.activeName = this.$route.fullPath
  },
  data () {
    return {
      activeName: '',
      openNames: []
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (
          val.meta &&
          val.meta.level &&
          val.meta.level.length &&
          !val.meta.hidden
        ) {
          // 非隐藏菜单
          this.activeName = val.fullPath
          this.$set(
            this,
            'openNames',
            val.meta.level.map(value => value.fullPath).slice(1)
          )
          if (!this.shrink) {
            this.$nextTick(() => {
              this.updateOpened()
            })
          }
        } else {
          this.activeName = undefined
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    itemClick (item) {
      if (item.fullPath !== this.activeName) {
        this.$nextTick(() => {
          this.$router.push(item)
        })
      }
    },
    updateOpened () {
      this.$refs.normal.updateOpened()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
