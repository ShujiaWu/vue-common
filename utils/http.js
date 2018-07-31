/**
 * 状态改变
 * @param {*} resolve resolve
 */
function onreadystatechange (resolve) {
  return function () {
    if (this.readyState === 4) {
      if ((this.status >= 200 && this.status < 300) || this.status === 304) {
        // 接口调用成功
        try {
          let response = JSON.parse(this.response)
          let isSuccess = false
          let status = response.code
          let message = ''
          switch (response.code) {
            case '10000':
              isSuccess = true
              message = response.msg
              break
            default:
              isSuccess = false
              message = response.subMsg || response.msg
              break
          }
          resolve({
            isSuccess: isSuccess,
            status: status,
            message: message,
            code: status,
            data: response.result
          })
        } catch (e) {
          resolve({
            isSuccess: false,
            status: '500',
            message: e.message,
            code: 500
          })
        }
      } else {
        // 接口调用失败
        resolve({
          isSuccess: false,
          status: this.status,
          message: this.statusText,
          code: this.status
        })
      }
    }
  }
}
/**
 * 将参数对象转成字符串
 * @param {Object} data 参数对象
 */
function encodeFormData (data) {
  if (!data) return ''
  var pairs = []
  for (var name in data) {
    if (!data.hasOwnProperty(name)) continue
    if (typeof data[name] === 'function') continue
    var value = data[name].toString()
    name = encodeURIComponent(name.replace('%20', '+'))
    value = encodeURIComponent(value.replace('%20', '+'))
    pairs.push(name + '=' + value)
  }
  return pairs.join('&')
}

export default {
  post (target, data) {
    return new Promise((resolve, reject) => {
      let param = new FormData()
      // post参数
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let element = data[key]
          param.append(key, element)
        }
      }
      let xhr = new XMLHttpRequest()
      xhr.open('post', target, true)
      xhr.onreadystatechange = onreadystatechange(resolve)
      xhr.send(param)
    })
  },
  get (target, data) {
    return new Promise((resolve, reject) => {
      let param = encodeFormData(data)
      let xhr = new XMLHttpRequest()
      if (param) {
        target = target + '?' + param
      }
      xhr.open('get', target, true)
      xhr.onreadystatechange = onreadystatechange(resolve)
      xhr.send(null)
    })
  }
}
