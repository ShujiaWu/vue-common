<template>
  <div class="filter-area">
    <template v-for="(field,key) in data.fields">
      <!-- 输入框 -->
      <el-input v-if="field.type === 'input'"
                v-model="field.value"
                :placeholder="field.placeholder"
                :style="field.style"
                class="filter-item"
                :size="size"
                :key="key" />
      <!-- 选择框 -->
      <el-select v-if="field.type === 'options'"
                 v-model="field.value"
                 :placeholder="field.placeholder"
                 clearable
                 :style="field.style"
                 class="filter-item"
                 :key="key"
                 :size="size">
        <el-option v-for="item in field.options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
      <!-- 级联 -->
      <el-cascader :placeholder="field.placeholder"
                   v-if="field.type === 'cascader'"
                   :options="field.options"
                   v-model="field.value"
                   class="filter-item"
                   filterable
                   :key="key"
                   :size="size" />
      <!-- 日期选择 -->
      <el-date-picker v-if="field.type === 'datetime'"
                      :key="key"
                      v-model="field.value"
                      :placeholder="field.placeholder"
                      :format="field.format"
                      :style="field.style"
                      class="filter-item"
                      :type="field.showType"
                      :size="size"
                      :start-placeholder="field.startPlaceholder"
                      :end-placeholder="field.endPlaceholder"
                      :range-separator="field.rangeSeparator" />
    </template>
    <slot name="field-append"></slot>
    <template v-for="(button,key) in data.buttons">
      <el-button :type="button.type"
                 :key="key"
                 @click="button.method"
                 class="filter-item"
                 :size="size">
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
    },
    size: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-area {
  // margin-bottom: 10px;
}
.filter-item {
  vertical-align: middle;
  margin-bottom: 10px;
}

.el-button + .el-button {
  margin-left: 5px;
}
</style>

<style lang="less">
.el-date-editor .el-range-separator {
  width: auto;
}
</style>
