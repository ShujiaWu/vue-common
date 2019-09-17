<template>
  <div class="number-range">
    <div class="number-range-box">
      <el-input-number v-model="data[0]"
                       controls-position="right"
                       :controls="false"
                       :min="min"
                       :size="size"
                       :placeholder="palaceholderMin"
                       :max="firstMaxValue"
                       class="min"></el-input-number>
      <span class="separator"> {{rangeSeparator}} </span>
      <el-input-number v-model="data[1]"
                       controls-position="right"
                       :controls="false"
                       :min="secondMinValue"
                       :placeholder="palaceholderMax"
                       :max="max"
                       class="max"></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberRange',
  props: {
    value: {
      type: [Array, undefined],
      default: () => []
    },
    size: {
      type: String,
      default: undefined
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    palaceholderMin: {
      type: String,
      default: ''
    },
    palaceholderMax: {
      type: String,
      default: ''
    },
    rangeSeparator: {
      type: String,
      default: '-'
    }
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    firstMaxValue () {
      if (this.data[1] !== undefined) {
        return this.data[1]
      }
      return this.max
    },
    secondMinValue () {
      if (this.data[0] !== undefined) {
        return this.data[0]
      }
      return this.min
    }
  },
  watch: {
    value: {
      deep: true,
      handler (val, old) {
        if (val !== old) {
          if (val && val.length) {
            this.data.splice(0, this.data.length, ...val)
          } else {
            this.data.splice(0, this.data.length)
          }
        }
      }
    },
    data: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.number-range {
  display: inline-block;
  vertical-align: top;
  &-box {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .min,
    .max {
      flex: 1;
    }
    .separator {
      padding: 0 8px;
      color: #c0c4cc;
    }
  }
}
</style>
