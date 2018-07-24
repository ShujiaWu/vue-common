import ListDataFilter from '@vue-common/components/list-data-filter'
export default {
  components: {
    ListDataFilter
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  data () {
    return {
      // 查询
      filter: undefined,
      filterData: {}
    }
  },
  methods: {
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
    }
  }
}
