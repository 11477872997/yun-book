<!-- 登陆界面 -->
<template>
  <div class="SonRegister">
    <!-- 左边登录 -->
    <div class="FromContainer SonRegisterLeft">
      <div class="SonRegisterLeftBox">
        <h1>已有账号？</h1>
        <p>请使用您的帐号进行登录</p>
        <div class="SaonBtn">
          <a-button ghost size="large" shape="round" block>
            <router-link to="/index/login">登陆</router-link>
          </a-button>
        </div>
      </div>
    </div>
    <!-- 右边注册 -->
    <div class="FromContainer SonRegisterRight">
      <div class="SonRegisterRightbox">
        <h1>注册</h1>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="用户名"
            name="username"
            labelAlign="left"
            :rules="[{ required: true, message: '请输入用户名!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            labelAlign="left"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password autocomplete v-model:value="formState.password" />
          </a-form-item>
          <a-form-item
            label="确认密码"
            name="password"
            labelAlign="left"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password autocomplete v-model:value="formState.password" />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 6, span: 11 }">
            <a-button
              type="primary"
              danger
              shape="round"
              size="large"
              html-type="submit"
              block
            >
              注册
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, getCurrentInstance } from "vue";
export default defineComponent({
  setup() {
    let { proxy } = getCurrentInstance();
    const formState = reactive({
      username: "",
      password: "",
    });

    const onFinish = (values) => {
      console.log("Success:", values);
      proxy.$message.info("This is a normal message");
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
<style  scoped>
.SonRegister {
  width: 768px;
  height: 480px;
}
.SonRegisterLeft {
  float: left;
  background: linear-gradient(to right, #366c78, #050002) no-repeat 0 0 / cover;
  opacity: 0.7;
  text-align: center;
}
.SonRegisterLeftBox {
  position: relative;
  top: 20%;
}
.SonRegisterRightbox h1,
.SonRegisterLeftBox h1 {
  color: #fff;
  font-size: 40px;
  text-align: center;
}
.SonRegisterRightbox h1 {
  animation: glow-animation 2s infinite linear;
  text-shadow: 5px 12px 29px 0px #616591;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    90deg,
    #0e0d0d 0%,
    #107c9c 100%,
    rgb(139, 13, 13)
  );
}
@keyframes glow-animation {
  0% {
    filter: hue-rotate(-360deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}
.SonRegisterLeftBox p {
  color: #fff;
  font-size: 16px;
}
.SonRegisterRight {
  float: right;
}
.FromContainer {
  position: relative;
  width: 50%;
  height: 100%;
  padding: 40px 25px 15px 25px;
}
.SaonBtn {
  width: 150px;
  margin: 0 auto;
}
/deep/ .ant-form-item-label > label {
  color: #fff;
}
</style>