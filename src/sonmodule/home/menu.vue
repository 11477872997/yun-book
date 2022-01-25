<template>
  <div class="menu">
       <a-menu v-for="item in data" :key="item.id" theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" @openChange="onOpenChange" :open-keys="openKeys">
        <!-- 只有一级菜单 -->
        <a-menu-item v-if="item.children== undefined" :key=item.key >
        <Icon  type="icon-jiaoseguanli" />
            <span>{{item.text}}</span>
        </a-menu-item>
        <!-- 包含二级级菜单 -->
        <a-sub-menu v-else :key="item.key">      
            <template #title> <span>{{item.text}}</span></template>
            <a-menu-item v-for="items in item.children" :key="items.key">{{items.text}}</a-menu-item>
        </a-sub-menu>
        
    </a-menu>
  </div>
</template>

<script>
import Icon from '@ant-design/icons-vue';
// import { PieChartOutlined } from '@ant-design/icons-vue';

import { defineComponent,toRefs,reactive} from "vue";
export default defineComponent({
    components: {
     
  },
    setup() {
    let data = require('../../assets/json/men.json');
    const state = reactive({
      openKeys: [],  //当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [],
      rootSubmenuKeys: [],  //集合
    });
    // SubMenu 展开/关闭的回调
   const onOpenChange = openKeys => {
        openKeys.find((key)=>{
            state.rootSubmenuKeys.push(key)
        })
     const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
    if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
   }


    return{
        data,
        onOpenChange,
        ...toRefs(state),
        
    }
    },
})
</script>

<style scoped>

</style>