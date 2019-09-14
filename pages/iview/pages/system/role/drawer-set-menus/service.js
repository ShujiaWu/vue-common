import axios from 'axios'

/**
 * 获取所有的菜单 -- 左侧菜单树
 */
export function getAllMenus (checkeds) {
  return axios.get('rbac/menu/all').then(result => {
    if (result.isSuccess) {
      initMenuData(result.data, null, checkeds)
    }
    return result
  })
}

function initMenuData (menus, parent, checkeds) {
  menus.forEach(item => {
    // 设置树的状态
    item.expand = true
    item.checked = false
    item.selected = false
    console.log(item.id, checkeds.includes(item.id))
    if (checkeds.includes(parseInt(item.id))) {
      item.checked = true
    }
    item.level = parent ? [].concat(parent.level) : []
    item.level.push(item)
    if (item.children && item.children.length) {
      // 有下一级
      // 递归处理
      initMenuData(item.children, item, checkeds)
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

export function updateRoleMenus (data) {
  const params = {
    roleId: data.id,
    permissionIds: data.ids
  }
  return axios.post('rbac/role/edit/permissions', params)
}
