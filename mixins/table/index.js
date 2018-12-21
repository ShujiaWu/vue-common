import ListDataFilter from '@vue-common/components/list-data-filter'
import PermissionMixin from '@vue-common/mixins/permission'
// import Service from './service'
import md5 from 'md5'
export default {
  mixins: [PermissionMixin],
  components: {
    ListDataFilter
  },
  created () {

  },
  beforeMount () {
    this.getList()
  },
  mounted () {
    let hash = `${this.$route.name}-${JSON.stringify(this.$route.params)}-${JSON.stringify(this.$route.query)}`
    this.pageHash = md5(hash)
  },
  activated () {
    this.reactived()
    let hash = `${this.$route.name}-${JSON.stringify(this.$route.params)}-${JSON.stringify(this.$route.query)}`
    this.pageHash = hash = md5(hash)
    let data = this.$SessionStorage.get(this.pageName)
    if (data !== this.pageHash) {
      (this.filter &&
        this.filter.buttons &&
        this.filter.buttons.resetSearch &&
        this.filter.buttons.resetSearch.method &&
        this.filter.buttons.resetSearch.method()) || this.getList()
    }
    this.$SessionStorage.delete(this.pageName)
  },
  deactivated () {
    this.$SessionStorage.set(this.pageName, this.pageHash)
  },
  data () {
    return {
      pageName: this.$route.name,
      pageHash: undefined,
      // 用户页面权限
      table: {
        // 表格结构
        columns: undefined,
        // 表格数据
        data: [],
        loading: false,
        currentRow: null
      },
      // 分页数据
      page: {
        pageSizeOpts: [10, 20, 30, 40],
        total: 0, // 数据量
        current: 1, // 当前页数
        size: 20, // 页面数据量
        pages: 1 // 总共页数
      },
      // 查询
      filter: undefined,
      filterData: {},
      apiAppendData: {}
    }
  },
  methods: {
    /**
     * ===========================================================
     * 页面重新激活
     * ===========================================================
     */
    reactived () {
    },
    /**
     * ===========================================================
     * 获取列表数据
     * ===========================================================
     */
    getList (page) {
      this.table.loading = true
      this.Service.getList({
        page: page,
        size: this.page.size
      }, this.filterData, this.apiAppendData).then(result => {
        this.table.loading = false
        if (result.isSuccess) {
          this.table.currentRow = null
          this.table.data = result.data.list
          Object.assign(this.page, result.data.page)
          if (arguments[1]) {
            this.$Message.success(arguments[2] ? arguments[2] : '刷新成功')
          }
        } else {
          this.$Notice.error({
            title: '获取数据失败',
            desc: result.message
          })
        }
      })
    },
    /**
     * ===========================================================
     * 搜索
     * ===========================================================
     */
    search (data) {
      Object.assign(this.filterData, data)
      this.getList(1, true, '查询成功')
    },
    /**
     * ===========================================================
     * 重置搜索
     * ===========================================================
     */
    resetSearch () {
      this.$set(this, 'filterData', {})
      this.getList(1)
    },
    /**
     * ===========================================================
     * 翻页
     * ===========================================================
     */
    pageChange (page) {
      this.getList(page)
    },
    /**
     * ===========================================================
     * 页面容量发生改变
     * ===========================================================
     */
    pageSizeChange (pageSize) {
      // 新的页面容量 >= 旧的页面容量
      if (this.page.current === 1) {
        // 当前处在第一页
        if (pageSize < this.page.size) {
          // 新的页面容量 < 旧的页面容量
          this.page.size = pageSize
          this.table.data.splice(0, this.table.data.length, ...this.table.data.splice(
            0, Math.min(this.page.size, this.page.total)))
          // this.getList(this.page.current)
          return
        }
        if (this.page.total > this.page.size) {
          // 总数据量 > 旧的页面容量
          this.page.size = pageSize
          this.getList(1)
        } else {
          // 总数据量 <= 旧的页面容量
          this.page.size = pageSize
        }
      } else {
        // 不是处在第一页，如果处在当前页是否会有数据
        if (pageSize * (this.page.current - 1) > this.page.total) {
          // 当前页的前一页的数据量 > 总数据量
          // 计算最后一页
          let targetPage = parseInt(this.page.total / pageSize) + 1
          this.page.size = pageSize
          this.getList(targetPage)
        } else {
          this.page.size = pageSize
          this.getList(this.page.current)
        }
      }
    },
    /**
     * ===========================================================
     * 表格单项选中
     * ===========================================================
     */
    // tableSingleSelect (currentRow, oldCurrentRow) {
    //   // console.log(currentRow, oldCurrentRow)
    //   this.table.currentRow = currentRow
    // },
    /**
     * ===========================================================
     * 当前行点击事件
     * ===========================================================
     */
    rowClick (index) {
      if (!this.table.currentRow) {
        this.table.currentRow = index
      } else {
        if (this.table.currentRow.id === index.id) {
          this.$refs.currentRowTable.clearCurrentRow()
          this.table.currentRow = undefined
        } else {
          this.table.currentRow = index
        }
      }
    },
    /**
     * ===========================================================
     * 添加
     * ===========================================================
     */
    add () {},
    /**
     * ===========================================================
     * 修改
     * ===========================================================
     */
    modify () {},
    /**
     * ===========================================================
     * 删除
     * ===========================================================
     */
    delete () {},
    /**
     * ===========================================================
     * 添加、修改成功后刷新列表
     * ===========================================================
     */
    success (type) {
      switch (type) {
        case 'add':
        case 'renew':
          this.getList(1)
          break
        case 'edit':
        case 'reload':
          this.getList(this.page.current)
          break
        default:
          this.getList(1)
      }
    }
  }
}
