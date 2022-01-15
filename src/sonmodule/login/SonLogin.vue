<!-- 登陆界面 -->
<template>
<div class='SonLogin'>
    <!-- 左边登录 -->
    <div class="FromContainer SaonloginLeft">
      <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
            >
            <a-input v-model:value="formState.username" />
            </a-form-item> 

            <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
            >
            <a-input-password v-model:value="formState.password" />
            </a-form-item> 

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item> 
        </a-form>
    </div>
    <!-- 右边注册 -->
    <div class="FromContainer SaonloginRight">
        <h1>没有账号？</h1>
        <p>点击按钮注册加入我们</p>
        <a-button type="primary" danger > 
            <router-link to="/index/register"> 注册</router-link>
        </a-button>
    </div>
</div>
</template>

<script>

import { defineComponent,reactive,getCurrentInstance } from "vue";
export default defineComponent({
  setup() {
let { proxy } = getCurrentInstance();
    const formState = reactive({
        username: '',
        password: '',
        remember: true,
    });

    const onFinish = values => {
  
      console.log('Success:', values);      
       proxy.$message.info('This is a normal message');
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
     
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
})

</script>
<style  scoped>
.SonLogin{
    width: 768px;
    height: 480px;
}
.SaonloginLeft{
    float: left;
}
.SaonloginRight{
    float: right;
    background: linear-gradient(to right, #366c78, #050002) no-repeat 0 0 / cover;
    opacity: 0.7;
    text-align: center;
}
.FromContainer{
    position: relative;
    width: 50%;
    height: 100%;
    padding: 40px 25px 15px 25px;
}
.SaonloginRight h1{
    color: #fff;
    font-size:40px;
}
.SaonloginRight p{
    color: #fff;
    font-size:18px;
}
</style>