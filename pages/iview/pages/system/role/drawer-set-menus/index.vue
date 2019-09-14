<template>
  <Drawer :title="`设置角色菜单权限-${data.name}`"
          :closable="false"
          :mask-closable="false"
          :value="value"
          width="360px">
    <Tree ref="tree"
          :data="menus"
          show-checkbox
          empty-text="暂无数据，请先添加"
          :render="renderContent"
          :check-strictly="true"
          @on-check-change="treeCheckChange"></Tree>
    <Spin size="large"
          fix
          v-if="loading"></Spin>
    <div class="drawer-footer">
      <Button style="margin-right: 8px"
              @click="close">取消</Button>
      <Button type="primary"
              @click="submit">提交</Button>
    </div>
  </Drawer>
</template>

<script>
import * as Service from './service'
export default {
  name: 'DrawerSetMenu',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    // this.getAllMenus()
  },
  data () {
    return {
      loading: false,
      menus: []
    }
  },
  watch: {
    value (value) {
      if (value) {
        this.getAllMenus()
      }
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    /**
     * Tree 渲染函数
     */
    renderContent (h, { root, node, data }) {
      let icon = ''
      if (data.type === 'TopMenu') {
        icon = 'ios-navigate'
      } else if (data.type === 'MenuGroup') {
        icon = 'md-list-box'
      } else if (data.type === 'Menu') {
        icon = 'md-list'
      } else if (data.type === 'Fn') {
        icon = 'md-radio-button-on'
      } else {
        icon = 'md-radio-button-off'
      }
      return h(
        'div',
        {
          style: {
            display: 'inline-block',
            cursor: 'pointer',
            'vertical-align': 'middle'
          }
        },
        [
          h(
            'div',
            {
              style: {
                display: 'flex',
                'align-items': 'center'
              }
            },
            [
              // 图标
              h('Icon', {
                props: {
                  type: icon,
                  size: '16'
                },
                style: {
                  'margin-right': '8px'
                }
              }),
              // 标题
              h(
                'div',
                {
                  style: {
                    flex: 1
                  },
                  on: {
                    click: () => {
                      // this.selectTree(data)
                    }
                  }
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        color: data.highlight ? 'red' : undefined
                      },
                      class: {
                        'ivu-tree-title': true
                        // 'ivu-tree-title-selected': data === this.current
                      }
                    },
                    `${data.title}-${data.id}`
                  )
                ]
              )
            ]
          )
        ]
      )
    },
    /**
     * 调用接口获取所有的菜单
     */
    getAllMenus () {
      this.loading = true
      Service.getAllMenus(this.data.menus).then(result => {
        if (result.isSuccess) {
          this.menus.splice(0, this.menus.length, ...result.data)
        }
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    reloadMenus () {
      this.getAllMenus()
    },
    // ==================================================
    /**
     * 树节点checkbox点击
     */
    treeCheckChange (arr, current) {
      this.setSubMenuCheckedStatus(current, current.checked)
      if (current.checked) {
        current.level.forEach(item => {
          item.checked = true
        })
      }
    },
    /**
     * 设置 子节点 checkbox 状态
     */
    setSubMenuCheckedStatus (item, status) {
      item.checked = status
      if (item.children && item.children.length) {
        item.children.forEach(child => {
          this.setSubMenuCheckedStatus(child, status)
        })
      }
    },
    // ==================================================
    submit () {
      const ids = []
      const checked = this.$refs.tree.getCheckedNodes()
      checked.forEach(item => {
        ids.push(item.id)
      })
      Service.updateRoleMenus({
        id: this.data.id,
        ids
      }).then(result => {
        if (result.isSuccess) {
          this.$Message.success('修改成功')
          this.close()
          this.$emit('success', 'edit')
        } else {
          this.$Message.error(`修改失败,${result.message}`)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
