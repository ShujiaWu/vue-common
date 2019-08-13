<template>
  <div class="login-page">
    <div class="login-container">
      <div class="avatar">
        <svg-icon icon="user" />
      </div>
      <div class="title">User Login</div>
      <!-- 表单 -->
      <el-form label-width="auto" :model="form.data" :rules="form.rules" ref="Form">
        <el-form-item label="账号:" prop="account" ref="item_account">
          <el-input ref="account" v-model="form.data.account" :placeholder="form.placeholder.account"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd" ref="item_pwd" :key="passwordType">
          <el-input ref="pwd" v-model="form.data.pwd" :placeholder="form.placeholder.pwd" :type="passwordType"></el-input>
        </el-form-item>
        <div style="text-align:center;margin-top:40px;">
          <el-button :loading="form.loading" type="primary" style="display:block;width:100%;" @click="loginHander">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Form from './form'
export default {
  name: 'LoginCommonPage',
  props: {
    login: {
      type: Function,
      required: true
    }
  },
  // created () {
  //   this.redirect = this.$route.query.redirect
  // },
  mounted () {
    if (this.form.data.account === '') {
      this.$refs.account.focus()
    } else if (this.form.data.pwd === '') {
      this.$refs.pwd.focus()
    }
  },
  data () {
    return {
      form: Form,
      passwordType: 'password',
      redirect: undefined,
      otherQuery: undefined
    }
  },
  watch: {
    $route: {
      handler (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    loginHander () {
      this.form.loading = true
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          this.login(this.form.data).then(result => {
            this.form.loading = false
            if (result.isSuccess) {
              this.$store.dispatch('UserLogin', result.data).then(() => {
                this.$router.replace({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
              })
            } else {
              this.form.data.pwd = ''
              this.$refs['item_pwd'].clearValidate()
              this.$refs.pwd.focus()
              this.$message.error(`登录失败！${result.message}`)
            }
          })
        } else {
          this.form.loading = false
          this.$message.error('请检查账号和密码输入是否合法')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  width: 100%;
  background-image: url("./img/bg.gif");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  text-align: center;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .login-container {
    width: 360px;
    background: #fff;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding: 50px 30px 60px 30px;
    .avatar {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      left: calc(50% - 50px);
      background:#557EBD;
      border-radius: 50%;
      line-height: 100px;
      color: #FFF;
      font-size: 80px;
    }
    .title {
      padding: 30px 0;
      color: #666;
      font-size: 18px;
    }
  }
  // 重置默认的按钮样式
  .el-button--primary {
    background-color: #557EBD;
    border-color: #557EBD;
  }
  .el-button--primary:focus,
  .el-button--primary:hover{
    background:#66b1ff;
    border-color:#66b1ff;
  }
  .el-button--primary.is-active,
  .el-button--primary:active{
    background:#3a8ee6;
    border-color:#3a8ee6;
  }
  .el-button--primary:active{
    outline:0
  }
}
</style>
