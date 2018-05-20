let regList = {
  phone: /^[0-9]{3}(\*|[0-9]){4}[0-9]{4}$/i,
  tell: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
  // phone1: /(,.+?,).*\1/.test(',' + [].join(',,') + ','),
  mobile: /^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/i,
  mobile1: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
  name: /^([\u4e00-\u9fa5]){2,8}$/,
  ident: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i,
  // pwd: /^[a-zA-Z0-9~`!@#$%^&*()_+={}[\]|\\;:'"<>,.?/-]{8,31}$/,
  pwd: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
  otp: /^[0-9]{4,6}$/,
  address: /^([\u4e00-\u9fa5]){2,20}$/,
  money: /^\d+(\.\d{1,2})?$/,
  zip: /^[0-9]{6}$/,
  bankCard: /^[0-9]{16,19}$/,
  integer: /[^\d].+/,
  tradeCode: /^[0-9]{6}$/,
  code: /^[0-9]{6}$/,
  tradeCodeNoSameNumber: /^(?=.*\d+)(?!.*?([\d])\1{5})[\d]{6}$/,
  qq: /^[0-9]{4,12}$/,
  email: /^([a-zA-Z0-9_\-.])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  authCode: /^[0-9]{6}$/,
  age: /^[1-9]{1}[0-9]{0,2}$/,
  wechat: /^[A-Za-z0-9_-]{3,}$/,
  number: /^(-)?[0-9]+$/,
  positiveNumber: /^[0-9]+$/,
  negativNumber: /^-[0-9]+$/,
  positiveDecimals: /(^[1-9]\d*(\.\d*)?$)|(^0\.\d*[1-9]\d*$)|(^0$)/,
  negativeDecimals: /(^-[1-9]\d*(\.\d*)?$)|(^-0\.\d*[1-9]\d*$)|(^0$)/
}

function test (value, name) {
  if (!regList[name] || !value) {
    return false
  } else {
    return regList[name].test(value)
  }
}

export default{
  getReg (value) {
    if (regList[value]) {
      return regList[value].source
    } else {
      return undefined
    }
  },
  getPattern (value) {
    if (regList[value]) {
      return regList[value]
    } else {
      return undefined
    }
  },
  phone (value) {
    return test(value, 'phone')
  },
  pwd (value) {
    return test(value, 'pwd')
  },
  authCode (value) {
    return test(value, 'authCode')
  },
  email (value) {
    return test(value, 'email')
  },
  negativeDecimals (value) {
    return test(value, 'negativeDecimals')
  }
}
