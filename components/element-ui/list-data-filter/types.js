export function Input (obj) {
  return Object.assign({
    type: 'input',
    style: { width: '200px' },
    value: undefined,
    placeholder: ''
  }, obj)
}

export function Options (obj) {
  let result = Object.assign({
    type: 'options',
    style: { width: '200px' },
    value: undefined,
    placeholder: '',
    options: []
  }, obj)
  if (obj.options) {
    result.options = obj.options
  }
  return result
}

// export function Button (obj) {
//   return Object.assign({
//     type: 'button',
//     style: {},
//     placeholder: ''
//   }, obj)
// }

export function DateTime (obj) {
  return Object.assign({
    type: 'datetime',
    value: undefined,
    style: { width: '260px' },
    placeholder: '',
    showType: 'date',
    format: undefined
  }, obj)
}
