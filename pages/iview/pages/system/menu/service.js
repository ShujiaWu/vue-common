import data from './data'
import axios from 'axios'

/**
 * 获取所有的菜单 -- 左侧菜单树
 */
export function getAllMenus () {
  return axios.get('rbac/menu/all').then(result => {
    if (result.isSuccess) {
      initMenuData(result.data)
    }
    return result
  })
  // const dat = data()
  // initMenuData(dat)
  // return Promise.resolve({
  //   isSuccess: true,
  //   data: dat
  // })
}

/**
 * 添加菜单
 * @param {Object} data 菜单数据
 */
export function addMenu (data) {
  const params = {
    parentId: data.parentId, // 父级ID
    title: data.title, // 标题
    titleEn: data.titleEn, // 标题(En)
    name: data.name, // 名称
    icon: data.icon, // 图标
    path: data.path, // 路径
    url: data.url, // 第三方页面地址
    component: data.component, // 组件路径
    sortOrder: data.sortOrder,
    showAlways: data.showAlways, // 是否一直显示
    fnType: data.fnType, // 功能类型
    enable: data.enable, // 状态
    hidden: data.hidden // 隐藏
  }
  return axios.post('rbac/menu/add', params).then(result => {
    if (result.isSuccess) {
      const data = result.data
      result.data = {
        id: data.id,
        parentId: data.parentId, // 父级ID
        title: data.title, // 标题
        titleEn: data.titleEn, // 标题(En)
        name: data.name, // 名称
        icon: data.icon, // 图标
        path: data.path, // 路径
        url: data.url, // 第三方页面地址
        component: data.component, // 组件路径
        sortOrder: data.sortOrder,
        showAlways: data.showAlways, // 是否一直显示
        fnType: data.fnType, // 功能类型
        enable: data.enable, // 状态
        expand: true,
        checked: false,
        selected: false,
        level: undefined,
        parent: undefined
      }
    }
    return result
  })
}

/**
 * 修改菜单
 * @param {Object} data 菜单数据
 */
export function updateMenu (data) {
  const params = {
    id: data.id, // ID
    title: data.title, // 标题
    titleEn: data.titleEn, // 标题(En)
    name: data.name, // 名称
    icon: data.icon, // 图标
    path: data.path, // 路径
    url: data.url, // 第三方页面地址
    component: data.component, // 组件路径
    sortOrder: data.sortOrder,
    showAlways: data.showAlways, // 是否一直显示
    fnType: data.fnType, // 功能类型
    enable: data.enable, // 状态
    hidden: data.hidden // 隐藏
  }
  return axios.post('rbac/menu/edit', params).then(result => {
    if (result.isSuccess) {
      const data = result.data
      result.data = {
        id: data.id,
        parentId: data.parentId, // 父级ID
        title: data.title, // 标题
        titleEn: data.titleEn, // 标题(En)
        name: data.name, // 名称
        icon: data.icon, // 图标
        path: data.path, // 路径
        url: data.url, // 第三方页面地址
        component: data.component, // 组件路径
        sortOrder: data.sortOrder,
        showAlways: data.showAlways, // 是否一直显示
        fnType: data.fnType, // 功能类型
        enable: data.enable, // 状态
        expand: true,
        checked: false,
        selected: false,
        level: undefined,
        parent: undefined
      }
    }
    return result
  })
}

/**
 * 删除菜单
 * @param {Array} ids 菜单id数组
 */
export function removeMenu (ids) {
  const params = {
    ids
  }
  return axios.post('rbac/menu/del', params).then(result => {
    return result
  })
}

// function initMenuData (menus) {
//   console.log(menus)
//   menus.forEach(item => {
//     initMenuNodeData(item)
//   })
// }

// function initMenuNodeData (item, menu) {
//   // 设置树的状态
//   item.expand = true
//   item.checked = true
//   item.selected = false
//   if (item.children && item.children.length) {
//     // 有下一级
//     // 递归处理
//     item.children.forEach(children => {
//       initMenuNodeData(children, item)
//     })
//     // 子节点处理完 ===》处理当前的节点
//     // 计算当前节点的类型
//     if (item.children.some(value => value.type === 'Fn')) {
//       // 子节点中有 功能点 =》菜单
//       if (menu) {
//         // 有父级 == 》 菜单
//         item.type = 'Menu'
//       } else {
//         // 没有父级 == 》 顶部菜单
//         item.type = 'TopMenu'
//       }
//     } else {
//       if (menu) {
//         // 有父级 == 》 菜单组
//         item.type = 'MenuGroup'
//       } else {
//         // 没有父级 == 》 顶部菜单
//         item.type = 'TopMenu'
//       }
//     }
//   } else {
//     // 没有下一级
//     // 判断当前节点的类型
//     if (item.fnType) {
//       // 已经指定了功能类型 == 》 功能点
//       item.type = 'Fn'
//     } else {
//       if (menu) {
//         // 有父级 == 》 菜单
//         item.type = 'Menu'
//       } else {
//         // 没有父级 == 》 顶部菜单
//         item.type = 'TopMenu'
//       }
//     }
//   }
//   // 记录父级
//   item.parent = menu
// }

function initMenuData (menus, parent) {
  menus.forEach(item => {
    // 设置树的状态
    item.expand = true
    item.checked = false
    item.selected = false
    item.level = parent ? [].concat(parent.level) : []
    item.level.push(item)
    if (item.children && item.children.length) {
      // 有下一级
      // 递归处理
      initMenuData(item.children, item)
      // 子节点处理完 ===》处理当前的节点
      // 计算当前节点的类型
      if (item.children.some(value => value.type === 'Fn')) {
        // 子节点中有 功能点 =》菜单
        if (parent) {
          // 有父级 == 》 菜单
          item.type = 'Menu'
        } else {
          // 没有父级 == 》 顶部菜单
          item.type = 'TopMenu'
        }
      } else {
        if (parent) {
          // 有父级 == 》 菜单组
          item.type = 'MenuGroup'
        } else {
          // 没有父级 == 》 顶部菜单
          item.type = 'TopMenu'
        }
      }
    } else {
      // 没有下一级
      // 判断当前节点的类型
      if (item.fnType) {
        // 已经指定了功能类型 == 》 功能点
        item.type = 'Fn'
      } else {
        if (parent) {
          // 有父级 == 》 菜单
          item.type = 'Menu'
        } else {
          // 没有父级 == 》 顶部菜单
          item.type = 'TopMenu'
        }
      }
    }
    // 记录父级
    item.parent = parent
  })
}

export function filterMenu (keyword) {
  const dat = data()
  initMenuData(dat)
  return filterMenuData(keyword, dat)
}

function filterMenuData (keyword, menus) {
  if (keyword === '' || keyword === ' ' || keyword === null || keyword === undefined) {
    return menus
  }
  const children = []
  menus.forEach(item => {
    item.highlight = false
    // 深度优先
    if (item.children) {
      // 有子节点
      if (item.title.indexOf(keyword) >= 0) {
        // 当前菜单包含关键字
        console.log(item.title, '✅当前菜单包含关键字：', `_${keyword}_`, item.title.indexOf(keyword))
        item.highlight = true
        setHighLight(keyword, item)
        children.push(item)
      } else {
        console.log(item.title, '❎当前菜单没有关键字：', `_${keyword}_`, '遍历下一层')
        item.children = filterMenuData(keyword, item.children)
        if (item.children && !item.children.length) {
          console.log(item.title, '❎当前菜单没有子节点移除')
          // delete item.children
        } else {
          console.log(item.title, '✅当前菜单有子节点')
          children.push(item)
        }
      }
    } else {
      // 没有子节点
      if (item.title.indexOf(keyword) >= 0) {
        item.highlight = true
        children.push(item)
        console.log(item.title, '✅最底层节点包含关键字', `_${keyword}_`)
      } else {
        console.log(item.title, '❎最底层节点没有关键字', `_${keyword}_`)
      }
    }
  })
  console.log('-------------', children)
  return children
}

function setHighLight (keyword, menu) {
  if (menu.children) {
    // 有子节点
    menu.children.forEach(item => {
      setHighLight(keyword, item)
    })
  } else {
    if (menu.title.indexOf(keyword) >= 0) {
      menu.highlight = true
    }
  }
}

export function clearHighLight (menus) {
  menus.forEach(item => {
    item.highlight = false
    if (menus.children && menus.children.length) {
      clearHighLight(menus.children)
    }
  })
}
