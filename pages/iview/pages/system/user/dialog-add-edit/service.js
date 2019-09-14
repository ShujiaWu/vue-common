import axios from 'axios'
import md5 from 'md5'
// import datetime from '@vue-common/filters/datetime'
export default {
  /**
   * 添加
   * @param {Object} data 数据对象
   */
  add (data) {
    const params = {
      username: data.userName,
      name: data.name,
      nickname: data.nickName,
      type: data.type,
      sex: data.gender,
      photo: data.avatar,
      password: md5(data.password)
    }
    return axios.post('um/add', params)
  },
  edit (data) {
    const params = {
      id: data.id,
      username: data.userName,
      name: data.name,
      nickname: data.nickName,
      type: data.type,
      sex: data.gender,
      photo: data.avatar,
      password: data.password ? md5(data.password) : undefined
    }
    return axios.post('um/edit', params)
  }
}
