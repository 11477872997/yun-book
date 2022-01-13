import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';
// 按需引入 ant-design-vue ui 库
import antDesignVueUi from './assets/js/antDesignVueUi'

//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]
// axios.interceptors.request.use( config =>{ // 请求拦截
//   return config;
// }, error =>{
//   return Promise.reject(error);
// });
// axios.interceptors.response.use( response =>{ // 响应拦截
//   // let res = response.data;
//   return response;
// }, error =>{
//   return Promise.reject(error);
// });


const app = createApp(App);
app.use(store);
app.use(router);
app.use(antDesignVueUi);
app.mount('#app');
