import axios from 'axios'
// import datetime from '@vue-common/filters/datetime'
export default {
  /**
   * 添加
   * @param {Object} data 数据对象
   */
  add (data) {
    const params = {
      name: data.name,
      remarks: data.remarks
    }
    return axios.post('rbac/role/add', params)
  },
  edit (data) {
    const params = {
      roleId: data.id,
      name: data.name,
      remarks: data.remarks
    }
    return axios.post('rbac/role/edit', params)
  }
}
