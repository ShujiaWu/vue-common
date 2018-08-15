export default (showValue, pay) => {
  let $Keyboard = document.getElementById('keyboard')
  if (!$Keyboard) {
    $Keyboard = document.createElement('div')
    $Keyboard.classList.add('keyboard')
    $Keyboard.innerHTML = `
    <table>
      <tbody>
        <tr>
          <td data-num="1">1</td>
          <td data-num="2">2</td>
          <td data-num="3">3</td>
          <td data-num="del">删除</td>
        </tr>
        <tr>
          <td data-num="4">4</td>
          <td data-num="5">5</td>
          <td data-num="6">6</td>
          <td rowspan="3" data-num="pay" class="pay disabled">确认<br/>支付</td>
        </tr>
        <tr>
          <td data-num="7">7</td>
          <td data-num="8">8</td>
          <td data-num="9">9</td>
        </tr>
        <tr>
          <td class="disabled"></td>
          <td data-num="0">0</td>
          <td data-num=".">.</td>
        </tr>
      </tbody>
    </table>
    `
    document.body.appendChild($Keyboard)
  }
  let $Pay = $Keyboard.getElementsByClassName('pay')[0]
  // 按下的键（数组）
  let input = []
  // 删除键长按计时器
  let instance = null

  /**
   * 显示输入的值
   */
  function showInput () {
    let value = input.join('')
    if (parseFloat(value) > 0) {
      $Pay.classList.remove('disabled')
    } else {
      $Pay.classList.add('disabled')
    }
    // 显示输入的值
    showValue(value)
  }

  /**
   * 清除所有的输入
   */
  function clear () {
    input.splice(0, input.length)
    showInput()
  }

  // 按下
  $Keyboard.addEventListener('touchstart', function (event) {
    event.target.classList.add('active')
    let key = event.target.getAttribute('data-num')
    switch (key) {
      case 'del':
        instance = setTimeout(clear, 500)
        break
    }
  })

  // 抬起
  $Keyboard.addEventListener('touchend', function (event) {
    event.target.classList.remove('active')
    let key = event.target.getAttribute('data-num')
    switch (key) {
      case '.':
        // 小数点做特殊处理
        if (input.indexOf('.') === -1) {
          if (input.length === 0) {
            input.push('0')
            input.push(key)
          } else {
            input.push(key)
          }
        }
        break
      case '0':
        // 0 做特殊处理
        if (input.length === 1 && input[0] === '0') {
        } else {
          input.push(key)
        }
        break
      case 'del':
        // 删除
        clearTimeout(instance)
        input.pop()
        break
      case 'pay':
        // 支付按钮
        if (input.indexOf('.') === input.length - 1) {
          input.pop()
        }
        let value = parseFloat(input.join(''))
        if (!value) {
          return
        }
        pay(value)
        break
      default:
        input.push(key)
        break
    }

    let pointIndex = input.indexOf('.')
    if (pointIndex > 0) {
      input = input.slice(0, pointIndex + 3)
    } else {
      input = input.slice(0, 5)
    }
    // 显示值
    showInput()
    // 取消事件冒泡，防止出现点击300ms延时
    event.preventDefault()
  })
}
