<!-- 登陆页面 -->
<template>
<div class='Login' :style="{background:`url(${login_img})0% 0% / cover`}">
    <canvas id="init"></canvas>
    <SonLogin/>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent,onMounted,ref } from "vue";
import SonLogin from '../sonmodule/login/SonLogin.vue'
import draw from'../assets/js/logincanvas'
export default defineComponent({
 components: {
    SonLogin,
  },
  setup(props) {
      let login_img = ref(require('../assets/image/bg.jpg'));//string number
   onMounted(() => {
      draw('init')
    })
     return {
            login_img
        
        }
  }

})
</script>
<style  scoped>
.Login {
     position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    zoom: 1;
}
</style>