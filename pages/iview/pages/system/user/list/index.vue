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
                  @click="addUser"
                  icon="md-refresh">添加用户</Button>
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
                   :constants="constants"
                   @success="success" />
    <DrawerSetRoles v-model="drawerSetRoles.show"
                    :data="drawerSetRoles.data"
                    :mode="drawerSetRoles.mode"
                    @success="success" />
  </page-layout>
</template>

<script>
import TableMixin from '@vue-common/mixins/iview/table'
import Filter from './filter'
import Table from './table'
import { getList, deleteUser, setUserEnable } from './service'
import DialogAddEdit from '../dialog-add-edit'
import DrawerSetRoles from '../drawer-set-roles'

export default {
  name: 'SystemUserList',
  mixins: [TableMixin],
  beforeMount () {
    this.table.columns = Table(this)
  },
  mounted () {
    this.FilterConfig = Filter(this)
  },
  components: {
    DialogAddEdit,
    DrawerSetRoles
  },
  data () {
    return {
      Service: {
        getList
      },
      constants: {
        gender: this.$store.state.constants.gender
      },
      dialogAddEdit: {
        show: false,
        data: {}
      },
      drawerSetRoles: {
        show: false,
        data: {}
      }
    }
  },
  computed: {},
  methods: {
    addUser () {
      this.dialogAddEdit.mode = 'add'
      this.dialogAddEdit.show = true
    },
    editUser (data) {
      this.$set(this.dialogAddEdit, 'data', data)
      this.dialogAddEdit.mode = 'edit'
      this.dialogAddEdit.show = true
    },
    deleteUser (data) {
      this.$Modal.confirm({
        title: '删除确认',
        content: `即将删除用户 <span class="text-error">${data.name}（${
          data.userName
        }）</span> 是否继续删除操作?</p>`,
        okText: '确认删除',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          deleteUser(data.id).then(result => {
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
    setRole (data) {
      this.$set(this.drawerSetRoles, 'data', data)
      this.drawerSetRoles.show = true
    },
    changUserEnable (user, enable) {
      setUserEnable({ id: user.id, enable }).then(result => {
        if (result.isSuccess) {
          this.$Message.success('设置成功')
        } else {
          this.$Message.error(`设置失败，${result.message}`)
          user.enable = !enable
        }
      })
    }
  }
}
</script>
