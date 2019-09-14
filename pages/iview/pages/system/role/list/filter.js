import Common from '@vue-common/components/iview/list-data-filter/common'
import { Input } from '@vue-common/components/iview/list-data-filter/types'
export default _this => {
  const object = {
    showFilterContent: true,
    // 搜索的字段
    fields: {
      id: Input({
        label: 'ID',
        style: {
          width: '180px'
        }
      }),
      name: Input({
        label: '名称',
        style: {
          width: '180px'
        }
      })
    },
    // 按钮
    buttons: {
      search: {
        type: 'primary',
        icon: 'ios-search',
        label: '查询',
        method () {
          // 调用页面函数
          _this.search(Common.search(object.fields))
        }
      },
      resetSearch: {
        type: 'primary',
        icon: 'ios-refresh-empty',
        label: '重置查询',
        method () {
          // 清空搜索字段
          Common.resetSearch(object.fields)
          // 调用页面函数
          _this.resetSearch()
        }
      }
    }
  }
  return object
}
