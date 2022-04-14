import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/home'
/**
 * hidden 菜单栏过滤不显示
 * alwaysShow 只显示一级菜单
 */

// 静态路由
const routes = [
    { //根目录
        path: '/',
        redirect: '/index',
        hidden:true
    },
    { // 首页
        path: '/index',
        name: "index",
        redirect: '/index/login',
        hidden:true,
        meta: {
            title: '首页',
        },
        component: () => import('@/views/index'),
        children: [{
            path: 'login',
            meta: {
                title: '登录'
            },
            component: () =>
                import('@/views/login'),
        },
        { // 注册
            path: 'register',
            name: "Register",
            meta: {
                title: '注册'
            },
            component: () =>
                import('@/views/register')
        }
        ]
    },
      {
        path: '/:pathMatch(.*)*',    // 捕获所有路由或 404 Not found 路由
        hidden:true,
        meta: {
            title: '页面不存在',
            icon: "",
            id: "",
            key: "",
            pageUrl: "",
            text: "页面不存在"
        },
        component: () => import('@/views/error/404')
      }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})






export default router


