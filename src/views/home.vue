<template>
  <div class="home">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo"></div>
        <!-- 菜单组件 -->
        <menU/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">

        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
           <a-breadcrumb style="margin: 16px 0">
         
         </a-breadcrumb>
          <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import menU from '../sonmodule/home/menu.vue'
import { defineComponent,ref } from "vue";
export default defineComponent({
 components: {
    menU
  },
 setup() {
  
    return{
      collapsed: ref(false),
    }
   },
    
});
</script>

<style scoped>
.logo {
  height: 40px;
  margin: 5px;
  background: url("../assets/image/logoko.png") no-repeat;
  background-position: center;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>