import { createRouter, createWebHistory, addRoutes } from 'vue-router'

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


    // { // 主体
    //     path: '/home',
    //     name: "home",
    //     redirect: '/home/box',
    //     component: () =>
    //         import ('../views/home'),
    //     children: [{ // 用户管理
    //             path: 'box',
    //             name: "box",
    //             meta: {
    //                 title: '首页'
    //             },
    //             component: () =>
    //                 import ('../views/box'),
    //         },
    //         { // 用户管理
    //             path: 'userControl',
    //             name: "UserControl",
    //             meta: {
    //                 title: '用户管理',
    //                 roles: ['0']
    //             },
    //             component: () =>
    //                 import ('../views/userControl'),
    //         },
    //         { // 角色管理
    //             path: 'roleControl',
    //             name: "RoleControl",
    //             meta: {
    //                 title: '角色管理',
    //                 roles: ['0']
    //             },
    //             component: () =>
    //                 import ('../views/roleControl'),
    //         },
    //         { // 云空间
    //             path: 'cloud',
    //             name: "Cloud",
    //             meta: {
    //                 title: '云空间',
    //                 roles: ['0']
    //             },
    //             component: () =>
    //                 import ('../views/cloud'),
    //         },
    //         { // 云空间
    //             path: 'cloudNote',
    //             name: "CloudNote",
    //             meta: {
    //                 title: '云笔记',
    //                 roles: ['0']
    //             },
    //             component: () =>
    //                 import ('../views/cloudNote'),
    //         }
    //     ]
    // },

    // { // 不存在页面
    //     path: '/err',
    //     name: "err",
    //     meta: {
    //         title: '404'
    //     },
    //     component: () =>
    //         import ('../views/err'),
    // }



]

let getRouter = [{
    // 主体
    "path": "/home",
    "name": "home",
    "redirect": "/home/box",
    "component": "/views/home",
    "children": [{
            // 首页
            "path": "box",
            "name": "box",
            "meta": {
                "title": "首页"
            },
            "component": "/views/box"
        },
        {
            // 用户管理
            "path": "userControl",
            "name": "UserControl",
            "meta": {
                "title": "用户管理"
            },
            "component": "/views/userContro"
        },
        { // 角色管理
            "path": "roleControl",
            "name": "RoleControl",
            "meta": {
                "title": "角色管理"
            },
            "component": "/views/roleControl"
        },
        { // 云空间
            "path": "cloud",
            "name": "Cloud",
            "meta": {
                "title": "云空间"
            },
            "component": "/views/cloud"
        },
        { // 云空间
            "path": "cloudNote",
            "name": "CloudNote",
            "meta": {
                "title": "云笔记"
            },
            "component": "/views/cloudNote"
        }
    ]
}]


const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    })
    //  路由守卫 

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (getRouter) {

        const routeList = getAsyncRoutes(getRouter);
        router.addRoute(routeList);
        // 路由 options 并不会随着 addRoutes 动态响应，所以要在这里进行设置
        // router.options.routes = routes.concat(routeList);
        // // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
        // next({...to, replace: true })
    } else {
        next();
    }



    console.log(router.options)

    // // 放行白名单
    // const outerPaths = ['/index/login', '/index/register', '/err']; //白名单
    // // 获取登陆权限
    // const power = sessionStorage.getItem('power');
    // if (!outerPaths.includes(to.path)) { //  过滤登陆页面  防止出现死循环 内存溢出
    //     //登陆后 防止用户用地址栏跳转没有权限的路由
    //     console.log(to.meta.roles)
    //     if (to.meta.roles.includes(power)) {
    //         next();
    //     } else {
    //         // 没有登陆，全部跳转到登陆页面
    //         next({ path: "/" })
    //     }
    // } else {

    // }
})

const getAsyncRoutes = arr => {
    return arr.map(({ path, name, component, meta, children }) => {
        const route = {
            path,
            name,
            meta: {
                ...meta,
                // 标记路由已经被配置了，如果项目需要的话，要在路由拦截器里根据这个值做相应的处理
                require: true
            },
            // 根据后台返回的 component 的路径，引入路由对应的组件
            component: () =>
                import (`@/${component}.vue`)
        };
        if (children) {
            // 如果存在 children，使用递归，将 children 也处理成我们需要的格式，并绑定给父级路由
            route.redirect = path + "/" + children[0].path;
            route.children = getAsyncRoutes(children);
        }
        return route;
    });
};


export default router