<template>
  <div class="sidebar" :class="{collapse: collapse}">
    <logo :collapse="collapse" v-if="APP && APP.showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="menus">
      <el-menu :default-active="actived" :collapse="collapse">
        <MenuItem :menus="$store.state.permission.routes"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import MenuItem from './item'
import Logo from './logo'
export default {
  components: {
    MenuItem, Logo
  },
  computed: {
    collapse () {
      return this.$store.state.app.sidebar.collapse
    },
    actived () {
      const route = this.$route
      const { meta, path } = route
      // 如果不在左侧菜单展示，但是需要高亮的
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  data () {
    return {
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../vue-common/assets/styles/element-ui/variables/variables.scss';
.sidebar {
  transition: width .28s;
  width: $sideBarWidth;
  position: fixed;
  flex-direction:column;
  top: 0;
  left: 0;
  bottom: 0;
  background: $menuBg;
  display: flex;
  z-index: 1001;
  transform: translateZ(0); // 修复抖动
  .menus {
    height: 100%;
  }
  &.collapse {
    width: 64px;
  }
}
</style>

<style lang="scss">
.sidebar .scrollbar-wrapper {
  flex: 1;
  overflow-x: hidden !important;
}
</style>
