export default {
  get (key) {
    let value = sessionStorage.getItem(key)
    // console.log('【SessionStorage】获取')
    // console.log('Key', key)
    // console.log('Value', value)
    return value
  },
  set (key, value) {
    sessionStorage.setItem(key, value)
    // console.log('【SessionStorage】存储')
    // console.log('Key：', key)
    // console.log('Value：', value)
  },
  delete (key) {
    sessionStorage.setItem(key, undefined)
    // console.log('【SessionStorage】删除')
    // console.log('Key：', key)
  },
  clear () {
    sessionStorage.clear()
    // console.log('【SessionStorage】清理')
  }
}
