const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
export default function (value) {
  if (!value) {
    return '0 Bytes'
  }
  let index = 0
  let srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2) // 保留的小数位数
  return size + unit[index]
}
