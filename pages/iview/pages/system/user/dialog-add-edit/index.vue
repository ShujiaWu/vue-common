<template>
  <Modal :value="value"
         title="title"
         :mask-closable="false"
         @on-cancel="close"
         :transfer="true"
         width='600'>
    <div slot="header">
      <h3>添加角色</h3>
    </div>
    <div>
      <Form ref="form"
            :model="form.data"
            :rules="form.rule"
            :label-width="100">
        <Row type="flex"
             justify="space-around">
          <i-col :span="18">

            <Form-item label="id："
                       prop="id"
                       style="display:none">
              <i-input v-model="form.data.id"></i-input>
            </Form-item>
            <Form-item label="登录名："
                       prop="userName">
              <i-input v-model="form.data.userName"
                       placeholder="请填写登录名"></i-input>
            </Form-item>
            <Form-item label="姓名："
                       prop="name">
              <i-input v-model="form.data.name"
                       placeholder="请填写姓名"></i-input>
            </Form-item>
            <Form-item label="昵称："
                       prop="nickName">
              <i-input v-model="form.data.nickName"
                       placeholder="请填写昵称"></i-input>
            </Form-item>
            <Form-item label="性别："
                       prop="gender">
              <Select v-model="form.data.gender"
                      placeholder="请选择">
                <Option v-for="item in constants.gender"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="用户类型："
                       prop="type"
                       style="display:none">
              <Select v-model="form.data.type"
                      placeholder="请选择">
                <Option v-for="item in constants.type"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item label="头像："
                       prop="avatar">
              <i-input v-model="form.data.avatar"
                       placeholder="请填写头像"></i-input>
            </Form-item>
            <Form-item label="密码："
                       prop="password"
                       key="password_add"
                       v-if="mode==='add'">
              <i-input v-model="form.data.password"
                       placeholder="请填写登录密码">
              </i-input>
            </Form-item>
            <Form-item label="密码："
                       key="password_edit"
                       v-else>
              <i-input v-model="form.data.password"
                       placeholder="请填写登录密码,不填则不修改">
              </i-input>
            </Form-item>
          </i-col>
        </Row>
      </Form>
    </div>
    <!-- 底部 -->
    <div slot="footer">
      <Button @click="close">关闭</Button>
      <Button type="primary"
              :loading="loading"
              v-if="mode==='add'"
              @click="add">添加</Button>
      <Button type="primary"
              :loading="loading"
              v-if="mode==='edit'"
              @click="edit">修改</Button>
    </div>
  </Modal>
</template>

<script>
import Form from './form'
import Service from './service'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    constants: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  mounted () {},
  data () {
    return {
      form: Form,
      loading: false
    }
  },
  watch: {
    value (value) {
      this.$refs.form.resetFields()
      if (value) {
        if (this.mode === 'add') {
        } else {
          // this.form.data.id = this.data.id
          // this.form.data.userName = this.data.userName
          // this.form.data.name = this.data.name
          // this.form.data.nickName = this.data.nickName
          // this.form.data.type = this.data.type
          // this.form.data.gender = this.data.gender
          // this.form.data.avatar = this.data.avatar
          this.$set(this.form, 'data', {
            id: this.data.id,
            userName: this.data.userName,
            name: this.data.name,
            nickName: this.data.nickName,
            type: this.data.type,
            gender: this.data.gender,
            avatar: this.data.avatar
          })
        }
      }
    }
  },
  methods: {
    // 关闭
    close () {
      this.$emit('input', false)
    },
    // 添加
    add () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          Service.add(this.form.data).then(result => {
            this.loading = false
            if (result.isSuccess) {
              this.$Notice.success({
                title: '添加成功',
                desc: result.message
              })
              this.$emit('input', false)
              this.$emit('success', 'add')
            } else {
              this.$Notice.error({
                title: '添加失败',
                desc: result.message
              })
            }
          })
        } else {
          this.$Message.error('请检查输入的信息是否有误')
        }
      })
    },
    edit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          Service.edit(this.form.data).then(result => {
            this.loading = false
            if (result.isSuccess) {
              this.$Notice.success({
                title: '修改成功',
                desc: result.message
              })
              this.$emit('input', false)
              this.$emit('success', 'edit')
            } else {
              this.$Notice.error({
                title: '修改失败',
                desc: result.message
              })
            }
          })
        } else {
          this.$Message.error('请检查输入的信息是否有误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
