import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/home'

// 公共路由
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
        component: () => import('../views/index'),
        children: [{
            path: 'login',
            meta: {
                title: '登录'
            },
            component: () =>
                import('../views/login'),
        },
        { // 注册
            path: 'register',
            name: "Register",
            meta: {
                title: '注册'
            },
            component: () =>
                import('../views/register')
        }
        ]
    },
     { // 主体
        path: '/home',
        name: "home",
        redirect: '/home/box',
        component:Layout,
        hidden:false,
        meta: {
            title: '首页',
            icon: "icon-twitter",
            id: "0",
            key: "/home/box",
            pageUrl: "/home/box",
            text: "首页"
        },
        children: [{ 
                path: 'box',
                name: "box",
                meta: {
                },
                component: () =>
                    import ('../views/box'),
            },
        ]

    },
    // { // 系统管理
    //     path: '/system',
    //     name: "system",
    //     redirect: '/system/userControl',
    //     component:Layout,
    //     alwaysShow:true,
    //     meta: {
    //         title: '系统管理',
    //         icon: "icon-qunzhu",
    //         key: "system",
    //         id: "1",
    //         text: "系统管理",
    //         pageUrl:""
    //     },
    //     children: [
    //         { // 用户管理
    //             path: 'userControl',
    //             name: "UserControl",
    //             meta: {
    //                 title: '用户管理',
    //                 id:"0",
    //                 key:"/system/userControl",
    //                 icon: "",
    //                 pageUrl: "/system/userControl",
    //                 text: "用户管理"
    //             },
    //             component: () =>
    //                 import ('../views/system/userControl'),
    //         },
    //         { // 角色管理
    //             path: 'roleControl',
    //             name: "RoleControl",
    //             meta: {
    //                 title: '角色管理',
    //                 id: "1",
    //                 key: "/system/roleControl",
    //                 icon: "",
    //                 pageUrl: "/system/roleControl",
    //                 text: "角色管理"
    //             },
    //             component: () =>
    //                 import ('../views/system/roleControl'),
    //         },

    //     ]

    // },
    // { // 系统管理
    //     path: '/management',
    //     name: "management",
    //     redirect: '/management/cloud',
    //     component: Layout,
    //     meta: {
    //         title: '云管理',
    //         icon: "icon-xinjian",
    //         key: "management",
    //         id: "1",
    //         text: "云管理",
    //         pageUrl:""
    //     },
    //     alwaysShow:true,
    //     children: [
    //         { // 云空间
    //         path: 'cloud',
    //         name: "Cloud",
    //         meta: {
    //             title: '云空间',
    //             id: "0",
    //             key: "/management/cloud",
    //             icon: "",
    //             pageUrl: "/management/cloud",
    //             text: "云空间"
    //         },
    //         component: () =>
    //             import ('../views/management/cloud'),
    //     },
    //     { // 云空间
    //         path: 'cloudNote',
    //         name: "CloudNote",
    //         meta: {
    //             title: '云笔记',
    //             id: "1",
    //             key: "/management/cloudNote",
    //             icon: "",
    //             pageUrl: "/management/cloudNote",
    //             text: "云笔记"
    //         },
    //         component: () =>
    //             import ('../views/management/cloudNote'),
    //     }

    //     ]

    // },

]





const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})




export default router


