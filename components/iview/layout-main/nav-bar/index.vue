<template>
  <div class="nav-bar"
       :class="{shrink: shrink}">
    <div class="menu-mode-btn">
      <div class="btn"
           :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
           @click="changeMenuMode">
        <Icon type="ios-menu-outline"
              size="32"></Icon>
      </div>
    </div>
    <div class="menu">
      <Menu mode="horizontal"
            :active-name="activeName">
        <MenuItem :name="item.id"
                  v-for="(item, index) in menus"
                  @click.native="menuItemClick(item)"
                  :key="index">
        <Icon :type="item.icon" />
        {{item.title}}
        </MenuItem>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    shrink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menus: this.$store.state.app.navBar,
      activeName: ''
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.meta && val.meta.level && val.meta.level.length) {
          this.activeName = val.meta.level[0].id
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeMenuMode () {
      this.$emit('modeChange', !this.shrink)
    },
    menuItemClick (item) {
      if (item.path && item.path !== this.$route.fullPath) {
        this.$store.dispatch('app/NavBarMenuItemChange', item)
        setTimeout(() => {
          this.$router.push(item.path)
        }, 500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  height: 64px;
  line-height: 64px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all @animation-time linear;
  display: flex;
  background: #fff;
  position: fixed;
  right: 0;
  top: 0;
  left: 256px;
  z-index: 11;
  &.shrink {
    left: 80px;
  }
  .menu-mode-btn {
    .btn {
      cursor: pointer;
      padding: 0 20px;
      &:hover {
        color: @primary-color;
      }
    }
  }
  .menu {
    flex: 1;
    padding-top: 4px;
    .ivu-menu-horizontal.ivu-menu-light:after {
      display: none;
    }
  }
}
</style>
