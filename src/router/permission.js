import router from './index'
import{api_men} from '../assets/api/index'
import { getAsyncRoutes } from './asyncRouter'

router.beforeEach( async (to, from, next) => {
    document.title = to.meta.title;
    // 后台动态菜单请求
   await  api_men().then((res)=>{
             next();
            console.log(res)
            var accessRoutes = getAsyncRoutes(res.data)
            accessRoutes.forEach((value, index) => {
                router.addRoute(value)
              })
                // router.addRoute(accessRoutes)
            console.log(router)
            console.log(router.options)
            console.log(router.options.routes)
        }).catch((err)=>{
        console.log(err)
        
            
        })
    // // 获取用户token，用来判断当前用户是否登录
    // const hasToken = getToken()
    // if (hasToken) {
    //     if (to.path === '/login') {
    //         next({ path: '/' })
    //        
    //     } else {
    //         //异步获取store中的路由
    //         let route = await store.state.addRoutes;
    //         const hasRouters = route && route.length>0;
    //         //判断store中是否有路由，若有，进行下一步
    //         if ( hasRouters ) {
    //             next()
    //         } else {
    //             //store中没有路由，则需要获取获取异步路由，并进行格式化处理
    //             try {
    //                 const accessRoutes = getAsyncRoutes(await store.state.addRoutes );
    //                 // 动态添加格式化过的路由
    //                 router.addRoutes(accessRoutes);
    //                 next({ ...to, replace: true })
    //             } catch (error) {
    //                 // Message.error('出错了')
    //                 next(`/login?redirect=${to.path}`)
    //                
    //             }
    //         }
    //     }
    // } else {
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next()
    //     } else {
    //         next(`/login?redirect=${to.path}`)
    //        
    //     }
    // }
}) 