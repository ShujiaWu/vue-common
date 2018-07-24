<template>
  <nav class="main-menu" :class="{shrink: shrink}">
    <!-- 正常模式 -->
    <template v-if="!shrink">
      <Menu :open-names="openNames" :active-name="activeName" v-if="menus.length" width="230px" :accordion="true" theme="dark">
        <template v-for="(category, category_index) in menus">
          <!-- 没有子菜单 -->
          <Menu-item :name="category.target.url" @click.native="menuItemClick(category)" :key="category_index" v-if="!category.menus || (category.menus.length === 0 && category.target && category.target.url)">
            <Icon :type="category.icon"></Icon><span class="layout-text">{{category.name}}</span>
          </Menu-item>
          <!-- 有子菜单 -->
          <Submenu :key="category_index" :name="category.name" v-else>
            <template slot="title">
              <Icon :type="category.icon" ></Icon><span class="layout-text">{{category.name}}</span>
            </template>
            <Menu-item v-for="(item, menu_index) in category.menus" :key="menu_index" :name="item.target.url" @click.native="menuItemClick(item)">
              <Icon :type="item.icon"></Icon><span class="layout-text">{{item.name}}</span>
            </Menu-item>
          </Submenu>
        </template>
        <!-- <Submenu v-for="(category, category_index) in menus" :key="category_index" :name="category.name">
          <template slot="title">
            <Icon :type="category.icon" ></Icon>{{category.name}}
          </template>
          <Menu-item v-for="(item, menu_index) in category.menus" :key="menu_index" :name="item.target.url" @click.native="menuItemClick(item)" style="overflow:hidden">
            <Icon :type="item.icon"></Icon>{{item.name}}
          </Menu-item>
        </Submenu> -->
      </Menu>
    </template>
    <!-- 缩小模式 -->
    <template v-else>
      <div style="width:60px;">
        <template v-for="(category, category_index) in menus">
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" @click.native="menuItemClick(category)" :key="category_index" v-if="!category.menus || (category.menus.length === 0 && category.menus.target && category.menus.target.url)">
            <Icon :size="20" color="#FFF" :type="category.icon"></Icon>
          </Button>
          <Dropdown transfer placement="right-start" :key="category_index" style="display:inline-block;" v-else>
            <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
              <Icon :size="20" color="#FFF" :type="category.icon"></Icon>
            </Button>
            <DropdownMenu style="width: 200px;" slot="list">
              <DropdownItem v-for="(item, menu_index) in category.menus" :key="menu_index" @click.native="menuItemClick(item)"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ item.name }}</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </div>
      <!-- <Dropdown transfer placement="right-start" v-for="(category, category_index) in menus" :key="category_index" style="display:inline-block;">
        <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
          <Icon :size="20" color="#FFF" :type="category.icon"></Icon>
        </Button>
        <DropdownMenu style="width: 200px;" slot="list">
          <DropdownItem v-for="(item, menu_index) in category.menus" :key="menu_index" @click.native="menuItemClick(item)"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ item.name }}</span></DropdownItem>
        </DropdownMenu>
      </Dropdown> -->
    </template>
  </nav>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      required: true,
      default: () => []
    },
    map: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  beforeMount () {
    // 形成‘菜单-菜单组’的映射
    // this.menus.forEach((element) => {
    //   let category = element.name
    //   element.menus.forEach(element => {
    //     this.map[element.target.url] = category
    //   }, this)
    // }, this)
  },
  data () {
    return {
      // menus: [ // 菜单列表
      //   {
      //     name: '菜单组',
      //     id: '0',
      //     icon: 'ios-paper',
      //     menus: [
      //       {
      //         name: '子菜单',
      //         id: '0-1',
      //         icon: '',
      //         target: {
      //           type: 'ROUTE',
      //           url: 'WebConsoleMsgReview',
      //           replace: false
      //         }
      //       }
      //     ]
      //   }
      // ],
      // map: { // 菜单与菜单组的映射关系
      //   // MenuName: '菜单名'
      // }
    }
  },
  computed: {
    /**
     * 激活的菜单名
     */
    activeName () {
      return this.$store.state.page.breadcurmb[this.$store.state.page.breadcurmb.length - 1].name
    },
    /**
     * 展开的菜单组名
     */
    openNames () {
      return [this.map[this.activeName]]
    }
  },
  methods: {
    menuItemClick (item) {
      switch (item.target.type) {
        case 'LINK':
          if (item.target.newWindow) {
            window.open(item.target.url)
            return
          }
          if (item.target.replace) {
            location.replace(item.target.url)
          } else {
            location.href = item.target.url
          }
          break
        case 'ROUTE':
          let target = {
            name: item.target.url,
            params: item.target.params,
            query: item.target.query
          }
          if (item.target.replace) {
            this.$router.replace(target)
          } else {
            this.$router.push(target)
          }
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
  .main-menu {
    display: inline-block;
    width: 250px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .main-menu.shrink {
    width: 80px;
    height: 100%;
    overflow-y: auto;

    .layout-text {
      display: inline-block;
      white-space: nowrap;
      position: absolute;
    }
  }
</style>
