import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: "/",
    component: HomeView,
    redirect: "/frontpage"
  },
  {
    path: "/",
    name: 'frontpage',
    component: HomeView,
    children: [
      // 首页
      {
        path: "frontpage",
        name: 'frontpage',
        component: () => import("../views/FrontPage.vue")
      },
      // 用户管理
      {
        path: "usermanage",
        name: "usermanage",
        component: () => import("../views/UserManage.vue")
      },
      // 景点管理
      {
        path: "attractions",
        name: "attractions",
        component: () => import("../views/Attractions.vue")
      },
      // 文章管理
      {
        path: "article",
        name: "article",
        component: () => import("../views/ArticleManage.vue")
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("../components/Editor.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  // console.log(to, from)
  // 路由守卫判断是否注册，进行跳转页面
  if (to.path !== "/login") {
    const userInfo = window.localStorage.getItem("userInfo")
    if (!userInfo) {
      console.log("请登录注册账号")
      return { path: "/login" }
    }
  }
})

export default router
