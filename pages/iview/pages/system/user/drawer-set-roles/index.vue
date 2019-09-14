<template>
  <Drawer :title="`设置用户角色-${data.name}`"
          :closable="false"
          :mask-closable="false"
          :value="value"
          width="360px">
    <CheckboxGroup v-model="checked">
      <div v-for="(item,index) in roles"
           :key="index"
           class="margin-b-10">
        <Checkbox :label="item.id">{{item.name}}</Checkbox>
        <div class="text-999 padding-l-20 text-12">{{item.remarks}}</div>
      </div>
    </CheckboxGroup>
    <Spin size="large"
          fix
          v-if="loading"></Spin>
    <div class="drawer-footer">
      <Button style="margin-right: 8px"
              @click="close">取消</Button>
      <Button type="primary"
              @click="submit">提交</Button>
    </div>
  </Drawer>
</template>

<script>
import * as Service from './service'
export default {
  name: 'DrawerSetRoles',
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
  created () {},
  data () {
    return {
      loading: false,
      roles: [],
      checked: []
    }
  },
  watch: {
    value (value) {
      if (value) {
        this.checked.splice(0, this.checked.length, ...this.data.roles)
        this.getAllRoles()
      }
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    /**
     * 调用接口获取所有的菜单
     */
    getAllRoles () {
      this.loading = true
      Service.getAllRoles(this.data.roles).then(result => {
        if (result.isSuccess) {
          this.roles.splice(0, this.roles.length, ...result.data)
        }
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    // ==================================================
    submit () {
      Service.updateUserRoles({
        id: this.data.id,
        ids: this.checked
      }).then(result => {
        if (result.isSuccess) {
          this.$Message.success('修改成功')
          this.close()
          this.$emit('success', 'edit')
        } else {
          this.$Message.error(`修改失败,${result.message}`)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
