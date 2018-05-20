export default {
  get (key) {
    let value = localStorage.getItem(key)
    console.log('【LocalStorage】获取')
    console.log('Key', key)
    console.log('Value', value)
    return value
  },
  set (key, value) {
    localStorage.setItem(key, value)
    console.log('【LocalStorage】存储')
    console.log('Key：', key)
    console.log('Value：', value)
  },
  delete (key) {
    localStorage.setItem(key, undefined)
    console.log('【LocalStorage】删除')
    console.log('Key：', key)
  },
  clear () {
    localStorage.clear()
    console.log('【LocalStorage】清理')
  }
}
