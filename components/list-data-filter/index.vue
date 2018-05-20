<template>
  <div>
    <div class="search-area">
      <span v-for="(object,label) in data.fields" :key="label" v-if="!object.disabled">
        {{object.label}}：
        <!-- 下拉选项 -->
        <i-select v-model="object.text" :style="object.style" v-if="object.type == types.Options" @on-change="selectChange(label, object, ...arguments)" :size="size">
          <i-option v-for="option in object.options" :key="option.value" :value="option.value" :placeholder ="object.placeholder">{{option.label}}</i-option>
        </i-select>
        <!-- 下拉多选 -->
        <i-select v-model="object.text" :style="object.style" v-if="object.type == types.OptionsMulti" :multiple="true"  @on-change="selectChange(label, object, ...arguments)" :size="size">
          <i-option v-for="option in object.options" :key="option.value" :value="option.value" :placeholder ="object.placeholder">{{option.label}}</i-option>
        </i-select>
        <!-- 文本输入 -->
        <i-input :style="object.style" v-model="object.text" v-if="object.type == types.Input" :placeholder ="object.placeholder" :size="size"></i-input>
        <!-- 数字选择 -->
        <span  v-if="object.type == types.NumberArea">
          <i-input :style="object.style" v-model="object.text.min" :placeholder ="object.placeholder" :size="size"></i-input>
          -
          <i-input :style="object.style" v-model="object.text.max" :placeholder ="object.placeholder" :size="size"></i-input>
        </span>
        <!-- 日期选择-区间 -->
        <Date-picker v-if="object.type == types.DateTimeArea" v-model="object.text" :format="object.format" :size="size"
          :type="object.selectType" :placeholder="object.placeholder" :style="object.style" :options="object.options"></Date-picker>
        <!-- 日期选择-单个 -->
        <Date-picker v-if="object.type == types.DateTime" v-model="object.text" :format="object.format" :size="size"
          :type="object.selectType" :placeholder="object.placeholder" :style="object.style" :options="object.options"></Date-picker>
        <!-- 级联 -->
        <Cascader v-if="object.type == types.Cascader" :data="object.options" v-model="object.text"
          :style="object.style" :load-data="object.loadData" @on-change="cascaderChange(label, object, ...arguments)" :size="size"></Cascader>
      </span>
      <span>
        <i-button v-for="(object, label) in data.buttons" :key="label" class="margin-r-5" :size="size"
          :type="object.type" :icon="object.icon" @click.native="object.method()" :style="object.style">{{object.label}}</i-button>
      </span>
      <slot name="append"></slot>
    </div>

    <slot></slot>

    <Alert show-icon class="margin-t-10" v-if="data.showFilterContent && showFilterContent">
      当前是查询模式，查询条件为：
      <span v-for="(object,label,index) in data.fields" :key="index" v-if="showFilterContentItem(object)">
        <span v-if="object.type === types.Input">{{object.label}}：{{object.value}}</span>
        <span v-if="object.type === types.Options">{{object.label}}：{{getOptionsLabel(object.options,object.value)}}</span>
        <span v-if="object.type === types.OptionsMulti">{{object.label}}：{{getOptionsLabel(object.options,object.value)}}</span>
        <span v-if="object.type === types.NumberArea && (object.value.min || object.value.max)">{{object.label}}：{{object.value.min ? object.value.min : 0}} - {{object.value.max ? object.value.max : 'Max'}}</span>
        <span v-if="object.type === types.DateTimeArea">{{object.label}}：{{object.value[0] | datetime(object.format)}} - {{object.value[1] | datetime(object.format)}}</span>
        <span v-if="object.type === types.DateTime">{{object.label}}：{{object.value | datetime(object.format)}}</span>
        <span v-if="object.type === types.Cascader">{{object.label}}：{{cascader[label]}}</span>
      </span>
    </Alert>

  </div>
</template>

<script>
import Constant from '@common/filters/constant'
import Types from './types'
export default {
  name: 'ListDataFilter',
  props: {
    data: {
      type: Object,
      default () {
        return {
          fields: {},
          buttons: {}
        }
      }
    },
    size: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      types: Types,
      cascader: {}
    }
  },
  computed: {
    /**
     * ===========================================================
     *  计算是否显示搜索的条件
     * ===========================================================
     */
    showFilterContent () {
      let result = false
      for (var key in this.data.fields) {
        if (this.data.fields.hasOwnProperty(key)) {
          let object = this.data.fields[key]
          if (!object.disabled) {
            switch (object.type) {
              case Types.NumberArea:
                result = result || !!object.value.min || !!object.value.max
                break
              case Types.DateTimeArea:
                result = result || !!object.value[0] || !!object.value[1]
                break
              case Types.OptionsMulti:
              case Types.Cascader:
                result = result || (object.value && object.value.length > 0)
                break
              default:
                if (object.value === 0) {
                  result = result || !!(object.value + '')
                } else {
                  result = result || !!object.value
                }
            }
          }
        }
      }
      return result
    }
  },
  methods: {
    /**
     * ===========================================================
     *  获取静态变量对应的值
     * ===========================================================
     */
    getOptionsLabel (options, values) {
      if (values === undefined || values === null || values === '') {
        return
      }
      let valueArray = []
      if ((typeof values) === 'string') {
        valueArray = [values]
      } else {
        valueArray = values
      }
      let result = ''
      // valueArray.forEach((element) => {
      //   result += Constant.getLabelByValue(options, element) + ','
      // }, this)
      // result = result.substring(0, result.lastIndexOf(','))
      result = Constant(valueArray, options, 'v2l', true, ',')
      return result
    },
    /**
     * ===========================================================
     *  显示搜索的条件项
     * ===========================================================
     */
    showFilterContentItem (object) {
      if (!object.disabled) {
        switch (object.type) {
          case Types.NumberArea:
            return !!object.value.min || !!object.value.max
          case Types.OptionsMulti:
          case Types.Cascader:
            return object.value && object.value.length > 0
          case this.types.DateTimeArea:
            return object.value.length
          default:
            if (object.value === 0) {
              return !!(object.value + '')
            }
            return !!object.value
        }
      }
    },
    /**
     * ===========================================================
     *  级联选项改变
     * ===========================================================
     */
    cascaderChange (label, object, value, selectedData) {
      this.cascader[label] = selectedData[selectedData.length - 1].__label
      // 回调
      if (object.callback) {
        object.callback(value, selectedData)
      }
    },
    /**
     * ===========================================================
     *  下拉选项发生改变
     * ===========================================================
     */
    selectChange (label, object, value) {
      // 回调
      if (object.callback) {
        object.callback(value, object, value)
      }
    }
  }
}
</script>

<style scoped>
  .search-area {
    border: 1px solid #d7dde4;
    margin-bottom: 10px;
  }

  .search-area>span {
      padding: 10px;
      display: inline-block;
  }
</style>
