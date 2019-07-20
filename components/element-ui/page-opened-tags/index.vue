<template>
  <div class="page-opened-tags">
    <div class="left">
      <span @click="manualscroll(1)">
        <icon icon="el-icon-arrow-left" />
      </span>
    </div>
    <div class="con"
         @DOMMouseScroll="handlescroll"
         @mousewheel="handlescroll"
         ref="scrollCon">
      <div class="body"
           :style="{left: left + 'px'}"
           ref="scrollBody">
        <transition-group name="taglist-moving-animation">
          <!-- eslint-diabled -->
          <!-- <el-tag
            :closable="!isActive(item)"
            :type="`${isActive(item)?'primary':'info'}`"
            size="mini"
            checkable
            v-for="(item,index) in $store.state.app.openedPageTags"
            :key="index + 0"
            ref="tags"
            @click.native="linkTo(item)"
            @on-close="close(index)"
          >{{item.title}}</el-tag> -->
          <router-link v-for="(item,index) in $store.state.app.openedPageTags"
                       ref="tags"
                       :key="index + 0"
                       :class="isActive(item)?'active':''"
                       :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
                       tag="span"
                       class="tags-item"
                       @click.middle.native="close(index)"
                       @contextmenu.prevent.native="openMenu(item, index,$event)">
            {{item.title}}
            <span v-if="!isActive(item)"
                  class="el-icon-close"
                  @click.prevent.stop="close(item,index)" />
          </router-link>
        </transition-group>
      </div>
    </div>
    <div class="right">
      <!-- <span>
        <Dropdown trigger="click">
          <Icon type="md-menu" style="width:36px" />
          <DropdownMenu slot="list">
              <DropdownItem @click.native="closeOther">关闭其他</DropdownItem>
              <DropdownItem @click.native="closeAll">关闭全部</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span> -->
      <span @click="manualscroll(-1)">
        <icon icon="el-icon-arrow-right" />
      </span>
    </div>
    <ul v-show="contextmenu.visible"
        :style="{left:contextmenu.left+'px',top:contextmenu.top+'px'}"
        class="contextmenu">
      <li @click="refresh($store.state.app.openedPageTags[contextmenu.index], contextmenu.index)">
        刷新
      </li>
      <li @click="close($store.state.app.openedPageTags[contextmenu.index], contextmenu.index)"
          v-if="contextmenu.item && !isActive(contextmenu.item)">
        关闭
      </li>
      <li @click="closeOther($store.state.app.openedPageTags[contextmenu.index], contextmenu.index)">
        关闭其他
      </li>
      <li @click="closeAll">
        关闭全部
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      left: 0,
      currentPos: -1,
      contextmenu: {
        item: null,
        index: -1,
        visible: false,
        top: 0,
        left: 0
      }
    }
  },
  watch: {
    $route: {
      handler: function (value) {
        if (!value.name) {
          return
        }
        let page = value
        let target = {
          fullPath: page.fullPath,
          path: page.path,
          title: page.meta.title,
          name: page.name,
          params: page.params,
          query: page.query,
          hash: page.hash,
          meta: page.meta
        }
        // 遍历标签页，判断是否已经打开过该标签
        let isExist = false
        let pos = -1
        for (let i = 0; i < this.$store.state.app.openedPageTags.length; i++) {
          let element = this.$store.state.app.openedPageTags[i]
          // if (JSON.stringify(target) === JSON.stringify(element)) {
          if (target.name === element.name) {
            isExist = true
            pos = i
            break
          }
        }
        if (!isExist) {
          // 目标页面没有被打开过
          this.$store.dispatch('AppOpenNewPage', target)
        } else {
          // 目标页面之前被打开，则更新参数
          this.$store.dispatch('UpdateOpenNewPage', { pos, target })
        }
        if (pos === -1) {
          pos = this.$store.state.app.openedPageTags.length - 1
        }
        // 记录当前激活的位置
        this.currentPos = pos
        this.$nextTick(() => {
          this.movetoView(this.$refs.tags[pos].$el)
        })
      },
      immediate: true
    },
    'contextmenu.visible' (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    // 滚轮触发
    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.scroll(delta)
      e.stopPropagation()
      e.preventDefault()
    },
    // 手动出发
    manualscroll (type) {
      let delta = 0
      if (type > 0) {
        delta = 1 * 40
      } else {
        delta = -1 * 40
      }
      this.scroll(delta)
    },
    // 标签移动
    scroll (delta) {
      let left = 0
      if (delta > 0) {
        // 向右移动
        left = Math.min(0, this.left + delta)
      } else {
        // 向左移动
        if (
          this.$refs.scrollCon.offsetWidth < this.$refs.scrollBody.offsetWidth
        ) {
          // 可视区右侧存在标签
          if (
            this.left <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth
            )
          ) {
            // 已经是最右了
            left = this.left
          } else {
            // 向左移动
            left = Math.max(
              this.left + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth
            )
          }
        } else {
          // 可视区右侧不存在标签
          this.left = 0
        }
      }
      this.left = left
    },
    // 是否是激活状态
    isActive (item) {
      let current = this.$route
      current = {
        title: current.meta.title,
        name: current.name,
        params: current.params,
        query: current.query,
        hash: current.hash
      }
      // if (JSON.stringify(item) === JSON.stringify(current)) {
      if (item.name === current.name) {
        return true
      } else {
        return false
      }
    },
    // 将标签移动到可视区域
    movetoView (tag) {
      if (tag.offsetLeft < -this.left) {
        // 标签在可视区域左侧
        // console.log('在左侧')
        this.left = Math.min(0, -tag.offsetLeft + 10)
      } else if (
        tag.offsetLeft + 10 > -this.left &&
        tag.offsetLeft + tag.offsetWidth <
          -this.left + this.$refs.scrollCon.offsetWidth - 10
      ) {
        // 标签在可视区域
        // console.log('在可视区域')
        // this.left = Math.min(0, this.$refs.scrollCon.offsetWidth - tag.offsetWidth - 10)
      } else {
        // 标签在可视区域右侧
        // console.log('在右侧')
        this.left = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - tag.offsetWidth) +
          10
        )
      }
    },
    // 跳转到指定页面
    linkTo (item) {
      this.$router.push({
        path: item.path,
        query: item.query,
        params: item.params
      })
    },
    // 关闭指定标签
    close (page, index) {
      this.$store.dispatch('AppClosePage', { page, index })
    },
    // 关闭其他标签
    closeOther (item, index) {
      this.linkTo(item)
      this.$nextTick(() => {
        this.$store.dispatch('AppCloseOtherPage', this.currentPos)
        this.currentPos = 0
        this.movetoView(this.$refs.tags[this.currentPos].$el)
      })
    },
    // 关闭全部标签
    closeAll () {
      this.$store.dispatch('AppCloseAllPage')
      this.$router.push('/')
    },
    openMenu (item, index, e) {
      this.contextmenu.item = item
      this.contextmenu.index = index
      let el = this.$refs.tags[index].$el
      this.contextmenu.left = Math.max(
        el.offsetLeft + el.offsetWidth / 2 - 38 + 5,
        38
      )
      this.contextmenu.top = e.clientY - 50
      this.contextmenu.visible = true
    },
    closeMenu () {
      this.contextmenu.visible = false
    },
    refresh (page, index) {
      console.log(index)
      this.$store.dispatch('AppRefreshPage', { page, index }).then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + page.fullPath
          })
        })
      })
      // this.$store.dispatch('tagsView/delCachedView', view).then(() => {
      //   const { fullPath } = view
      //   this.$nextTick(() => {
      //     this.$router.replace({
      //       path: '/redirect' + fullPath
      //     })
      //   })
      // })
    }
  }
}
</script>

<style scoped lang="less">
.page-opened-tags {
  width: 100%;
  height: 34px;
  padding: 0 38px 0 38px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .left,
  .right {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #fafafa;
    line-height: 34px;
    text-align: center;
    font-size: 0;
    span {
      cursor: pointer;
      display: inline-block;
      width: 36px;
      height: 34px;
      line-height: 34px;
      font-size: 18px;
      &:hover {
        background: #efefef;
      }
    }
  }
  .left {
    left: 0;
    width: 36px;
    border-right: 1px solid rgba(99, 99, 99, 0.1);
  }
  .right {
    right: 0;
    border-left: 1px solid rgba(99, 99, 99, 0.1);
  }
  .con {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    .body {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: left 0.3s ease;
    }
  }
}

.tags-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
