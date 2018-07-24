import _ from 'lodash'
export function formatBankCard (val) {
  let result = _.trim(val)
  result = result.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ')
  if (result.length > 31) {
    result = result.substr(0, 23)
  }
  return result
}
