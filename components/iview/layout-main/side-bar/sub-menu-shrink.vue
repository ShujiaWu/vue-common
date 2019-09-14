<template>
  <div class="menu-shrink-dropdown-item-content"
       @click="itemClick(menu)"
       v-if="!menu.children">
    <Icon :type="menu.meta.icon"
          :size="16"></Icon>
    <span style="padding-left:10px;">{{ menu.title }}</span>
  </div>
  <Dropdown v-else
            placement="right-start"
            transfer-class-name="sub-menu-shrink-dropdown"
            :stop-propagation="true">
    <div class="menu-item">
      <Icon :size="16"
            :type="menu.meta.icon"></Icon>
      <span style="padding-left:10px;">{{ menu.title }}</span>
    </div>
    <DropdownMenu style="width: 200px;"
                  slot="list">
      <DropdownItem v-for="(item, menu_index) in menu.children"
                    class="single-item"
                    :class="{active: item.fullPath === activeName}"
                    :key="menu_index">
        <SubMenuShrink :menu="item"
                       :activeName="activeName"
                       v-if="!item.meta.hidden"
                       @click="itemClick" />
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
// import path from 'path'
export default {
  name: 'SubMenuShrink',
  props: {
    activeName: {
      type: String,
      default: undefined
    },
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
    itemClick (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-item {
  font-size: 12px;
  line-height: 24px;
}
</style>

<style lang="less">
.sub-menu-shrink-dropdown {
  background-color: @menu-bg-color !important;
  margin-left: 20px !important;
  .ivu-dropdown-item {
    color: @menu-shrink-item-title-color;
    &:hover {
      color: @menu-shrink-item-title-hover-color;
      background: transparent;
    }
    .active {
      background: @menu-shrink-item-active-bg-color;
    }
  }
}
</style>
