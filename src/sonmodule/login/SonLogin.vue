<!-- 登陆界面 -->
<template>
<div class='SonLogin'>
    <!-- 左边登录 -->
    <div class="FromContainer SaonloginLeft">
      
    </div>
    <!-- 右边注册 -->
    <div class="FromContainer SaonloginRight">
      <div class="overlay">
          <div class="overlayFrom">
            
          </div>
      </div>
    </div>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'SonLogin',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

		
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.SonLogin{
   background: rgba(0,0,0,.5);
    border-radius: 10px;
    box-shadow: 4px 5px 4px 6px;
    position: relative;
    overflow: hidden;
    width: 768px;
    height: 480px;
    max-width: 100%;
    min-height: 480px;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.FromContainer{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
}
.SaonloginLeft{
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}
.SaonloginRight{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
}
.overlay {
    background: linear-gradient(to right, #366c78, #050002) no-repeat 0 0 / cover;
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}
.overlayFrom{
  position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}
</style>