export default {
  data () {
    return {
      // 分页数据
      page: {
        pageSizeOpts: [10, 20, 30, 40],
        total: 0, // 数据量
        current: 1, // 当前页数
        size: 20, // 页面数据量
        pages: 1 // 总共页数
      },
      loading: false,
      apiAppendData: {}
    }
  },
  computed: {
    finished () {
      return this.page.current === this.page.pages
    }
  },
  methods: {
    /**
     * ===========================================================
     * 获取列表数据
     * ===========================================================
     */
    getList (page) {
      this.loading = true
      this.Service.getList(
        {
          page: page,
          size: this.page.size
        },
        this.apiAppendData
      ).then(result => {
        if (result.isSuccess) {
          this.list.splice(this.list.length, 0, ...result.data.list)
          Object.assign(this.page, result.data.page)
        }
        this.loading = false
      })
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
          this.table.data.splice(
            0,
            this.table.data.length,
            ...this.table.data.splice(
              0,
              Math.min(this.page.size, this.page.total)
            )
          )
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
    }
  }
}
