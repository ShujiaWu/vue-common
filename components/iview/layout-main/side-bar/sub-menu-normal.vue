<template>
  <!-- 没有子菜单 -->
  <Menu-item :name="menu.fullPath"
             v-if="!menu.children"
             @click.native="menuClick(menu)">
    <!-- icon -->
    <Icon :type="menu.meta.icon"
          :size="16"></Icon>
    <!-- 名称 -->
    <span class="layout-text">{{menu.title}}</span>
  </Menu-item>
  <!-- 有子菜单 -->
  <Submenu :name="menu.fullPath"
           v-else-if="!menu.meta.hidden">
    <!-- 分组名称 -->
    <template slot="title">
      <!-- icon -->
      <Icon :type="menu.meta.icon"
            :size="16"></Icon>
      <!-- 名称 -->
      <span class="layout-text">{{menu.title}}</span>
    </template>
    <!-- 菜单内容 -->
    <template v-for="(subMenu, index) in menu.children">
      <SubMenuNormal :menu="subMenu"
                     :key="index"
                     :basePath="menu.fullPath"
                     @click="menuClick"
                     v-if="!subMenu.meta.hidden" />
    </template>
  </Submenu>
</template>

<script>
// import path from 'path'
export default {
  name: 'SubMenuNormal',
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
    basePath: {
      type: String,
      default: '/'
    }
  },
  created () {
    // this.menu.fullPath = this.resolvePath(this.menu.path)
  },
  methods: {
    // resolvePath (routePath) {
    //   return path.resolve(this.basePath, routePath)
    // },
    menuClick (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
