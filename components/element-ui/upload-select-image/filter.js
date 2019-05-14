import Common from '@vue-common/components/element-ui/list-data-filter/common'
import { Input, DateTime } from '@vue-common/components/element-ui/list-data-filter/types'
export default _this => {
  let object = {
    showFilterContent: true,
    // 搜索的字段
    fields: {
      name: Input({
        placeholder: '文件名称'
      }),
      datetime: DateTime({
        placeholder: '上传日期',
        showType: 'daterange'
      })
    },
    // 按钮
    buttons: {
      search: {
        type: 'primary',
        icon: 'el-icon-search',
        label: '查询',
        method () {
          // 调用页面函数
          _this['search'](Common.search(object.fields))
        }
      },
      resetSearch: {
        type: 'primary',
        icon: 'el-icon-refresh',
        label: '重置查询',
        method () {
          // 清空搜索字段
          Common.resetSearch(object.fields)
          // 调用页面函数
          _this['resetSearch']()
        }
      }
    }
  }
  return object
}
