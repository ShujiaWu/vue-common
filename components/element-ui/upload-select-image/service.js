import axios from 'axios'
export default {
  getList (data) {
    let params = {
      size: data.page.size,
      current: data.page.page
      // 分页信息
      // pageNow: data.page.page,
      // pageSize: data.page.size,
    }
    return axios
      .get(`../api/file/images`, {
        params
      })
      .then(result => {
        return result
      })
      .then(result => {
        if (result.isSuccess) {
          let list = []
          result.data.list.forEach(element => {
            list.push({
              id: element.id,
              name: element.originalName,
              datetime: new Date(element.uploadDatetime),
              url: element.url,
              size: element.size
            })
          })
          result.data.list = list
        }
        return result
      })
  }
}
