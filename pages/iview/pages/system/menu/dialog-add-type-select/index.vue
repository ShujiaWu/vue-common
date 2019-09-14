<template>
  <Modal :value="value"
         :mask-closable="false"
         footer-hide
         @on-cancel="close">
    <!-- 标题 -->
    <h3 slot="header"
        class="text-center">请选择添加类型</h3>
    <div class="text-center padding-t-40 padding-b-40">
      <Button type="dashed"
              @click="select('Menu')">
        <div class="padding-l-40 padding-r-40 padding-t-20 padding-b-20 text-16"
             style="width:140px">
          菜单
        </div>
      </Button>
      <Button type="dashed"
              class="margin-l-40"
              @click="select('Fn')">
        <div class="padding-l-40 padding-r-40 padding-t-20 padding-b-20 text-16"
             style="width:140px">
          功能
        </div>
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'Dialg_AddTypeSelect',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    select (value) {
      this.$emit('input', false)
      this.$emit('select', value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
