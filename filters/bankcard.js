export default (value) => {
  let len = value.length
  if (len < 16 || len > 19) {
    return value
  }
  let count = Math.ceil(len / 4)
  let bankcard = []
  for (let i = 0; i < count; i++) {
    bankcard.push(value.substr(i * 4, 4))
  }
  return bankcard.join(' ')
}
