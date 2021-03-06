export default (value, decimals = 2, isRound = true, defaultValue) => {
  if (isNaN(value)) {
    // console.error('【数字格式化】传入非数字')
    return value || defaultValue
  }
  let isDecimal = parseFloat(value) < 0
  value = Math.abs(value)
  var str
  if (isRound) {
    str = parseFloat(value).toFixed(decimals || 0) + ''
  } else {
    str =
      (
        parseInt(parseFloat(value) * Math.pow(10, decimals || 0)) /
        Math.pow(10, decimals || 0)
      ).toFixed(decimals || 0) + ''
  }
  var indexOfPoint = str.indexOf('.')
  var integerPart = ''
  var decimalPart = ''
  if (indexOfPoint !== -1) {
    // 小数
    integerPart = str.substring(0, indexOfPoint)
    decimalPart = str.substring(indexOfPoint + 1)
  } else {
    // 整数
    integerPart = str
  }

  // 整数部分长度
  var integerPartLength = integerPart.length
  // 长度计算
  var firstPartLength = integerPartLength % 3
  var otherPartLength = parseInt(integerPartLength / 3)
  // 临时数组
  var temp = []
  // 字符串分割与合并
  var firstPart = integerPart.slice(0, firstPartLength)
  if (firstPart !== '') {
    temp.push(firstPart)
  }
  for (var i = 0; i < otherPartLength; i++) {
    temp.push(
      integerPart.slice(firstPartLength + i * 3, firstPartLength + (i + 1) * 3)
    )
  }
  integerPart = temp.join(',')
  if (isDecimal) {
    integerPart = '-' + integerPart
  }
  // 返回
  if (!decimals) {
    return integerPart
  } else {
    return integerPart + '.' + decimalPart
  }
}
