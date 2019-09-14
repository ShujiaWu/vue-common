<template>
  <page-layout full-page>
    <div class="system-menus">
      <div class="operation">
        <!-- 顶部操作区 -->
        <Button icon="md-add"
                :loading="form.loading"
                @click="addTopMenu">添加顶部菜单</Button>
        <Button icon="md-trash"
                @click="removeAllCheckedItem"
                :loading="form.loading">批量删除</Button>
        <Dropdown>
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh"
                          @click.native="reloadMenus">刷新</DropdownItem>
            <DropdownItem name="expandOne">收合所有</DropdownItem>
            <DropdownItem name="expandTwo">仅展开一级</DropdownItem>
            <DropdownItem name="expandThree">仅展开两级</DropdownItem>
            <DropdownItem name="expandAll">展开所有</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="main">
        <!-- 核心业务区 -->
        <div class="main-box">
          <Row style="height:100%"
               :gutter="20">
            <i-col span="9"
                   class="main-box-col">
              <!-- 提示区域 -->
              <div class="header">
                <Alert show-icon>
                  <template v-if="current">
                    <span>当前选择编辑：</span>
                    <span class="select-title">{{current.title}}</span>
                    <a class="margin-l-20"
                       @click="cancelSelectTree">取消选择</a>
                  </template>
                  <template v-else>
                    <span>请点击菜单进行相关操作。</span>
                  </template>
                </Alert>
                <Input suffix="ios-search"
                       placeholder="输入菜单名搜索"
                       @on-change="search"
                       v-model="keyword"
                       clearable />
              </div>
              <!-- 菜单树 -->
              <div class="tree-area">
                <div class="tree-area-box">
                  <div style="max-height:100%;overflow:auto;position:relative">
                    <Tree ref="tree"
                          :data="data"
                          show-checkbox
                          empty-text="暂无数据，请先添加"
                          :render="renderContent"
                          :check-strictly="true"
                          @on-check-change="treeCheckChange"></Tree>
                    <div style="top:0;left:0;right:0;bottom:0;position: absolute;cursor: not-allowed;"
                         v-if="form.loading"></div>
                  </div>
                  <Spin size="large"
                        fix
                        v-if="loading"></Spin>
                </div>
              </div>
            </i-col>
            <!-- 表单 -->
            <i-col span="15">
              <Alert :type="`${mode==='edit'?'warning': 'info'}`">
                <span v-if="mode==='edit'">当前进行的是编辑操作!</span>
                <span v-if="mode==='add'">当前进行的是新增操作!</span>
                <span class="margin-l-10 margin-r-10">当前位置:</span>
                <Breadcrumb style="display:inline;font-size: 12px;">
                  <template v-if="current">
                    <BreadcrumbItem v-for="(item, index) in current.level"
                                    :key="index">
                      <Icon :type="item.icon"
                            v-if="item.icon" />
                      <template v-else>
                        <Icon type="ios-navigate"
                              v-if="item.type==='TopMenu'" />
                        <Icon type="md-list-box"
                              v-else-if="item.type==='MenuGroup'" />
                        <Icon type="md-list"
                              v-else-if="item.type==='Menu'" />
                        <Icon type="md-radio-button-on"
                              v-else-if="item.type==='Fn'" />
                        <Icon type="md-radio-button-off"
                              v-else />
                      </template>
                      <span>{{item.title}}</span>
                    </BreadcrumbItem>
                  </template>
                  <BreadcrumbItem>
                    <Icon type="md-add" />
                    <span>新增</span>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Alert>
              <Form ref="form"
                    :model="form.data"
                    :rules="form.rule"
                    :label-width="120">
                <!-- 类型 -->
                <Form-item label="类型："
                           prop="title">
                  <div v-if="form.data.type==='TopMenu'">
                    顶部菜单
                  </div>
                  <div v-if="form.data.type==='MenuGroup'">
                    菜单组
                  </div>
                  <div v-if="form.data.type==='Menu'">
                    菜单
                  </div>
                  <div v-if="form.data.type==='Fn'">
                    功能
                  </div>
                </Form-item>
                <!-- 标题 -->
                <Form-item label="中文标题："
                           prop="title"
                           key="title"
                           v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu','Fn'])">
                  <i-input v-model="form.data.title"
                           key="title"
                           placeholder="组件标题，会展示在浏览器标题（中文）">
                  </i-input>
                </Form-item>
                <!-- 标题（En） -->
                <Form-item label="英文标题："
                           prop="titleEn"
                           key="titleEn"
                           v-if="isShowField(form.data.type, ['TopMenu'])">
                  <i-input v-model="form.data.titleEn"
                           key="titleEn"
                           placeholder="组件标题，会展示在浏览器标题（英文）">
                  </i-input>
                </Form-item>
                <!-- 路径 -->
                <Form-item label="路径："
                           prop="path"
                           key="path"
                           v-if="isShowField(form.data.type, ['MenuGroup', 'Menu'])">
                  <i-input v-model="form.data.path"
                           key="path"
                           placeholder="地址栏中的地址路径">
                  </i-input>
                </Form-item>
                <!-- 路径 -->
                <Form-item label="重定向："
                           prop="path"
                           key="redirect-path"
                           v-if="isShowField(form.data.type, ['TopMenu'])">
                  <i-input v-model="form.data.path"
                           key="path"
                           placeholder="重定向完整路径">
                  </i-input>
                </Form-item>
                <!-- 权限类型 -->
                <Form-item label="权限类型："
                           prop="fnType"
                           key="fnType"
                           v-if="isShowField(form.data.type, ['Fn'])">
                  <i-input v-model="form.data.fnType"
                           key="fnType"
                           placeholder="权限类型">
                  </i-input>
                </Form-item>
                <!-- 接口路径 -->
                <Form-item label="接口路径："
                           prop="path"
                           key="api-path"
                           v-if="isShowField(form.data.type, ['Fn'])">
                  <i-input v-model="form.data.path"
                           key="api-path"
                           placeholder="接口请求的路径地址">
                  </i-input>
                </Form-item>
                <!-- 图标 -->
                <Form-item label="图标："
                           prop="icon"
                           key="icon"
                           v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu'])">
                  <IconChoose v-model="form.data.icon"
                              key="icon"
                              placeholder="组件图标" />
                  <!-- <i-input v-model="form.data.icon"
                           key="icon"
                           placeholder="组件图标">
                  </i-input> -->
                </Form-item>
                <!-- 名称 -->
                <Form-item label="组件名称："
                           prop="name"
                           key="name"
                           v-if="isShowField(form.data.type, ['MenuGroup','Menu'])">
                  <i-input v-model="form.data.name"
                           key="name"
                           placeholder="组件名称，唯一">
                  </i-input>
                </Form-item>
                <!-- 组件路径 -->
                <Form-item label="组件路径："
                           prop="component"
                           key="component"
                           v-if="isShowField(form.data.type, ['MenuGroup','Menu'])">
                  <i-input v-model="form.data.component"
                           key="component"
                           placeholder="前端组件路径">
                  </i-input>
                </Form-item>
                <!-- 第三方页面地址 -->
                <Form-item label="第三方页面地址："
                           prop="url"
                           key="url"
                           v-if="isShowField(form.data.type, ['Menu'])">
                  <i-input v-model="form.data.url"
                           key="url"
                           placeholder="第三方页面地址，http(s)://...">
                  </i-input>
                </Form-item>
                <!-- 排序 -->
                <Form-item label="排序："
                           prop="sortOrder"
                           key="sortOrder"
                           v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu','Fn'])">
                  <i-input v-model="form.data.sortOrder"
                           key="sortOrder"
                           placeholder="排序">
                  </i-input>
                </Form-item>
                <!-- 是否启用 -->
                <FormItem label="是否启用："
                          prop="enable"
                          key="enable"
                          v-if="isShowField(form.data.type, ['TopMenu','MenuGroup','Menu','Fn'])">
                  <i-switch size="large"
                            v-model="form.data.enable"
                            key="enable"
                            :true-value="true"
                            :false-value="false">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                  </i-switch>
                </FormItem>
                <!-- 是否一直显示 -->
                <FormItem label="强制显示："
                          prop="showAlways"
                          key="showAlways"
                          v-if="isShowField(form.data.type, ['MenuGroup'])">
                  <i-switch size="large"
                            v-model="form.data.showAlways"
                            key="showAlways"
                            :true-value="true"
                            :false-value="false">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                  </i-switch>
                </FormItem>
                <!-- 是否隐藏 -->
                <FormItem label="强制隐藏："
                          prop="hidden"
                          key="hidden"
                          v-if="isShowField(form.data.type, ['MenuGroup','Menu'])">
                  <i-switch size="large"
                            v-model="form.data.hidden"
                            key="hidden"
                            :true-value="false"
                            :false-value="true">
                    <span slot="open">显示</span>
                    <span slot="close">隐藏</span>
                  </i-switch>
                </FormItem>
                <Form-item>
                  <!-- 添加按钮 -->
                  <Button type="primary"
                          :loading="form.loading"
                          @click="submitAddMenu"
                          v-if="mode==='add'">添加</Button>
                  <!-- 修改按钮 -->
                  <Button :loading="form.loading"
                          v-if="mode==='edit'"
                          @click="updateMenu"
                          type="primary">提交修改</Button>
                </Form-item>
              </Form>
            </i-col>
          </Row>
        </div>
      </div>
      <!-- 添加类型选择 -->
      <DialogAddTypeSelect v-model="dialogAddType.show"
                           @select="selectAddType" />
    </div>
  </page-layout>
</template>

<script>
import Form from './form'
import DialogAddTypeSelect from './dialog-add-type-select'
import IconChoose from '../../../../../components/iview/icon-choose'
// import * as Service from './service'
export default {
  name: 'SystemMenuCommon',
  components: {
    DialogAddTypeSelect,
    IconChoose
  },
  props: {
    Service: {
      type: Object,
      required: true
    }
  },
  created () {
    this.getAllMenus()
  },
  data () {
    return {
      constants: [],
      form: Form(),
      mode: 'add',
      data: [],
      originalData: [],
      strict: false,
      loading: false,
      current: null,
      keyword: '',
      dialogAddType: {
        show: false
      }
    }
  },
  methods: {
    /**
     * 判断输入是否显示
     */
    isShowField (type, types) {
      return types.includes(type)
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
            width: 'calc(100% - 42px)',
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
                      this.selectTree(data)
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
                        'ivu-tree-title': true,
                        'ivu-tree-title-selected': data === this.current
                      }
                    },
                    `${data.title}-${data.id}`
                  )
                ]
              ),
              // 按钮
              h(
                'span',
                {
                  style: {
                    display: 'inline-block'
                    // float: 'right'
                  }
                },
                [
                  // 添加
                  h('Button', {
                    props: {
                      icon: 'ios-add',
                      type: 'default',
                      size: 'small',
                      disabled: data.type === 'Fn'
                    },
                    style: {
                      marginRight: '8px'
                    },
                    on: {
                      click: () => {
                        this.addMenu(data)
                      }
                    }
                  }),
                  // 移除
                  h('Button', {
                    props: {
                      icon: 'ios-remove',
                      type: 'default',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.removeItem(data)
                      }
                    }
                  })
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
      this.Service.getAllMenus().then(result => {
        if (result.isSuccess) {
          this.data.splice(0, this.data.length, ...result.data)
          this.originalData.splice(0, this.originalData.length, ...result.data)
        }
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    /**
     * 选择菜单
     */
    selectTree (data) {
      Object.assign(this.form.data, {
        id: data.id, // ID
        parentId: data.parentId, // 父级ID
        title: data.title, // 标题
        titleEn: data.titleEn, // 标题(En)
        name: data.name, // 名称
        icon: data.icon, // 图标
        path: data.path, // 路径
        url: data.url, // 第三方页面地址
        component: data.component, // 组件路径
        sortOrder: data.sortOrder,
        showAlways: data.showAlways, // 是否一直显示
        fnType: data.fnType, // 功能类型
        enable: data.enable, // 状态
        type: data.type, // 类型
        hidden: data.hidden // 隐藏
      })
      this.current = data
      this.mode = 'edit'
    },
    cancelSelectTree () {
      this.current = null
      // 切换至添加顶部菜单
      this.addTopMenu()
    },
    // ==================================================
    /**
     * 获取当前节点及子节点的id
     */
    getItemAllIds (data) {
      const ids = []
      ids.push(data.id)
      if (data.children && data.children.length) {
        data.children.forEach(child => {
          ids.push(...this.getItemAllIds(child))
        })
      }

      return ids
    },
    /**
     * 删除
     */
    removeItem (data) {
      const ids = this.getItemAllIds(data)
      this.$Modal.confirm({
        title: '删除确认',
        content: `<p>本次共计删除 <span class="text-error">${
          ids.length
        }</span> 个节点，<br>是否继续删除操作?</p>`,
        okText: '确认删除',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          this.Service.removeMenu(ids).then(result => {
            if (result.isSuccess) {
              const parent = data.parent
              if (parent) {
                const pos = parent.children.indexOf(data)
                parent.children.splice(pos, 1)
              } else {
                const pos = this.data.indexOf(data)
                this.data.splice(pos, 1)
              }
              this.current = null
              this.$refs.form.resetFields()
              this.form.resetData()
              this.$Message.success('删除成功')
            } else {
              this.$Message.error(`删除失败，${result.message}`)
            }
            this.$Modal.remove()
          })
        }
      })
    },
    // ==================================================
    /**
     * 搜索
     */
    search () {
      this.loading = true
      this.data.splice(
        0,
        this.data.length,
        ...this.Service.filterMenu(this.keyword)
      )
      this.loading = false
    },
    /**
     * 添加顶部菜单
     */
    addTopMenu () {
      this.mode = 'add'
      this.current = undefined
      this.$refs.form.resetFields()
      this.form.resetData({
        type: 'TopMenu'
      })
      // this.form.data.type = 'TopMenu'
    },
    // 添加菜单
    addMenu (data) {
      // 判断是否可以继续添加
      if (data.type === 'Fn') {
        // 已经是功能点了，不能继续添加
        this.$Message.info('单前节点为功能点，无法继续添加')
        return
      }
      // 当前节点没有子节点， 可以添加菜单或者功能点
      if (!data.children || data.children.length === 0) {
        if (data.type === 'TopMenu') {
          // 顶部菜单只能添加菜单
          this.mode = 'add'
          this.current = data
          this.$refs.form.resetFields()
          this.form.resetData({
            type: 'Menu',
            parentId: this.current.id
          })
          return
        }
        // 弹框选择
        this.selectTree(data)
        this.dialogAddType.show = true
        return
      }
      // 当前节点有子节点
      if (
        data.children.some(value => {
          return value.type === 'Fn'
        })
      ) {
        // 当前节点有子节点，且子节点中包含 功能点 ，则只能添加功能点
        this.mode = 'add'
        this.current = data
        this.$refs.form.resetFields()
        this.form.resetData({
          type: 'Fn',
          parentId: this.current.id
        })
        return
      }
      // 只能添加 菜单的情况
      this.mode = 'add'
      this.current = data
      this.$refs.form.resetFields()
      this.form.resetData({
        type: 'Menu',
        parentId: this.current.id
      })
    },
    /**
     * 提交添加菜单
     */
    submitAddMenu () {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.form.loading = true
          this.Service.addMenu(this.form.data).then(result => {
            this.form.loading = false
            if (result.isSuccess) {
              const item = Object.assign({}, this.form.data, result.data)
              if (!this.current) {
                // 没有父级
                console.log('没有父级')
                item.level = [item]
                this.data.push(item)
              } else {
                // 有父级
                console.log('有父级')
                item.level = this.current.level.concat([item])
                item.parent = this.current
                if (!this.current.children) {
                  this.$set(this.current, 'children', [])
                }
                if (item.type === 'Menu' && this.current.type === 'Menu') {
                  this.current.type = 'MenuGroup'
                }
                this.current.children.push(item)
              }
              this.$Message.success('添加成功')
              // 重置表单
              this.$refs.form.resetFields()
              this.form.resetData({
                parentId: this.current.id,
                type: item.type
              })
            } else {
              this.$Message.error(`添加失败，${result.message}`)
            }
            console.log(result)
          })
        } else {
          this.$Message.error('请检查输入')
        }
      })
    },
    /**
     * 选择添加的类型
     */
    selectAddType (type) {
      this.mode = 'add'
      this.$refs.form.resetFields()
      this.form.resetData({
        parentId: this.current.id
      })
      switch (type) {
        case 'Menu':
          this.form.data.type = 'Menu'
          break
        case 'Fn':
          this.form.data.type = 'Fn'
          break
      }
    },
    // ==================================================
    /**
     * 树节点checkbox点击
     */
    treeCheckChange (arr, current) {
      this.setSubMenuCheckedStatus(current, current.checked)
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
    /**
     * 删除选中的菜单
     */
    removeAllCheckedItem () {
      let ids = {}
      const checked = this.$refs.tree.getCheckedNodes()
      checked.forEach(item => {
        ids[item.id] = true
        if (item.children && item.children.length) {
          const sIds = this.getSubItemOfCheckedItem(item)
          sIds.forEach(el => {
            ids[el] = true
          })
        }
      })
      ids = Object.keys(ids)

      this.$Modal.confirm({
        title: '删除确认',
        content: `<p>当前选中 <span class="text-error">${
          checked.length
        }</span> 个节点，共计删除 <span class="text-error">${
          ids.length
        }</span> 个选中及附属节点，是否继续删除操作?</p>`,
        okText: '确认删除',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          this.Service.removeMenu(ids).then(result => {
            if (result.isSuccess) {
              this.getAllMenus()
              this.current = null
              this.$refs.form.resetFields()
              this.form.resetData()
              this.$Message.success('删除成功')
            } else {
              this.$Message.error(`删除失败，${result.message}`)
            }
            this.$Modal.remove()
          })
        }
      })
    },
    /**
     * 获取 选中的菜单的子节点
     */
    getSubItemOfCheckedItem (item) {
      const ids = []
      if (item.children && item.children.length) {
        item.children.forEach(child => {
          ids.push(child.id)
          ids.push(...this.getSubItemOfCheckedItem(child))
        })
      } else {
        ids.push(item.id)
      }
      return ids
    },
    // ==================================================
    /**
     * 更新菜单
     */
    updateMenu () {
      this.form.loading = true
      this.Service.updateMenu(this.form.data).then(result => {
        this.form.loading = false
        if (result.isSuccess) {
          Object.assign(this.current, this.form.data)
          this.$Message.success('更新成功')
        } else {
          this.$Message.success('更新失败')
        }
      })
    },
    reloadMenus () {
      this.getAllMenus()
      this.current = null
      this.$refs.form.resetFields()
      this.form.resetData()
    }
  }
}
</script>

<style lang="less" scoped>
.system-menus {
  height: 100%;
  display: flex;
  flex-direction: column;
  .operation {
    margin-bottom: 10px;
  }
  .main {
    flex: 1;
    position: relative;
    &-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
      &-col {
        height: 100%;
        display: flex;
        flex-direction: column;
        .tree-area {
          flex: 1;
          position: relative;
          &-box {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.system-menus {
  .ivu-tree-empty {
    text-align: center;
    padding: 40px 0;
  }
}
</style>
