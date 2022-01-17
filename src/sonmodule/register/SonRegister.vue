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
           :rules="rules"
          @finish="handleFinish"
          @validate="handleValidate"
        >
          <a-form-item
            label="用户名"
            name="username"
            labelAlign="left"
          >
            <a-input v-model:value="formState.username"  />
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            labelAlign="left"
            
          >
            <a-input-password autocomplete v-model:value="formState.password" />
          </a-form-item>
          <a-form-item
            label="确认密码"
            name="passwordTwo"
            labelAlign="left"
           
          >
            <a-input-password autocomplete v-model:value="formState.passwordTwo" />
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
import {api_reginters} from '../../assets/api/index'
import { defineComponent, reactive, getCurrentInstance,ref } from "vue";
export default defineComponent({
  setup() {
    let { proxy } = getCurrentInstance();
    // 接口参数
    const formState = reactive({
      username: "",
      password: "",
      passwordTwo:""
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
         //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
         if (value === '') {
          return Promise.reject('请输入密码!');
        } else if(pPattern.test(value) == false){
            return Promise.reject('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符!');
        } else {
          return Promise.resolve();
        }
    };
     //确认密码表单验证
       let validatePassTwo = async (_rule, value) => {
         if (value === '') {
          return Promise.reject('请输入密码!');
        } else if(value !== formState.password) {
          return Promise.reject('两次密码一致!');
        } else  {
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
      }],
      passwordTwo: [{
        required: true,
        validator: validatePassTwo,
        trigger: 'blur',
      }],
    };
//  验证成功触发
    const handleFinish = values => {
      let data = {
        "userName":formState.username,
        "password":formState.password

      }
     api_reginters(data).then((res)=>{
          proxy.$message.success(res.data.msg);
      }).catch((err)=>{
         proxy.$message.error('注册失败');
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
<style  scoped  lang="scss">
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
::v-deep .ant-form-item-label > label {
  color: #fff;
}
</style>