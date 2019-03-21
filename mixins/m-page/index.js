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
    }
  }
}
