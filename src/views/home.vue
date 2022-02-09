<template>
  <div class="home">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo"></div>
        <!-- 菜单组件 -->
        <menU  />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff;padding-top: 24px;padding-left: 20px;">
        <!-- tabs 菜单 -->
          <tabs  />
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
import tabs from '../sonmodule/home/tabs.vue'
import { defineComponent,toRefs,reactive,} from "vue";
export default defineComponent({
 components: {
    menU,
    tabs
  },
 setup(proxy) {
     const mydata = reactive({
      collapsed:false,
    });
    return {
      ...toRefs(mydata)
    };
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