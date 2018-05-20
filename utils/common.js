/**
 * 通用工具库
 */
export default {
  /**
   * 给方法加上前缀
   * @param {String} method 方法名
   * @param {String} prefix 前缀名
   */
  prefixMethod (method, prefix) {
    if (prefix) {
      return prefix + this.upperCaseFirstLetter(method)
    } else {
      return method
    }
  },
  /**
   * 单词首字母大写
   * @param {String} word 单词
   */
  upperCaseFirstLetter (word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1)
  }
}
