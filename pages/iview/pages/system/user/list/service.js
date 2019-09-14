
import axios from 'axios'
/**
 * 获取列表
 * @param {Object} data 元数据
 */
export function getList (data) {
  const params = {
    // 分页信息
    current: data.page.current,
    size: data.page.size,
    // 过滤条件
    id: data.filter.id,
    username: data.filter.userName,
    name: data.filter.name,
    sex: data.filter.gender
  }
  return axios.get('um/users', {
    params
  }).then(result => {
    if (result.isSuccess) {
      // 列表数据
      const list = []
      for (let i = 0; i < result.data.list.length; i++) {
        const item = result.data.list[i]
        const roles = []
        if (item.roles) {
          item.roles.forEach(element => {
            roles.push(element.roleId)
          })
        }
        list.push({
          id: item.id,
          userName: item.username,
          name: item.name,
          nickName: item.nickname,
          type: item.userType,
          gender: item.sex,
          avatar: item.photo,
          ip: item.lastLoginIp || '-',
          lastLoginTime: item.lastLoginTime || '-',
          enable: item.enable,
          roles
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
 * 删除
 * @param {String,Number} id ID
 */
export function deleteUser (id) {
  const params = {
    id
  }
  return axios.post('um/del', params).then(result => {
    return result
  })
}

/**
 * 设置状态
 */
export function setUserEnable ({ id, enable }) {
  const params = {
    id,
    enable
  }
  return axios.post('um/disable', params).then(result => {
    return result
  })
}
