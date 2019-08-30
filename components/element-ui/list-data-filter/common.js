/**
 * 通用对象
 */
// import _ from 'lodash'
export default {
  /**
   * 搜索按钮点击，数据处理
   * @param {Object} obj 未经处理的数据对象（组件数据对象）
   */
  search (obj) {
    let filter = {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        switch (obj[key].type) {
          default:
            filter[key] = (obj[key].value || obj[key].value === 0) ? obj[key].value : undefined
        }
      }
    }
    return filter
  },
  /**
   * 重置搜索的按钮
   * @param {Object} obj 未经处理的数据对象（组件数据对象）
   */
  resetSearch (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        switch (obj[key].type) {
          default:
            obj[key].value = undefined
        }
      }
    }
  }
}
