import md5 from 'md5'
export default {
  created () {
    // let hash = `${this.$route.name}-${JSON.stringify(this.$route.params)}-${JSON.stringify(this.$route.query)}`
    // this.page.hash = md5(hash)
    // 获取页面的参数
    this.$set(this.page, 'params', Object.assign({}, this.$route.params))
    this.$set(this.page, 'query', Object.assign({}, this.$route.query))
  },
  activated () {
    this.beforeReactived()
    // 根据路由的名字和参数计算页面的额hash
    let hash = `${this.$route.name}/${this.$options.name}-${JSON.stringify(this.$route.params)}-${JSON.stringify(this.$route.query)}`
    console.log(hash)
    this.page.hash = hash = md5(hash)
    // 读取上一次加载页面的hash
    // let data = this.$SessionStorage.get(this.page.name)
    const data = this.$store.state.app.pageHash[`${this.page.name}/${this.$options.name}`]
    console.log('页面hash比对', `${this.page.name}/${this.$options.name}`, data, this.page.hash)
    // 哈希比对，不一致，则需要刷新本页面
    if (data !== this.page.hash) {
      if (data) {
        // 页面Hash不一致,且非第一次加载，需要刷新
        console.log('页面Hash不一致,且非第一次加载，需要刷新')
        // 重新加载数据之前，优先读取路由中的参数
        this.$set(this.page, 'params', Object.assign({}, this.$route.params))
        this.$set(this.page, 'query', Object.assign({}, this.$route.query))
        // 重新加载数据
        this.reloadData()
      } else {
        console.log('页面首次进入')
      }
    } else {
      console.log('页面Hash一致，无需要刷新')
    }
    // 删除上一次记录的hash
    // this.$SessionStorage.delete(this.page.name)
    this.$store.dispatch('app/AppEnterCachePage', {
      page: `${this.page.name}/${this.$options.name}`
    })
  },
  deactivated () {
    // 保存页面的 hash
    // this.$SessionStorage.set(this.page.name, this.page.hash)
    this.$store.dispatch('app/AppLeaveCachePage', {
      page: `${this.page.name}/${this.$options.name}`,
      value: this.page.hash
    })
  },
  data () {
    return {
      page: {
        name: this.$route.name, // 页面名称
        hash: undefined, // 页面Hash值
        params: {},
        query: {}
      }
    }
  },
  methods: {
    /**
     * 在 activated 之前执行该方法
     */
    beforeReactived () {

    },
    /**
     * 重新加载数据
     */
    reloadData () {
    }
  }
}
