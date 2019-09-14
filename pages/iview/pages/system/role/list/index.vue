<template>
  <page-layout class="page">
    <!-- 搜索 -->
    <ListDataFilter :data="FilterConfig"
                    class="margin-b-10">
      <div class="clear-fix">
        <div class="float-left">
          <Button type="primary"
                  size="small"
                  class="margin-r-5"
                  @click="getList(page.current,true)"
                  icon="md-refresh">刷新</Button>
          <Button type="primary"
                  size="small"
                  class="margin-r-5"
                  @click="addRole"
                  icon="md-refresh">添加角色</Button>
        </div>
        <div class="float-right clear-fix">
        </div>
      </div>
    </ListDataFilter>
    <!-- 表格 -->
    <Table class="margin-b-10"
           stripe
           :highlight-row="false"
           :loading="table.loading"
           :columns="table.columns"
           :data="table.data"
           ref="currentRowTable" />
    <!-- 翻页 -->
    <div class="margin-b-10 text-center">
      <Page :page-size-opts="pagination.pageSizeOpts"
            :total="pagination.total"
            :page-size="pagination.size"
            :current="pagination.current"
            show-elevator
            show-total
            show-sizer
            placement="top"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange" />
    </div>
    <!-- 添加修改对话框 -->
    <DialogAddEdit v-model="dialogAddEdit.show"
                   :data="dialogAddEdit.data"
                   :mode="dialogAddEdit.mode"
                   @success="success" />
    <DrawerSetMenus v-model="drawerSetMenus.show"
                    :data="drawerSetMenus.data"
                    :mode="drawerSetMenus.mode"
                    @success="success" />
  </page-layout>
</template>

<script>
import TableMixin from '@vue-common/mixins/iview/table'
import Filter from './filter'
import Table from './table'
import DialogAddEdit from '../dialog-add-edit'
import DrawerSetMenus from '../drawer-set-menus'

export default {
  name: 'SystemRoleListCommon',
  mixins: [TableMixin],
  props: {
    Service: {
      type: Object,
      require: true
    }
  },
  beforeMount () {
    this.table.columns = Table(this)
  },
  mounted () {
    this.FilterConfig = Filter(this)
  },
  components: {
    DialogAddEdit,
    DrawerSetMenus
  },
  data () {
    return {
      constants: {},
      dialogAddEdit: {
        show: false,
        data: {}
      },
      drawerSetMenus: {
        show: false,
        data: {}
      }
    }
  },
  computed: {},
  methods: {
    addRole () {
      this.dialogAddEdit.mode = 'add'
      this.dialogAddEdit.show = true
    },
    editRole (data) {
      this.$set(this.dialogAddEdit, 'data', data)
      this.dialogAddEdit.mode = 'edit'
      this.dialogAddEdit.show = true
    },
    deleteRole (data) {
      this.$Modal.confirm({
        title: '删除确认',
        content: `即将删除角色 <span class="text-error">${
          data.name
        }</span> 是否继续删除操作?</p>`,
        okText: '确认删除',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          this.Service.deleteRole(data.id).then(result => {
            if (result.isSuccess) {
              this.getList(this.pagination.current)
              this.$Notice.success({
                title: '删除失败'
              })
            } else {
              this.$Notice.error({
                title: '删除失败',
                desc: result.message
              })
            }
            this.$Modal.remove()
          })
        }
      })
    },
    setStatus (data) {
      Object.assign(this.statusDialog.data, data)
      this.statusDialog.instant = data
      this.statusDialog.show = true
    },
    setMenus (data) {
      this.$set(this.drawerSetMenus, 'data', data)
      this.drawerSetMenus.show = true
    }
  }
}
</script>
