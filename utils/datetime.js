export const Unit = {
  day: 'day',
  month: 'month',
  year: 'year',
  hour: 'hour',
  minute: 'minute',
  second: 'second',
  millisecond: 'millisecond'
}
export function isValid (value) {
  if (value === undefined || value === '' || value === null) {
    return false
  }
  if (typeof value === 'string') {
    value = value.replace(/-/g, '/')
  }
  if (new Date(value).toString() === 'Invalid Date') {
    return false
  }
  return true
}

export function format (value, formater) {
  if (typeof value === 'string') {
    value = value.replace(/-/g, '/')
  }
  if (isValid(value)) {
    let dateTime = new Date(value)
    let fullYear = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = dateTime.getDate()
    day = day < 10 ? '0' + day : day
    let hours = dateTime.getHours()
    hours = hours < 10 ? '0' + hours : hours
    let minutes = dateTime.getMinutes()
    minutes = minutes < 10 ? '0' + minutes : minutes
    let seconds = dateTime.getSeconds()
    seconds = seconds < 10 ? '0' + seconds : seconds
    let mSeconds = dateTime.getMilliseconds()
    mSeconds = mSeconds < 100 ? '0' + mSeconds : (mSeconds < 10) ? '00' + mSeconds : mSeconds
    let num = ['日', '一', '二', '三', '四', '五', '六']
    let mWeek = num[dateTime.getDay()]
    if (formater) {
      return formater.replace('yyyy', fullYear)
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)
        .replace('S', mSeconds)
        .replace('W', mWeek)
    } else {
      return value
    }
  } else {
    return value
  }
}

export function add (value, step, unit) {
  if (typeof value === 'string') {
    value = value.replace(/-/g, '/')
  }
  let date = new Date(value).getTime()
  switch (unit) {
    case Unit.millisecond: {
      date += step
      break
    }
    case Unit.second: {
      date += step * 1000
      break
    }
    case Unit.minute: {
      date += step * 1000 * 60
      break
    }
    case Unit.hour: {
      date += step * 1000 * 60 * 60
      break
    }
    case Unit.day: {
      date += step * 1000 * 60 * 60 * 24
      break
    }
    case Unit.month: {
      date += step * 1000 * 60 * 60 * 24 * 30
      break
    }
    case Unit.year: {
      date += step * 1000 * 60 * 60 * 24 * 365
      break
    }
  }
  return new Date(date)
}
export function subtract (value, step, unit) {
  if (typeof value === 'string') {
    value = value.replace(/-/g, '/')
  }
  let date = new Date(value).getTime()
  switch (unit) {
    case Unit.millisecond: {
      date -= step
      break
    }
    case Unit.second: {
      date -= step * 1000
      break
    }
    case Unit.minute: {
      date -= step * 1000 * 60
      break
    }
    case Unit.hour: {
      date -= step * 1000 * 60 * 60
      break
    }
    case Unit.day: {
      date -= step * 1000 * 60 * 60 * 24
      break
    }
    case Unit.month: {
      date -= step * 1000 * 60 * 60 * 24 * 30
      break
    }
    case Unit.year: {
      date -= step * 1000 * 60 * 60 * 24 * 365
      break
    }
  }
  return new Date(date)
}

let fn = (value) => {
  if (typeof value === 'string') {
    value = value.replace(/-/g, '/')
  }
  return {
    value: isValid(value) ? new Date(value) : new Date(),
    isValid () {
      return isValid(this.value)
    },
    format (formater) {
      return format(this.value, formater)
    },
    add (step, unit) {
      // console.log('+ ', new Date(this.value))
      this.value = add(this.value, step, unit)
      // console.log('+ ', new Date(this.value))
      return this
    },
    subtract (step, unit) {
      // console.log('- ', new Date(this.value))
      this.value = subtract(this.value, step, unit)
      // console.log('- ', new Date(this.value))
      return this
    },
    toDate () {
      console.log(this.value)
      return this.value
    },
    getTime () {
      return this.value.getTime()
    }
  }
}
fn.Unit = Unit
export default fn
