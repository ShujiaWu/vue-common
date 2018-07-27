export const RegExpPhone = /^[0-9]{3}(\*|[0-9]){4}[0-9]{4}$/i
export const RegExpTel = /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/
export const RegExpTelAndPhone = /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$|^1[34578][0-9]{9}|^400(-)?\d{3}(-)?\d{4}$/
export const RegExpChineseName = /^([\u4e00-\u9fa5]){2,8}$/
export const RegExpPositiveNumber = /^[0-9]+$/
export const RegExpEmail = /^([a-zA-Z0-9_\-.])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
export const RegExpIdent = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i
export const RegExpPwd = /(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/
export const RegExpBankCard = /^[0-9]{16,19}$/
/**
 * 银行卡验证
 */
export function BankCard (rule, value, callback) {
  if (value.length < 16 || value.length > 19) {
    callback(new Error('请输入合法的银行卡号'))
  }
  callback()
}

/**
 * 电话号码验证
 */
export function Tel (rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (!RegExpTel.test(value)) {
    callback(new Error('请输入合法电话号码'))
  }
  callback()
}

/**
 * 手机号码验证
 */
export function Phone (rule, value, callback) {
  if (!RegExpPhone.test(value)) {
    callback(new Error('请输入合法的手机号码'))
  }
  callback()
}

/**
 * 电话和手机验证
 */
export function TelAndPhone (rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (!RegExpTelAndPhone.test(value)) {
    callback(new Error('请输入合法的联系方式'))
  }
  callback()
}

/**
 * 中文姓名验证
 */
export function ChineseName (rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (!RegExpChineseName.test(value)) {
    callback(new Error('请输入合法的姓名'))
  }
  callback()
}

/**
 * 正整数验证
 */
export function PositiveNumber (rule, value, callback) {
  if (!RegExpPositiveNumber.test(value)) {
    callback(new Error('请输入合法的正整数'))
  }
  callback()
}

/**
 * 电子邮件验证
 */
export function Email (rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (!RegExpEmail.test(value)) {
    callback(new Error('请输入合法的电子邮件地址'))
  }
  callback()
}

/**
 * 身份证验证
 */
export function Ident (rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (!RegExpIdent.test(value)) {
    callback(new Error('请输入合法的证件号'))
  }
  callback()
}
