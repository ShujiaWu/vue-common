<template>
  <i-menu :open-names="openNames"
          :active-name="activeName"
          width="256px"
          :accordion="true"
          ref="menu"
          theme="dark">
    <template v-for="(menu, index) in menus">
      <SubMenuNormal :key="index"
                     :menu="menu"
                     @click="menuClick"
                     v-if="!menu.meta.hidden" />
    </template>
  </i-menu>
</template>

<script>
import SubMenuNormal from './sub-menu-normal'
export default {
  name: 'MenuNormal',
  components: {
    SubMenuNormal
  },
  props: {
    menus: {
      type: [Array, Object],
      default: () => []
    },
    activeName: {
      type: String,
      default: undefined
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  watch: {
    // menus (value) {
    //   console.log('genxin')
    //   this.$nextTick(() => {
    //     this.$refs.menu.updateOpened(this.menus)
    //   })
    // }
  },
  methods: {
    menuClick (item) {
      this.$emit('click', item)
    },
    updateOpened () {
      this.$refs.menu.updateOpened()
    }
  }
}
</script>

<style lang="less" scoped>
// 覆盖菜单样式
.ivu-menu-item {
  height: 52px;
  padding: 16px 24px;
  font-size: 14px;
  line-height: 20px;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: rgba(255, 255, 255, 0.7);
  background: #2d8cf0 !important;
}
.layout-text {
  vertical-align: middle;
  display: inline-block;
}
</style>
