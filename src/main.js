import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'
import './router/permission'
// 按需引入 ant-design-vue ui 库
import antDesignVueUi from './assets/js/antDesignVueUi'



createApp(App).use(store).use(router).use(antDesignVueUi).mount('#app');