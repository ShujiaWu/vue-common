import datetime from '@common/filters/datetime'

export default (vm) => {
  let result = [
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      width: '80px'
    },
    {
      title: '名称',
      key: 'name',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '上传日期',
      key: 'datetime',
      ellipsis: true,
      align: 'center',
      render: (h, params) => {
        return h('span', datetime(params.row.datetime, 'yyyy-MM-dd HH:mm:ss'))
      }
    }
  ]
  return result
}
