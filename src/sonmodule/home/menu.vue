<template>
  <div class="menu">
    <a-menu
      v-for="item in data"
      :key="item.id"
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
      :open-keys="openKeys"
    >
      <!-- 只有一级菜单 -->
      <a-menu-item v-if="item.children == undefined" :key="item.key" @click="onMyThis">
        <icon-font :type="item.icon" />
        <span>
          <router-link :to="item.pageUrl"> </router-link>
          {{ item.text }}
        </span>
      </a-menu-item>
      <!-- 包含二级级菜单 -->
      <a-sub-menu v-else :key="item.key">
        <template #icon>
          <icon-font :type="item.icon" />
        </template>
        <template #title
          ><span>{{ item.text }}</span></template
        >
        <a-menu-item v-for="items in item.children" :key="items.key">
          <router-link :to="items.pageUrl">
            {{ items.text }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
import { defineComponent, toRefs, reactive, onMounted,watch } from "vue";
import { useRouter } from 'vue-router';


export default defineComponent({
  components: {
    IconFont,
  },
  setup() {
// 菜单栏数据
    let data = require("../../assets/json/men.json");
    const state = reactive({
      openKeys: [], //当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [], //默认选中
      rootSubmenuKeys: [], //集合
    });
    // SubMenu 展开/关闭的回调
    const onOpenChange = (openKeys) => {
      openKeys.find((key) => {
        state.rootSubmenuKeys.push(key);
         sessionStorage.setItem('key',key);
      });
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            state.openKeys = openKeys;
      } else {
         state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
// 监听路由 
    let router = useRouter()
    watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
        state.selectedKeys = [newValue]   
    },{ immediate: true })
    // 点击没有子集的路由
    const onMyThis = (()=>{
      state.openKeys = [];
      sessionStorage.setItem('key','');
    })
    onMounted(()=>{
      // 默认展开 刷新前的样子
        if(sessionStorage.getItem('key') != null || sessionStorage.getItem('key') != undefined ){
            state.openKeys = [sessionStorage.getItem('key')];
        }
    })
    return {
      data,
      onOpenChange,
      onMyThis,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped></style>
