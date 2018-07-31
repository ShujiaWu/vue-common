export default {
  getQueryString: function (name) {
    // var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    // var r = window.location.search.substr(1).match(reg)
    // if (r) {
    //   let result = r[2]
    //   let pos = result.indexOf('#')
    //   if (pos !== -1) {
    //     result = result.substring(0, pos)
    //   }
    //   return decodeURIComponent(result)
    // }
    // return undefined
    return this.getQuery()[name]
  },
  getQuery () {
    let qs = location.search.substr(1) // 获取url中"?"符后的字串
    let pos = qs.indexOf('#')
    if (pos !== -1) {
      qs = qs.substring(0, pos)
    }
    let args = {} // 保存参数数据的对象
    let items = qs.length ? qs.split('&') : [] // 取得每一个参数项,
    let item = null
    let len = items.length

    for (var i = 0; i < len; i++) {
      item = items[i].split('=')
      let name = decodeURIComponent(item[0])
      let value = decodeURIComponent(item[1])
      if (name) {
        args[name] = value
      }
    }
    return args
  }
}
