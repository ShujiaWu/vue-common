import './dialog.css'
let $InfoDialog = null

export default (config) => {
  if ($InfoDialog) {
    document.body.removeChild($InfoDialog)
  }
  $InfoDialog = document.createElement('div')
  document.body.appendChild($InfoDialog)
  $InfoDialog.classList.add('info-dialog')
  $InfoDialog.innerHTML =
  `<div class="info-dialog-content">
    <div class="info-dialog-header"></div>
    <div class="info-dialog-body"></div>
    <div class="info-dialog-footer">
    </div>
  </div>`
  let $Content = $InfoDialog.getElementsByClassName('info-dialog-content')[0]
  $InfoDialog.getElementsByClassName('info-dialog-header')[0].innerHTML = config.title
  $InfoDialog.getElementsByClassName('info-dialog-body')[0].innerHTML = config.msg
  let buttons = ''
  let countdown = {}
  let countdownSize = 0
  for (let i = 0; i < config.buttons.length; i++) {
    const button = config.buttons[i]
    if (button.wait && button.wait > 0) {
      buttons += `<button disabled>${button.name}(${button.wait})</button>`
      countdown[i] = button.wait
      countdownSize++
    } else {
      buttons += `<button>${button.name}</button>`
    }
  }

  $InfoDialog.getElementsByClassName('info-dialog-footer')[0].innerHTML = buttons

  let btnElement = $InfoDialog.getElementsByTagName('button')

  for (let i = 0; i < btnElement.length; i++) {
    const element = btnElement[i]
    let buttonMethod = config.buttons[i].method
    element.addEventListener('click', function (event) {
      if (buttonMethod && typeof buttonMethod === 'function') {
        buttonMethod()
      }
      document.body.removeChild($InfoDialog)
      $InfoDialog = null
    })
  }

  if (countdownSize) {
    // 倒计时
    let instance = setInterval(function () {
      if (countdownSize === 0) {
        clearInterval(instance)
        return
      }
      for (const key in countdown) {
        if (countdown.hasOwnProperty(key)) {
          countdown[key]--

          if (countdown[key] > 0) {
            btnElement[key].innerText = `${config.buttons[key].name}(${countdown[key]})`
          } else {
            btnElement[key].innerText = `${config.buttons[key].name}`
            btnElement[key].removeAttribute('disabled')
            delete (countdown[key])
            countdownSize--
          }
        }
      }
    }, 1000)
  }

  $Content.classList.add('show')
}
