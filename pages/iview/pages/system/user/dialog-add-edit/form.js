export default {
  // 表单数据
  data: {
    id: undefined,
    userName: undefined,
    name: undefined,
    nickName: undefined,
    type: 0,
    gender: 1,
    avatar: undefined,
    password: undefined

  },
  // 校验规则
  rule: {
    userName: [
      {
        required: true,
        message: '登录名不能为空',
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        message: '姓名不能为空',
        trigger: 'blur'
      }
    ],
    nickName: [
      {
        required: true,
        message: '昵称不能为空',
        trigger: 'blur'
      }
    ],
    gender: [
      {
        required: true,
        type: 'number',
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }
    ]
  }
}
