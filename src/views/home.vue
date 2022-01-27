<template>
  <div class="home">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo"></div>
        <!-- 菜单组件 -->
        <menU/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff;padding-top: 24px;padding-left: 20px;">
            <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit" hideAdd>
              <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable"></a-tab-pane>
            </a-tabs>
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
import { defineComponent,toRefs,reactive,watch  } from "vue";
import { useRouter } from 'vue-router';
export default defineComponent({
 components: {
    menU
  },
 setup() {
     const states = reactive({
      //  初始化数据
      panes: [
          {
          key: "/home",
          title: "首页",
          closable: false,
      },
      ], //生成的集合数据
      activeKey:'/home', //默认选中
      collapsed:false,
    });
    // 添加tabs
    const add = (name,title) => {
 
      // states.panes.push({
      //   title:title,
      //   key:name,
      // });
     
    };

  // 监听路由 
    // let router = useRouter()
    // watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
    //   let title = router.currentRoute.value.meta.title;
    //    add(newValue,title);
    // },{ immediate: true })
   
 

    const remove = targetKey => {
      // let lastIndex = 0;
      // panes.value.forEach((pane, i) => {
      //   if (pane.key === targetKey) {
      //     lastIndex = i - 1;
      //   }
      // });
      // panes.value = panes.value.filter(pane => pane.key !== targetKey);

      // if (panes.value.length && activeKey.value === targetKey) {
      //   if (lastIndex >= 0) {
      //     activeKey.value = panes.value[lastIndex].key;
      //   } else {
      //     activeKey.value = panes.value[0].key;
      //   }
      // }
    };
  	// 新增和删除页签的回调，在 type="editable-card" 时有效
    const onEdit = (targetKey, action) => {
      if (action === 'add') {
        add();
      } else {
        remove(targetKey);
      }
    };

    return {
      ...toRefs(states),
      onEdit
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