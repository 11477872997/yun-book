import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {     //根目录
        path: '/',
        redirect: '/index',
        meta: {
            keepAlive: true,
        }
    },
    {  // 首页
        path: '/index',
        name: "Index",
        redirect: '/index/login',
        meta: {
            title: '首页'
        },
        component: () => import('../views/index'),
        children: [
            {
                path: 'login',
                meta: {
                    title: '登录'
                },
                component: () => import('../views/login'),
            },
            {  // 注册
                path: 'register',
                name: "Register",
                meta: {
                    title: '注册'
                },
                component: () => import('../views/register')
            }
        ]
    },
    {  // 首页
        path: '/home',
        name: "Home",
        meta: {
            title: '首页'
        },
        component: () => import('../views/home'),
        children:[
            {  // 用户管理
                path: '/userControl',
                name: "UserControl",
                meta: {
                    title: '用户管理'
                },
                component: () => import('../views/userControl'),
            },
            {  // 角色管理
                path: '/roleControl',
                name: "RoleControl",
                meta: {
                    title: '角色管理'
                },
                component: () => import('../views/roleControl'),
            },
            {  // 云空间
                path: '/cloud',
                name: "Cloud",
                meta: {
                    title: '云空间'
                },
                component: () => import('../views/cloud'),
            },
            {  // 云笔记
                path: '/cloudNote ',
                name: "CloudNote",
                meta: {
                    title: '云笔记'
                },
                component: () => import('../views/cloudNote'),
            }
        ]
    }

   

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

//  路由守卫 
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next();
})
