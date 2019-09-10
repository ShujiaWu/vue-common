import TableMixin from '../table'
import CachedPage from '../cached-page'
export default {
  mixins: [CachedPage, TableMixin],
  methods: {
    /**
     * 覆盖列表的初始化方法,缓存页面不需要再该方法加获取列表
     */
    // init () {
    // }
  }
}
