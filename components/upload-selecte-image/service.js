import axios from 'axios'
export default {
  getList (page) {
    let params = {
      size: page.size,
      current: page.current
    }
    return axios
      .get(`api/file/images`, {
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
              datetime: element.uploadDatetime,
              url: element.url
            })
          })
          result.data.list = list
        }
        return result
      })
  }
}
