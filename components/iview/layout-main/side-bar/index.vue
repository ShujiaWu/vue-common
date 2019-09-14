<template>
  <div class="side-bar"
       :class="{shrink: shrink}">
    <!-- LOGO 和 标题 -->
    <div class="side-bar-logo">
      <slot>
        <a href="/">
          <img src="../../../../assets/img/logo.png"
               alt="iView 管理后台">
          <h1 v-if="!shrink">iView 管理后台</h1>
        </a>
      </slot>
    </div>
    <!-- 菜单 -->
    <div class="menu">
      <div class="menu-box">
        <Menu :menus="menus"
              :shrink="shrink"></Menu>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './menu'
export default {
  name: 'SideBar',
  components: {
    Menu
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menus: this.$store.state.app.sideBar
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.side-bar {
  width: 256px;
  flex: 0 0 256px;
  height: 100%;
  background-color: @menu-bg-color;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 13;
  transition: all @animation-time linear;
  &-logo {
    height: 63px;
    width: 100%;
    border-bottom: 1px solid @menu-logo-border-bottom-color;
    a {
      display: block;
      height: 100%;
      width: 80%;
      text-align: center;
      margin: 0 auto;
    }
    &::after {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    img {
      max-height: 100%;
      max-width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      vertical-align: middle;
      color: @menu-title-color;
      font-size: @menu-title-font-size;
    }
  }
  .menu-box {
    width: 280px;
    height: 100%;
    overflow: auto;
    transition: all @animation-time linear;
  }
  .menu {
    height: calc(100% - 64px);
    overflow: hidden;
  }

  &.shrink {
    width: 80px;
    flex: 0 0 80px;
    .menu-box {
      width: 80px;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
