const NumberArea = 'number-area'
const Options = 'options'
const OptionsMulti = 'options-multi'
const Input = 'input'
const DateTime = 'date-time'
const DateTimeArea = 'date-time-area'
const Cascader = 'cascader'
export default {
  NumberArea: NumberArea,
  Options: Options,
  OptionsMulti: OptionsMulti,
  Input: Input,
  DateTime: DateTime,
  DateTimeArea: DateTimeArea,
  Cascader: Cascader,
  configs: {
    /**
     * 生成输入类型配置对象
     * @param {Object} obj
     */
    [Input] (obj) {
      return Object.assign({
        label: undefined,
        type: Input,
        style: 'width:100px',
        value: undefined,
        text: undefined,
        placeholder: '请输入'
      }, obj)
    },
    [NumberArea] (obj) {
      let result = Object.assign({
        label: NumberArea,
        type: 'number-area',
        style: 'width:50px',
        value: {
          min: undefined,
          max: undefined
        },
        text: {
          min: undefined,
          max: undefined
        },
        placeholder: '请输入'
      }, obj)
      return result
    },
    [Options] (obj) {
      let result = Object.assign({
        label: undefined,
        type: Options,
        style: 'width:150px',
        value: undefined,
        text: undefined,
        options: []
      }, obj)
      if (obj.options) {
        result.options = obj.options
      }
      return result
    },
    [OptionsMulti] (obj) {
      let result = Object.assign({
        label: undefined,
        type: OptionsMulti,
        style: 'width:350px',
        value: [],
        text: [],
        options: []
      }, obj)
      if (obj.value) {
        result.value = obj.value
      }
      if (obj.text) {
        result.text = obj.text
      }
      if (obj.options) {
        result.options = obj.options
      }
      return result
    },
    [DateTime] (obj) {
      let result = Object.assign({
        label: '请选择分析的月份',
        type: DateTime,
        selectType: 'datetime',
        format: 'yyyy/MM/dd HH:mm:ss',
        style: 'width:200px;display:inline-block',
        value: '',
        text: '',
        placeholder: '请选择',
        options: {}
      }, obj)
      return result
    },
    [DateTimeArea] (obj) {
      let result = Object.assign({
        label: '时间区间',
        type: DateTimeArea,
        selectType: 'daterange',
        format: 'yyyy/MM/dd',
        style: 'width:180px;display:inline-block',
        value: [],
        text: [],
        placeholder: '请选择',
        options: {}
      }, obj)
      if (obj.value) {
        result.value = obj.value
      }
      if (obj.text) {
        result.text = obj.text
      }
      return result
    },
    [Cascader] (obj) {
      let result = Object.assign({
        label: undefined,
        type: Cascader,
        style: 'width:180px;display:inline-block;',
        value: [],
        text: [],
        options: []
        // loadData: (item, callback) => {
        //   item.loading = true
        //   // doing something
        //   item.loading = false
        //   callback()
        // },
        // callback: () => {}
      }, obj)
      if (obj.value) {
        result.value = obj.value
      }
      if (obj.text) {
        result.text = obj.text
      }
      return result
    }
  }
}
