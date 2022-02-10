import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate" ///vuex 持久化

export default createStore({
    state: {
        // 左边菜单栏选中展开
        "openKeys": [],
        // tabs 保存刷新后的值
        "panes": []
    },
    mutations: {
        //更新
        setopenKeys(state, key) {
            state.openKeys = [key]
        },
        setpanes(state, key) {
            state.panes = key
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
})