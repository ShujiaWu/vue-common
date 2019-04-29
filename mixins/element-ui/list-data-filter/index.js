
import ListDataFilter from '@vue-common/components/element-ui/list-data-filter'
export default {
  components: {
    'list-data-filter': ListDataFilter
  },
  data () {
    return {
      filter: {}
    }
  },
  methods: {
    /**
     * ===========================================================
     * 搜索
     * ===========================================================
     */
    search (data) {
      Object.assign(this.filter, data)
      this.getList(1, true, '查询成功')
    },
    /**
     * ===========================================================
     * 重置搜索
     * ===========================================================
     */
    resetSearch () {
      this.$set(this, 'filter', {})
      this.getList(1)
    },
    /**
     * 重新加载数据的方法
     */
    reloadData () {
      (this.filter &&
        this.filter.buttons &&
        this.filter.buttons.resetSearch &&
        this.filter.buttons.resetSearch.method &&
        this.filter.buttons.resetSearch.method()) || this.getList()
    }
  }
}
