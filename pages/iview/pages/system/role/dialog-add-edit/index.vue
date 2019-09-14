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
            <Form-item label="角色名称："
                       prop="name">
              <i-input v-model="form.data.name"
                       placeholder="角色名称，建议以 ROLE_ 开头，如 ROLE_ADMIN"></i-input>
            </Form-item>
            <Form-item label="备注："
                       prop="remarks">
              <i-input v-model="form.data.remarks"
                       type="textarea"
                       placeholder="备注信息"></i-input>
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
          console.log('填充')
          this.$set(this.form, 'data', {
            id: this.data.id,
            name: this.data.name,
            remarks: this.data.remarks
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
