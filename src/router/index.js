import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

/* Router Modules */

Vue.use(Router)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 静态路由
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: '首页', icon: 'dashboard', affix: true}
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goodsList',
    meta: {title: '商品中心', icon: 'el-icon-s-goods'},
    children: [
      {
        path: 'goodsList',
        component: () => import('@/views/goods/goodsList'),
        name: 'goodsList',
        meta: {title: '商品列表', icon: ''}
      },
      {
        path: 'updateGoods',
        component: () => import('@/views/goods/update'),
        name: 'updateGoods',
        meta: {title: '商品信息'},
        props: true,
        hidden: true
      },
      {
        path: 'addGoods',
        component: () => import('@/views/goods/add'),
        name: 'addGoods',
        meta: {title: '商品信息'},
        props: true,
        hidden: true
      },
      {
        path: 'goodsCategory',
        component: () => import('@/views/goods/goodsCategory'),
        name: 'goodsCategory',
        meta: {title: '商品分类', icon: ''}
      },
      {
        path: 'banner',
        component: () => import('@/views/goods/banner'),
        name: 'banner',
        meta: {title: '轮播图管理', icon: ''}
      },
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: '/promotion/seckill',
    meta: {title: '营销中心', icon: 'el-icon-orange'},
    children: [
      {
        path: 'seckill',
        component: () => import('@/views/promotion/seckill'),
        name: 'seckill',
        meta: {title: '秒杀活动', icon: ''}
      },
      {
        path: 'recommend',
        component: () => import('@/views/promotion/recommend'),
        name: 'recommend',
        meta: {title: '人气推荐'}
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    name: 'order',
    redirect: '/order/orderInfo',
    meta: {title: '订单中心', icon: 'el-icon-s-order'},
    children: [
      {
        path: 'orderInfo',
        component: () => import('@/views/order/orderInfo'),
        name: 'orderInfo',
        meta: {title: '订单详情', icon: ''}
      },
      {
        path: 'comment',
        component: () => import('@/views/order/comment'),
        name: 'comment',
        meta: {title: '评价管理'}
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: 'member',
    redirect: '/member/memberList',
    meta: {title: '会员管理', icon: 'el-icon-s-custom'},
    children: [
      {
        path: 'memberList',
        component: () => import('@/views/member/memberList'),
        name: 'memberList',
        meta: {title: '会员中心'}
      }
    ]
  },
  {
    path: '/operation',
    component: Layout,
    name: 'operation',
    redirect: '/operation/es',
    meta: {title: '运营设置', icon: 'el-icon-search'},
    children: [
      {
        path: 'operation',
        component: () => import('@/views/operation/es'),
        name: 'operation',
        meta: {title: '搜索分词'}
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: {title: '个人信息', icon: 'user', noCache: true}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 动态路由
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin'] //TODO 拥有admin角色才能显示此菜单
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'UserPermission',
        meta: {
          title: '用户管理',
          roles: ['admin']
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: {title: 'Create Article', icon: 'edit'}
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: {title: 'Edit Article', noCache: true, activeMenu: '/example/list'},
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: {title: 'Article List', icon: 'list'}
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
