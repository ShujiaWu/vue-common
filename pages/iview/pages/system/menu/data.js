export default () => [
  {
    id: '0', // ID
    parentId: undefined, // 父级ID
    title: '顶部菜单1', // 标题
    titleEn: 'TopMenu', // 标题(En)
    name: undefined, // 名称
    icon: 'ios-settings', // 图标
    path: undefined, // 路径
    url: undefined, // 第三方页面地址
    component: undefined, // 组件路径
    sortOrder: 0,
    showAlways: 0, // 是否一直显示
    fnType: undefined, // 功能类型
    enable: 1, // 状态
    children: [
      {
        id: '1-1', // ID
        parentId: undefined, // 父级ID
        title: '单个菜单', // 标题
        titleEn: undefined, // 标题(En)
        name: 'Menu-1-1', // 名称
        icon: 'ios-settings', // 图标
        path: 'system/menu/1-1', // 路径
        url: undefined, // 第三方页面地址
        component: 'pages/menu-1-1', // 组件路径
        sortOrder: 0,
        showAlways: 0, // 是否一直显示
        fnType: undefined, // 功能类型
        enable: 1 // 状态
      },
      {
        id: '1-2', // ID
        parentId: undefined, // 父级ID
        title: '菜单组', // 标题
        titleEn: undefined, // 标题(En)
        name: 'Menu-1-2', // 名称
        icon: 'ios-settings', // 图标
        path: 'system/menu/2-1', // 路径
        url: undefined, // 第三方页面地址
        component: 'layout/Main', // 组件路径
        sortOrder: 0,
        showAlways: 0, // 是否一直显示
        fnType: undefined, // 功能类型
        enable: 1, // 状态
        children: [
          {
            id: '1-2-1', // ID
            parentId: undefined, // 父级ID
            title: '子菜单', // 标题
            titleEn: undefined, // 标题(En)
            name: 'Menu-1-2-1', // 名称
            icon: 'ios-settings', // 图标
            path: 'system/menu/1-2-1', // 路径
            url: undefined, // 第三方页面地址
            component: 'pages/menu-2-1', // 组件路径
            sortOrder: 0,
            showAlways: 0, // 是否一直显示
            fnType: undefined, // 功能类型
            enable: 1 // 状态
          },
          {
            id: '1-2-2', // ID
            parentId: undefined, // 父级ID
            title: '子菜单-搜索', // 标题
            titleEn: undefined, // 标题(En)
            name: 'Menu-1-2-2', // 名称
            icon: 'ios-settings', // 图标
            path: 'system/menu/1-2-2', // 路径
            url: undefined, // 第三方页面地址
            component: 'pages/menu-2-2', // 组件路径
            sortOrder: 0,
            showAlways: 0, // 是否一直显示
            fnType: undefined, // 功能类型
            enable: 1, // 状态
            children: [
              {
                id: '1-2-2-1', // ID
                parentId: undefined, // 父级ID
                title: '功能点1-搜索', // 标题
                titleEn: undefined, // 标题(En)
                name: undefined, // 名称
                icon: 'ios-settings', // 图标
                path: '/api/*', // 路径
                url: undefined, // 第三方页面地址
                component: undefined, // 组件路径
                sortOrder: 0,
                showAlways: 0, // 是否一直显示
                fnType: 'add', // 功能类型
                enable: 1 // 状态
              },
              {
                id: '1-2-2-2', // ID
                parentId: undefined, // 父级ID
                title: '功能点1', // 标题
                titleEn: undefined, // 标题(En)
                name: undefined, // 名称
                icon: 'ios-settings', // 图标
                path: '/api/*', // 路径
                url: undefined, // 第三方页面地址
                component: undefined, // 组件路径
                sortOrder: 0,
                showAlways: 0, // 是否一直显示
                fnType: 'delete', // 功能类型
                enable: 1 // 状态
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '1', // ID
    parentId: undefined, // 父级ID
    title: '顶部菜单2', // 标题
    titleEn: 'TopMenu', // 标题(En)
    name: undefined, // 名称
    icon: 'ios-settings', // 图标
    path: undefined, // 路径
    url: undefined, // 第三方页面地址
    component: undefined, // 组件路径
    sortOrder: 0,
    showAlways: 0, // 是否一直显示
    fnType: undefined, // 功能类型
    enable: 1, // 状态
    children: [
      {
        id: '0', // ID
        parentId: undefined, // 父级ID
        title: '菜单1', // 标题
        titleEn: 'TopMenu', // 标题(En)
        name: undefined, // 名称
        icon: 'ios-settings', // 图标
        path: undefined, // 路径
        url: undefined, // 第三方页面地址
        component: undefined, // 组件路径
        sortOrder: 0,
        showAlways: 0, // 是否一直显示
        fnType: undefined, // 功能类型
        enable: 1 // 状态
      }
    ]
  }
]
