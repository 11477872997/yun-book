import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入 ant-design-vue ui 库
import antDesignVueUi from './assets/js/antDesignVueUi'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(antDesignVueUi);
app.mount('#app');
