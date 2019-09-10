/**
 * 通用对象
 */
import _ from 'lodash'
export default {
  /**
   * 搜索按钮点击，数据处理
   * @param {Object} obj 未经处理的数据对象（组件数据对象）
   */
  search (obj) {
    const filter = {}
    for (var key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        // 如果是 对象、非空字符串、数字
        if (obj[key].text !== undefined) {
          switch (obj[key].type) {
            case 'number-area':
              // 区间数据特殊处理
              if (obj[key].text.min !== undefined && _.trim(obj[key].text.min)) {
                filter[key + 'Min'] = obj[key].value.min = _.trim(obj[key].text.min)
              } else {
                obj[key].value.min = undefined
              }
              if (obj[key].text.max !== undefined && _.trim(obj[key].text.max)) {
                filter[key + 'Max'] = obj[key].value.max = _.trim(obj[key].text.max)
              } else {
                obj[key].value.max = undefined
              }
              break
            case 'date-time-area':
              // 区间数据特殊处理
              if (obj[key].text[0] && obj[key].text[1]) {
                obj[key].value = []
                obj[key].value.push(obj[key].text[0])
                obj[key].value.push(obj[key].text[1])
                filter[key + 'Start'] = new Date(obj[key].text[0]).getTime()
                filter[key + 'End'] = new Date(obj[key].text[1]).getTime()
              }
              break
            case 'options-multi':
              // 下拉多选
              if (obj[key].text.length) {
                filter[key] = obj[key].value = []
                obj[key].text.forEach((element) => {
                  obj[key].value.push(element)
                }, this)
              }
              break
            default:
              if ((typeof obj[key].text) === 'string') {
                // 对字符串进行非空校验
                if (_.trim(obj[key].text)) {
                  filter[key] = obj[key].value = _.trim(obj[key].text)
                } else {
                  filter[key] = obj[key].value = undefined
                }
              } else {
                // 其他类型数据
                filter[key] = obj[key].value = obj[key].text
              }
          }
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
    console.log('重置搜索')
    for (var key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        switch (obj[key].type) {
          case 'number-area':
            // 数字区间数据特殊处理
            obj[key].text.min = obj[key].value.min = undefined
            obj[key].text.max = obj[key].value.max = undefined
            break
          case 'date-time-area':
            // 时间区间数据特殊处理
            console.log(obj[key].text.length)
            console.log(obj[key].value.length)
            obj[key].text.splice(0, obj[key].text.length)
            obj[key].value.splice(0, obj[key].value.length)
            // for (let i = 0; i < obj[key].text.length; i++) {
            //   obj[key].text.pop()
            // }
            // for (let i = 0; i < obj[key].value.length; i++) {
            //   obj[key].value.pop()
            // }
            break
          case 'options-multi':
            // 下拉多选
            obj[key].text = []
            obj[key].value = []
            break
          default:
            obj[key].text = obj[key].value = undefined
        }
      }
    }
  }
}
