import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate" ///vuex 持久化
import{api_men} from '../assets/api/index'
import { getAsyncRoutes } from '../router/asyncRouter'
import router from '../router/index'
export default createStore({
    state: {
        // 左边菜单栏选中展开
        "openKeys": [],
        // tabs 保存刷新后的值
        "panes": [],
        "data":[],  //保存动态路由数据
    },
    mutations: {
        //更新
        setopenKeys(state, key) {
            state.openKeys = [key]
        },
        setpanes(state, key) {
            state.panes = key
        },
        setData(state, key) {
            state.data = key
        }
    },
    actions: {
        // 后台请求菜单
        GET_ROUTERS_DATA(ctx){
            return new Promise(resolve =>{
                api_men().then((res) => {
                    console.log(res)
                    ctx.commit('setData', res.data);
                    resolve('起飞....')
                  }).catch((err) => {
                    console.log(err)
                })
                
            })
           
           
        }
        
    },
    modules: {},
    plugins: [createPersistedState({
        storage: window.localStorage
    })],
})
