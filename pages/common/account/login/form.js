import { RegExpPhone, RegExpPwd } from '@vue-common/utils/validator'
export default {
  loading: false,
  data: {
    account: '13900000000',
    pwd: 'Aa123456'
  },
  placeholder: {
    account: '请输入登录账号',
    pwd: '请输入登录密码'
  },
  rules: {
    account: [
      {
        required: true,
        message: '账户名不能为空',
        trigger: 'blur'
      },
      {
        pattern: RegExpPhone,
        message: '请输入正确的账户名',
        trigger: 'blur'
      }
    ],
    pwd: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        pattern: RegExpPwd,
        message: '请输入8位以上字母数字组合的密码',
        trigger: 'blur'
      }
    ]
  }
}
