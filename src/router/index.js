import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ //根目录
        path: '/',
        redirect: '/index',
        meta: {
            keepAlive: true,
        }
    },
    { // 首页
        path: '/index',
        name: "Index",
        redirect: '/index/login',
        meta: {
            title: '首页'
        },
        component: () =>
            import ('../views/index'),
        children: [{
                path: 'login',
                meta: {
                    title: '登录'
                },
                component: () =>
                    import ('../views/login'),
            },
            { // 注册
                path: 'register',
                name: "Register",
                meta: {
                    title: '注册'
                },
                component: () =>
                    import ('../views/register')
            }
        ]
    },
    { // 首页
        path: '/home',
        name: "Home",
        meta: {
            title: '首页',
            roles: ['0']
        },
        component: () =>
            import ('../views/home'),
        children: [{ // 用户管理
                path: '/userControl',
                name: "UserControl",
                meta: {
                    title: '用户管理',
                    roles: ['0']
                },
                component: () =>
                    import ('../views/userControl'),
            },
            { // 角色管理
                path: '/roleControl',
                name: "RoleControl",
                meta: {
                    title: '角色管理',
                    roles: ['0']
                },
                component: () =>
                    import ('../views/roleControl'),
            },
            { // 云空间
                path: '/cloud',
                name: "Cloud",
                meta: {
                    title: '云空间',
                    roles: ['0']
                },
                component: () =>
                    import ('../views/cloud'),
            },
            { // 云空间
                path: '/cloudNote',
                name: "CloudNote",
                meta: {
                    title: '云笔记',
                    roles: ['0']
                },
                component: () =>
                    import ('../views/cloudNote'),
            }
        ]
    },
    { // 不存在页面
        path: '/err',
        name: "err",
        meta: {
            title: '404'
        },
        component: () =>
            import ('../views/err'),
    }



]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

//  路由守卫 
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    // 放行白名单
    const outerPaths = ['/index/login', '/index/register', '/err']; //白名单
    // 获取登陆权限
    const power = sessionStorage.getItem('power');
    if (!outerPaths.includes(to.path)) { //  过滤登陆页面  防止出现死循环 内存溢出
        //登陆后 防止用户用地址栏跳转没有权限的路由
        console.log(to.meta.roles)
        if (to.meta.roles.includes(power)) {
            next();
        } else {
            // 没有登陆，全部跳转到登陆页面
            next({ path: "/" })
        }
    } else {
        next();
    }
})