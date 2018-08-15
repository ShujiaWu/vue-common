import './index.css'
let $Loading = null

export default {
  show (content) {
    if (!$Loading) {
      $Loading = document.createElement('div')
      document.body.appendChild($Loading)
      $Loading.classList.add('loading')
      $Loading.innerHTML =
      `<div class="loading-content">
        <div class="loader"></div>
        <div class="loading-text">加载中...</div>
      </div>`
    }
    $Loading.getElementsByClassName('loading-text')[0].innerHTML = content
    let $Content = $Loading.getElementsByClassName('loading-content')[0]
    $Content.classList.add('show')
  },
  hide () {
    if ($Loading) {
      document.body.removeChild($Loading)
      $Loading = null
    }
  }
}
