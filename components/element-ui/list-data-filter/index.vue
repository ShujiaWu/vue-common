<template>
  <div class="filter-area">
    <template v-for="(field,key) in data.fields">
      <!-- 输入框 -->
      <el-input v-if="field.type === 'input'"
                v-model="field.value"
                :placeholder="field.placeholder"
                :style="field.style"
                class="filter-item"
                :key="key" />
      <!-- 选择框 -->
      <el-select v-if="field.type === 'options'"
                v-model="field.value"
                 :placeholder="field.placeholder"
                 clearable
                 :style="field.style"
                 class="filter-item"
                 :key="key">
        <el-option v-for="item in field.options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
    </template>
    <slot name="field-append"></slot>
    <template v-for="(button,key) in data.buttons">
      <el-button :type="button.type"
                 :key="key"
                 @click="button.method">
        <icon :icon="button.icon"
              v-if="button.icon" />
        {{ button.label }}
      </el-button>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-area {
  margin-bottom: 10px;
}
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
