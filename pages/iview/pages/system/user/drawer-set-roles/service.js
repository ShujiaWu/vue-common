import axios from 'axios'

/**
 * 获取角色
 */
export function getAllRoles (checkeds) {
  return axios.get('um/roles').then(result => {
    if (result.isSuccess) {
      const list = []
      result.data.forEach(element => {
        list.push({
          id: element.roleId,
          name: element.name,
          remarks: element.remarks
        })
      })
      result.data = list
    }
    return result
  })
}

export function updateUserRoles (data) {
  const params = {
    id: data.id,
    roles: data.ids
  }
  return axios.post('/um/authorize', params)
}
