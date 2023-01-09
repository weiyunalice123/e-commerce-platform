import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect:'goods',//设置重定向
    component: Home,
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('../views/GoodsView.vue')
      }, {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('../views/UserView.vue')
      }, {
        path: 'role',
        name: 'role',
        meta: {
          isShow: true,
          title: '角色列表'
        },
        component: () => import('../views/RoleView.vue')
      }, {
        path: 'authority',
        name: 'authority',
        meta: {
          isShow: false,//默认不展示
          title: '权限列表'
        },
        component: () => import('../views/AuthorityView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//没有登陆的时候，其他页面是不能访问的，所以用到路由守卫
//全局前置路由守卫，初始化执行，每次路由切换前执行
//3个参数，to是要跳转的目标路由，from是从那个路由进行跳转
//next：不做任何阻拦，直接通行，该往哪个路由跳转就往哪个跳转
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token")
  //没有获取到token，并且当前路由不是登录页面，则跳转到登陆页面
  if(!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
