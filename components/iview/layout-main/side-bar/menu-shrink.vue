<template>
  <div class="menu-shrink">
    <template v-for="(category, category_index) in menus">
      <!-- 没有子菜单 -->
      <div class="menu-shrink-item"
           :class="{active: category.fullPath === activeName}"
           :key="category_index"
           @click="itemClick(category)"
           v-if="!category.children && !category.meta.hidden">
        <Icon :type="category.meta.icon"
              :size="16"></Icon>
      </div>
      <!-- 有子菜单 -->
      <!--

                    trigger="custom"
                    visible
           -->
      <Dropdown placement="right-start"
                :key="category_index"
                transfer-class-name="menu-shrink-dropdown"
                :stop-propagation="true"
                v-if="category.children && !category.meta.hidden">
        <div class="menu-shrink-item">
          <Icon :size="16"
                :type="category.meta.icon"></Icon>
        </div>
        <!-- 子菜单 -->
        <DropdownMenu style="width: 200px;"
                      slot="list">
          <template v-for="(item, menu_index) in category.children">

            <DropdownItem :key="menu_index"
                          :class="{active: item.fullPath === activeName}"
                          v-if="!item.meta.hidden">
              <SubMenuShrink :menu="item"
                             :activeName="activeName"
                             :basePath="category.fullPath"
                             @click="itemClick" />
            </DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
    </template>
  </div>
</template>

<script>
import SubMenuShrink from './sub-menu-shrink'
// import path from 'path'
export default {
  name: 'MenuShrink',
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      default: undefined
    }
  },
  components: {
    SubMenuShrink
  },
  created () {
    // this.menus.forEach(menu => {
    //   menu.fullPath = menu.path
    // })
  },
  methods: {
    itemClick (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
.layout-text {
  vertical-align: middle;
  display: inline-block;
}

.menu-shrink {
  // 覆盖
  .ivu-dropdown {
    display: block;
  }
  width: 100%;
  &-item {
    margin: 0 auto;
    height: 52px;
    width: 80px;
    padding: 16px 24px;
    line-height: 20px !important;
    text-align: center;
    cursor: pointer;
    z-index: 1;
    color: @menu-shrink-item-title-color;
    line-height: 24px;
    &.active {
      background: @menu-shrink-item-active-bg-color;
    }
  }
  &-dropdown-item-content {
    height: 24px;
    line-height: 24px;
  }
}
</style>

<style lang="less">
.menu-shrink-dropdown {
  background-color: @menu-bg-color !important;
  margin-left: 5px !important;
  .ivu-dropdown-item {
    color: @menu-shrink-item-title-color;
    &:hover {
      color: @menu-shrink-item-title-hover-color;
      background: transparent;
    }
    &.active {
      color: #fff;
      background: #2d8cf0 !important;
    }
  }
}
</style>
