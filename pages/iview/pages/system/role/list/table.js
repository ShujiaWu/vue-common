// import number from '@vue-common/filters/number'
// import OrederDetail from './detail'
export default vm => {
  const result = [
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      width: 80
    },
    {
      title: '角色名称',
      key: 'name',
      align: 'center',
      width: 160
    },
    {
      title: '备注',
      key: 'remarks',
      align: 'center',
      minWidth: 200
    },
    {
      title: '创建时间',
      key: 'createTime',
      align: 'center',
      width: 180
    },
    {
      title: '修改时间',
      key: 'updateTime',
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
                vm.editRole(params.row)
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
                vm.setMenus(params.row)
              }
            }
          },
          '设置权限'
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
                vm.deleteRole(params.row)
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
