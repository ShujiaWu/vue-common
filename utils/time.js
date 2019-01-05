export default (value) => {
  if (isNaN(value)) {
    return value
  }
  let hours = parseInt(value / 3600000)
  let mins = parseInt((value % 3600000) / 60000)
  let secs = parseInt(((value % 3600000) % 60000) / 1000)
  if (hours <= 9) {
    hours = `0${hours}`
  }
  if (mins <= 9) {
    mins = `0${mins}`
  }
  if (secs <= 9) {
    secs = `0${secs}`
  }
  switch (true) {
    case hours > 0 && mins > 0:
      return `${hours}时${mins}分${secs}秒`
    case hours <= 0 && mins > 0:
      return `${mins}分${secs}秒`
    case hours <= 0 && mins <= 0:
      return `${secs}秒`
  }
}
