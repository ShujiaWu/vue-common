export function Input (obj) {
  return Object.assign({
    label: undefined,
    type: 'input',
    style: 'width:100px',
    value: undefined,
    text: undefined,
    placeholder: '请输入'
  }, obj)
}
export function NumberArea (obj) {
  const result = Object.assign({
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
}
export function Options (obj) {
  const result = Object.assign({
    label: undefined,
    type: 'options',
    style: 'width:150px',
    value: undefined,
    text: undefined,
    options: []
  }, obj)
  if (obj.options) {
    result.options = obj.options
  }
  return result
}
export function OptionsMulti (obj) {
  const result = Object.assign({
    label: undefined,
    type: 'options-multi',
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
}
export function DateTime (obj) {
  const result = Object.assign({
    label: '请选择分析的月份',
    type: 'date-time',
    selectType: 'datetime',
    format: 'yyyy/MM/dd HH:mm:ss',
    style: 'width:200px;display:inline-block',
    value: '',
    text: '',
    placeholder: '请选择',
    options: {}
  }, obj)
  return result
}
export function DateTimeArea (obj) {
  const result = Object.assign({
    label: '时间区间',
    type: 'date-time-area',
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
}
export function Cascader (obj) {
  const result = Object.assign({
    label: undefined,
    type: 'cascader',
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
