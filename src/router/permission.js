import router from './index'
import $store from '../store/index'
import {getAsyncRoutes} from './asyncRouter'
const outerPaths = ['/index/login','/index/register'];   //白名单

let falg = true;
router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title;
    const hasToken = localStorage.getItem('token');
    // 判断是否有token
   if(hasToken){
        if(to.path == '/login'){
            next({ path: '/' })
        }else{
            if(falg){
                let arr = getAsyncRoutes( $store.state.data);
                    console.log(arr)
                    arr.forEach((val) => {
                        router.addRoute(val)
                    }) 
                    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                falg  = false;
            }else{
                next();
            }
        }
   }else{
    //    放行白名单
     if(outerPaths.includes(to.path)){
        next();
     }else{
        //  全部重定向
        next({path:"/"})
     }
   }
 
}) 