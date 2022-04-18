<template>
  <div class="home">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo"></div>
        <!-- 菜单组件 -->
        <menU  />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff;padding-top:10px;padding-left: 20px;height:80px;">
      
          <a-row type="flex" style="height:30px">
          <a-col flex="auto"><breadcrumb/></a-col>
          <a-col flex="80px"><a-avatar src="https://joeschmoe.io/api/v1/random" />
          
         <a-dropdown-button>
      Dropdown
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
            1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            3rd item
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><UserOutlined /></template>
    </a-dropdown-button>
      </a-col>
        </a-row>
         
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
import breadcrumb from '../sonmodule/home/breadcrumb.vue'
import tabs from '../sonmodule/home/tabs.vue'
import { defineComponent,toRefs,reactive,} from "vue";
export default defineComponent({
 components: {
    menU,
    tabs,
    breadcrumb
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