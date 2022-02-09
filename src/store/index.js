import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate" ///vuex 持久化

export default createStore({
    state: {
        "openKeys": []
    },
    mutations: {
        setopenKeys(state, key) {
            // console.log(key)
            state.openKeys = [key]
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        storage: window.sessionStorage

    })],
})