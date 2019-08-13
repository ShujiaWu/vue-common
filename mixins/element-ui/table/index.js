import PaginationMixin from '../pagination'
import ListDataFilterMixin from '../list-data-filter'
export default {
  mixins: [PaginationMixin, ListDataFilterMixin],
  created () {
    this.init()
  },
  data () {
    return {
      Service: null,
      table: {
        loading: false,
        data: []
      },
      sort: {},
      KeyMap: {}, // 映射关系
      page: {
        name: this.$route.name, // 页面名称
        hash: undefined, // 页面Hash值
        params: {},
        query: {}
      }
    }
  },
  methods: {
    init () {
      this.getList()
    },
    refresh () {
      this.getList(this.pagination.current, true, '刷新成功')
    },
    /**
     * 获取列表
     * @param {Number} page 目标页数，不传取第一页
     * @param {*} showMsg 接口调用成功是否显示提示信息
     * @param {*} msg 接口调用成功后的提示信息
     */
    getList (page, showMsg = false, msg = '刷新成功') {
      this.table.loading = true
      this.Service.getList({
        page: {
          page: page,
          size: this.pagination.size
        },
        filter: this.filter, // 过滤器
        sort: this.sort, // 排序
        params: this.page.params, // 附加参数
        query: this.page.query // 附加参数
      }).then(result => {
        this.table.loading = false
        if (result.isSuccess) {
          // 数据
          this.table.data.splice(0, this.table.data.length, ...result.data.list)
          // 分页
          Object.assign(this.pagination, result.data.pagination)
          // 映射关系
          if (result.data.KeyMap && result.data.KeyMap instanceof Object) {
            for (const key in result.data.KeyMap) {
              if (result.data.KeyMap.hasOwnProperty(key)) {
                this.KeyMap[key] = result.data.KeyMap[key]
              }
            }
          }
          if (showMsg) {
            this.$message.success(msg)
          }
        } else {
          this.$message.error(`获取数据失败,${result.message}`)
        }
      })
    },
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
          this.getList(this.pagination.current)
          break
        default:
          this.getList(1)
      }
    }
  }
}
