<!-- 登陆界面 -->
<template>
  <div class="SonLogin">
    <!-- 左边登录 -->
    <div class="FromContainer SaonloginLeft">
      <div class="SaonloginLeftbox">
        <h1>登录</h1>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
          :rules="rules"
          @finish="handleFinish"
          @validate="handleValidate"
        >
          <a-form-item
            label="用户名"
            name="username"
            labelAlign="left"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            labelAlign="left"
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
                登录
              </a-button>
            </a-form-item>
        </a-form>
      </div>
    </div>
    <!-- 右边注册 -->
    <div class="FromContainer SaonloginRight">
      <div class="SaonloginRightBox">
        <h1>没有账号？</h1>
        <p>立即注册加入我们，和我们一起开始旅程吧</p>
        <div class="SaonBtn">
          <a-button ghost size="large" shape="round" block>
            <router-link to="/index/register"> 注册</router-link>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api_login} from '../../assets/api/index'
import { defineComponent, reactive, getCurrentInstance } from "vue";
export default defineComponent({
  setup() {
    let { proxy } = getCurrentInstance();
    const formState = reactive({
      username: "",
      password: "",
    });
    // 用户名表单验证
       let validateUsername = async (_rule, value) => {
         if (value === '') {
          return Promise.reject('请输入用户名!');
        } else {
          return Promise.resolve();
        }
    };
 // 密码表单验证
       let validatePass = async (_rule, value) => {
         if (value === '') {
          return Promise.reject('请输入密码!');
        }else {
          return Promise.resolve();
        }
    };

    // 表单验证
   const rules = {
      username: [{
        required: true,
        validator: validateUsername,
        trigger: 'blur',
      }],
      password: [{
        required: true,
        validator: validatePass,
        trigger: 'blur',
      }]
    };
//  验证成功触发
    const handleFinish = values => {
      let data = {
        "userName":formState.username,
        "password":formState.password
      }
     api_login(data).then((res)=>{
         if(res.data.code == 1){
             proxy.$message.success(res.data.msg);
              //   router.push('/index/login');
              return;
         }
         if(res.data.code == 0){
             if(res.data.zt == 1){
                 alert('用户已经登录再别的地方登陆，请退出别的登录！')
                 return ;
             }
             if(res.data.zt == 0){
                 alert('登陆已过期！')
                 return ;
             }
             proxy.$message.success(res.data.msg);
         }

       
      }).catch((err)=>{
         proxy.$message.error('登陆失败');
         
      })
    };
// 事件触发
   const handleValidate = (...args) => {
      // console.log(args);
    };


    return {
    formState,
      rules,
      handleValidate,
      handleFinish
    };
  },
});
</script>
<style scoped lang="scss">
.SonLogin {
  width: 768px;
  height: 480px;
}
.SaonloginLeft {
  float: left;
}
.SaonloginLeftbox {
  position: relative;
  top: 10%;
}
.SaonloginRight {
  float: right;
  background: linear-gradient(to right, #366c78, #050002) no-repeat 0 0 / cover;
  opacity: 0.7;
  text-align: center;
}
.SaonloginRightBox {
  position: relative;
  top: 20%;
}
.FromContainer {
  position: relative;
  width: 50%;
  height: 100%;
  padding: 40px 25px 15px 25px;
}
.SaonloginLeftbox h1,.SaonloginRight h1 {
  color: #fff;
  font-size: 40px;
  text-align: center;
}
.SaonloginLeftbox h1 {
  animation: glow-animation 2s infinite linear;
  text-shadow: 5px 12px 29px 0px #616591;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    90deg,
     #0e0d0d 0%,
    #ce5016 100%,
    rgb(223, 208, 160)
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
.SaonloginRight p {
  color: #fff;
  font-size: 16px;
}
.SaonBtn {
  width: 150px;
  margin: 0 auto;
}
::v-deep  .ant-form-item-label > label {
  color: #fff;
}
</style>
