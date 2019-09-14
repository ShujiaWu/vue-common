export default {
  // 表单数据
  data: {
    id: undefined,
    name: undefined,
    remarks: undefined

  },
  // 校验规则
  rule: {
    name: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur'
      }
    ]
  }
}
