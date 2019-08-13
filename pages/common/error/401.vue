<template>
  <div class="page-401">
    <div class="errPage-container">
      <el-button icon="arrow-left"
                 class="pan-back-btn"
                 @click="back">
        返回
      </el-button>
      <el-row>
        <el-col :span="12">
          <h1 class="text-jumbo text-ginormous">
            Sorry!
          </h1>
          <h2>你没有权限去该页面</h2>
          <h6>如有不满请联系你领导</h6>
          <h6>或者你可以去:</h6>
          <ul class="list-unstyled">
            <li class="link-type">
              <router-link to="/dashboard">
                回首页
              </router-link>
            </li>
            <li class="link-type">
              <router-link to="/login">
                重新登录
              </router-link>
            </li>

          </ul>
        </el-col>
        <el-col :span="12">
          <img src="./img/401.gif"
               width="313"
               height="428"
               alt="Girl has dropped her ice cream.">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page401',
  data () {
    return {}
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-401 {
  height: 100%;
  width: 100%;
  background: #fff;
}
.errPage-container {
  width: 800px;
  max-width: 100%;
  padding-top: 100px;
  margin: 0 auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
