export default {
  setTitle (title) {
    setTimeout(function () {
      document.title = title
      // hack在微信等webview中无法修改document.title的情况
      let iframe = document.createElement('iframe')
      iframe.src = '/favicon.ico'
      iframe.style.display = 'none'
      iframe.onload = function () {
        setTimeout(function () {
          iframe.remove()
        }, 0)
      }
    }, 0)
  }
}
