<!-- 登陆界面 -->
<template>
  <div class="SonRegister">
    <!-- 左边登录 -->
    <div class="FromContainer SonRegisterLeft"></div>
    <!-- 右边注册 -->
    <div class="FromContainer SonRegisterRight">
      <h1>已经有账号！</h1>
      <p>点击登录注册进入系统</p>
      <a-button type="primary" danger>
        <router-link to="/index/login"> 登录</router-link>
        </a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style  scoped>
.SonRegister {
  width: 768px;
  height: 480px;
}
.SonRegisterLeft {
  float: left;
}
.SonRegisterRight {
  float: right;
  background: linear-gradient(to right, #366c78, #050002) no-repeat 0 0 / cover;
  opacity: 0.7;
  text-align: center;
}
.FromContainer {
  position: relative;
  width: 50%;
  height: 100%;
  padding: 40px 25px 15px 25px;
}
.SonRegisterRight h1 {
  color: #fff;
  font-size: 40px;
}
.SonRegisterRight p {
  color: #fff;
  font-size: 18px;
}
</style>