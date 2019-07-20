<template>
  <div class="side-bar-item">
    <template v-for="menu in menus">
      <template v-if="!menu.hidden">
        <!-- 有子菜单 -->
        <!-- 只有一个下级可显示的菜单 -->
        <template v-if="showMenuGroup(menu) && hasShowableSubMenu(menu) === 1">
          <MenuItem :menus="menu.children" :basePath="resolvePath(menu.path)" :key="resolvePath(menu.path)" :defaultIcon="defaultIcon"/>
        </template>
        <!-- 存在多个下级可显示的菜单  -->
        <template v-if="showMenuGroup(menu) && hasShowableSubMenu(menu) !== 1">
          <el-submenu :key="resolvePath(menu.path)"
                      :index="resolvePath(menu.path)"
                      v-if="showMenuGroup(menu)">
            <template slot="title">
              <icon :icon="menu.meta.icon || defaultIcon"/>
              <span slot="title">{{menu.meta && menu.meta.title}}</span>
            </template>
            <!-- 嵌套菜单 -->
            <template v-if="menu.children">
              <MenuItem :menus="menu.children" :basePath="resolvePath(menu.path)" :defaultIcon="defaultIcon"/>
            </template>
          </el-submenu>
        </template>

        <!-- 没有子菜单 -->
        <template v-if="showMenu(menu)">
          <app-link :to="resolvePath(menu.path)" :key="resolvePath(menu.path)">
            <el-menu-item :key="resolvePath(menu.path)"
                          :index="resolvePath(menu.path)">
              <icon :icon="menu.meta.icon || defaultIcon"/>
              <span slot="title">{{menu.meta && menu.meta.title}}</span>
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </template>
  </div>

</template>

<script>
// import MenuItem from './item'
import path from 'path'
import { isExternal } from '@vue-common/utils'
import AppLink from '@vue-common/components/common/app-link'
export default {
  name: 'MenuItem',
  props: {
    menus: {
      type: Array,
      required: false
    },
    basePath: {
      type: String,
      default: '/'
    },
    defaultIcon: {
      type: String,
      default: 'el-icon-menu'
    }
  },
  components: {
    AppLink
    // MenuItem
  },
  methods: {
    resolvePath (routePath) {
      // let result = path.resolve(this.basePath, routePath)
      // return result
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    hasShowableSubMenu (menu) {
      if (menu.alwaysShow) {
        return 9999
      }
      let menus = menu.children.filter((value) => {
        // 强制隐藏
        if (value.hidden) {
          return false
        }
        // 有子路由
        if (value.children && !value.children.length && !value.alwaysShow) {
          return false
        }
        return true
      })
      return menus.length
    },
    /**
     * 计算是否显示为菜单组
     * 显示条件：
     * 1、存在子路由，且指定为强制显示
     * 2、存在子路由，且下一级路由存在可显示的子路由
     */
    showMenuGroup (menu) {
      return menu.children && ((menu.children.length && this.hasShowableSubMenu(menu)) || menu.alwaysShow)
    },
    /**
     * 计算是否显示为菜单项
     * 显示条件：
     * 1、当没有子路由的时候，显示为菜单项
     */
    showMenu (menu) {
      return !menu.children
    }
  }
}
</script>

<style scoped>
.el-menu-item .svg-icon-box {
    color: #909399;
}

.el-menu-item.is-active .svg-icon-box {
    color: inherit;
}

.side-bar-item .el-submenu [class^=svg-icon],
.side-bar-item .el-menu-item [class^=svg-icon]  {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
}
</style>
