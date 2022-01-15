<!--首页  -->
<template>
  <div class="Index" :style="{ background: `url(${login_img})0% 0% / cover` }">
    <canvas id="init"></canvas>
    <!-- 动态播放 -->
    <div class="Circle">
      <div class="CircleA">&nbsp;</div>
      <div class="CircleL">&nbsp;</div>
      <div class="CircleN">&nbsp;</div>
      <div class="CircleCenter"></div>
    </div>
    <!-- 子路由出口 -->
    <div class="IndexBox">
      <router-view v-slot="{ Component }">
          <transition name="ScaleSlide" mode="out-in">
              <keep-alive>
                  <component :is="Component"/>
              </keep-alive>
          </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import draw from "../assets/js/logincanvas";
export default defineComponent({
  components: {},
  setup() {
    let login_img = ref(require("../assets/image/bg.jpg")); //string number
    onMounted(() => {
      draw("init");
    });
    return {
      login_img,
    };
  },
});
</script>
<style  scoped>
.Index {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  zoom: 1;
}
.IndexBox {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-shadow: 5px 12px 29px 0px #616591;
  position: relative;
  overflow: hidden;
  width: 768px;
  height: 480px;
  max-width: 100%;
  min-height: 480px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.Circle {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -75px 0 0 -75px;
}

.CircleA,
.CircleL,
.CircleN,
.CircleCenter {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -30px 0 0 -30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: linear-gradient(#e66465, #9198e5);
}

.CircleCenter {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -35px 0 0 -35px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: linear-gradient(#e66465, #9198e5);
  text-align: center;
  line-height: 70px;
  color: #eaeaea;
  font-size: 16px;
  font-family: "";
}

.CircleA {
  -webkit-animation: circle 3s linear infinite;
  animation: circle 3s linear infinite;
}

.CircleL {
  -webkit-animation: circle 3s linear 0.8s infinite;
  animation: circle 3s linear 0.8s infinite;
}

.CircleN {
  -webkit-animation: circle 3s linear 1.6s infinite;
  animation: circle 3s linear 1.6s infinite;
}

@-webkit-keyframes circle {
  /* Safari and Chrome */
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(3);
  }
}
.ScaleSlide-enter-active,
.ScaleSlide-leave-active {
   position: absolute;
  transition: all 0.75s ease-out;
}

.ScaleSlide-enter-from {
   position: absolute;
   right: -100%;
}
 
.ScaleSlide-enter-to {
  position: absolute;
  right: 0;
   
}
 .ScaleSlide-leave-to {
  position: absolute;
  left: -100%;
}


.ScaleSlide-leave-from {
  position: absolute;
  left: 0;
}

  /* 路由过度 */
</style>