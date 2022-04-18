<template>
  <div class="menu" >
  <a-menu
      v-for="item in data"
      :key="item.hidden"
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
      :open-keys="openKeys"
    >
    <!-- 过滤公共路由 -->
      <div v-if="!item.hidden">
      <!-- 只有一级菜单 -->
      <a-menu-item v-if="!item.alwaysShow " :key="item.meta.key" @click="onMyThis" >
          <icon-font :type="item.meta.icon" />
            <span>
              <router-link :to="item.meta.pageUrl"> </router-link>
              {{ item.meta.text }}
            </span>
      </a-menu-item>
        <!-- 包含二级级菜单 -->
        <a-sub-menu v-else :key="item.meta.key">
          <template #icon>
            <icon-font :type="item.meta.icon" />
          </template>
          <template #title>
            <span>{{ item.meta.text }}</span>
          </template >
          <a-menu-item v-for="items in item.children" :key="items.meta.key">      
            <router-link :to="items.meta.pageUrl">
            {{ items.meta.text }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
       </div>
    </a-menu>
  </div>
</template>

<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
import { defineComponent, toRefs, reactive, onMounted,watch,computed } from "vue";
import { useRouter } from 'vue-router';
import $store from '../../store/index'

export default defineComponent({
  components: {
    IconFont,
  },
  setup() {
    let list;
    // 同步更新vuex 动态路由值
     $store.dispatch("GET_ROUTERS_DATA");
    // 监听路由 
    let router = useRouter();
     console.log(router.getRoutes(), '查看现有路由')
     let data 
       watch(() => $store.state.data,(newValue,oldValue)=> {
         data = newValue
     },{ immediate: true ,deep:true})

    const state = reactive({
      openKeys: $store.state.openKeys, //当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [], //默认选中
    });
 
    watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
      if(router.currentRoute.value.meta.fatitle != null){
         let list = [
            router.currentRoute.value.meta.fatitle,
            router.currentRoute.value.meta.text,
          ]
          $store.commit('setlist', list); 
      }
     
        state.selectedKeys = [newValue]
    },{ immediate: true ,deep:true})
// 监听当选鼠标点击的路由是否展开或合并
    watch(() =>$store.state.openKeys,(newValue,oldValue)=> {
       state.openKeys = newValue
    },{ immediate: true ,deep:true})

   // SubMenu 展开/关闭的回调
    const onOpenChange = (openKeys) => {
      if (openKeys.length !== 0) {
          $store.commit('setopenKeys',openKeys[1] );
        } else {
            $store.commit('setopenKeys','');
        }
    };
    // 点击没有子集的路由
    const onMyThis = (()=>{
        $store.commit('setopenKeys', '' );
         $store.commit('setlist', []);
    })
    // 同步直接访问路由默认展开
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
          for (let y = 0; y < data[i].children.length; y++) {
              if (data[i].children[y].meta.key === router.currentRoute.value.path) {
                 $store.commit('setopenKeys', data[i].meta.key);
                 let list = [
                      data[i].children[y].meta.fatitle,
                      data[i].children[y].meta.text,
                    ]
                    $store.commit('setlist', list);
              }
          }
      }
    }

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
