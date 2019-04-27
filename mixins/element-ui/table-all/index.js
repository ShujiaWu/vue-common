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
      params: {}
    }
  },
  methods: {
    init () {
      this.getList()
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
          size: this.page.size
        },
        filter: this.filter, // 过滤器
        sort: this.sort, // 排序
        params: {} // 附加参数
      }).then(result => {
        this.table.loading = false
        if (result.isSuccess) {
          this.table.data.splice(0, this.table.data.length, ...result.data.list)
          Object.assign(this.page, result.data.page)
          if (showMsg) {
            this.$message.success(msg)
          }
        } else {
          this.$message.error(`获取数据失败,${result.message}`)
        }
      })
    }
  }
}
