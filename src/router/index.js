import { createRouter, createWebHistory } from 'vue-router'

const routes = [
      {     //根目录登录页面
        path: '/',
        redirect: '/login',
        meta: {
            keepAlive: true,
        }
    },
    {  // 登陆
        path: '/login',
        name: "Login",
        meta: {
            title: '登陆'
        },
        component: () => import('../views/login')
    },
    {  // 注册
        path: '/register',
        name: "Register",
        meta: {
            title: '注册'
        },
        component: () => import('../views/register')
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

//  路由守卫 
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title
     next();
})
