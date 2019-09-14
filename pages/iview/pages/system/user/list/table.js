// import number from '@vue-common/filters/number'
// import OrederDetail from './detail'
import constant from '@vue-common/filters/constant'
export default vm => {
  const result = [
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      width: 80
    },
    {
      title: '用户类型',
      key: 'type',
      align: 'center',
      width: 100
    },
    {
      title: '登录名',
      key: 'userName',
      align: 'center',
      minWidth: 160
    },
    {
      title: '姓名',
      key: 'name',
      align: 'center',
      width: 160
    },
    {
      title: '昵称',
      key: 'nickName',
      align: 'center',
      width: 160
    },
    {
      title: '性别',
      key: 'gender',
      align: 'center',
      width: 80,
      render: (h, params) => {
        return h('span', constant(params.row.gender, vm.constants.gender, 'v2l'))
      }
    },
    {
      title: '状态',
      key: 'enable',
      align: 'center',
      width: 80,
      render: (h, params) => {
        return h('i-switch', {
          props: {
            size: 'small',
            value: params.row.enable
          },
          on: {
            'input' (value) {
              params.row.enable = value
            },
            'on-change' (value) {
              vm.changUserEnable(params.row, value)
            }
          }
        })
      }
    },
    {
      title: '登录IP',
      key: 'ip',
      align: 'center',
      width: 200
    },
    {
      title: '最近登录时间',
      key: 'lastLoginTime',
      align: 'center',
      width: 180
    }
  ]
  const btnWidth = 80 + 60 + 80

  result.push({
    title: '操作',
    key: 'action',
    width: btnWidth,
    align: 'center',
    fixed: 'right',
    render: (h, params) => {
      const buttonArr = [
        h(
          'Button',
          {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.editUser(params.row)
              }
            }
          },
          '修改'
        ),
        h(
          'Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.setRole(params.row)
              }
            }
          },
          '设置角色'
        ),
        h(
          'Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                vm.deleteUser(params.row)
              }
            }
          },
          '删除'
        )
      ]
      return h('div', buttonArr)
    }
  })
  return result
}
