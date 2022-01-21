import { Button,Row,Col,Input,checkbox,Form,message,Modal,Spin} from 'ant-design-vue';

//  存储组件列表 
const components = [
    Button,Row,Col,checkbox,Spin
];
const use = [
    Input,Form
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  use.forEach(component => {
    Vue.use(component)
  })
  Vue.config.globalProperties.$message = message;
  Vue.config.globalProperties.$Modal = Modal;
};

//判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue)
}

export default install



 