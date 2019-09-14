
import axios from 'axios'
/**
 * 获取角色列表
 * @param {Object} data 元数据
 */
export function getList (data) {
  const params = {
    // 分页信息
    current: data.page.current,
    size: data.page.size,
    // 过滤条件
    id: data.filter.id,
    name: data.filter.name
  }
  return axios.get('rbac/roles', {
    params
  }).then(result => {
    if (result.isSuccess) {
      // 列表数据
      const list = []
      for (let i = 0; i < result.data.list.length; i++) {
        const item = result.data.list[i]
        const menus = []
        item.permissions.forEach(element => {
          menus.push(element.permissionId)
        })
        list.push({
          id: item.roleId,
          name: item.name,
          remarks: item.remarks,
          createTime: item.createTime,
          updateTime: item.updateTime,
          menus: menus
        })
      }
      result.data = {
        list: list,
        // 分页数据
        pagination: {
          total: parseInt(result.data.pagination.total),
          current: parseInt(result.data.pagination.current),
          size: parseInt(result.data.pagination.size),
          pages: parseInt(result.data.pagination.pages)
        }
      }
    }
    return result
  })
}

/**
 * 删除角色
 * @param {String,Number} ids 角色ID
 */
export function deleteRole (id) {
  const params = {
    roleId: id
  }
  return axios.post('rbac/role/delete', params).then(result => {
    return result
  })
}
