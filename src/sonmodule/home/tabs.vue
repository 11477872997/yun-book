<template>
  <div class="tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      @edit="onEdit"
      hideAdd
      @tabClick='OnTbas'
    >
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import $store from '../../store/index'
import {
  defineComponent,
  toRefs,
  reactive,
  watch,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
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
      activeKey: "", //默认选中
      collapsed: false,
    });
    // 添加tabs
    const add = (name, title) => {
          let falg = true;
          states.activeKey = name; //选中
         states.panes.filter((item)=>{
            // 判断是否存在
              if(item.key == name){
                  falg = false;
              }
        })
      if (falg) {
        states.panes.push({
            title: title,
            key: name,
          });
        }
    };

    //监听路由
    let router = useRouter();
    watch( () => router.currentRoute.value.path, (newValue, oldValue) => {
        let title = router.currentRoute.value.meta.title;
         add(newValue, title);
      },
      { immediate: true }
    );
    // 删除
    const remove = (targetKey) => {
      console.log(targetKey)
      // states.panes.splice(states.panes.findIndex(item => item.key === targetKey), 1)
    };
    // 新增和删除页签的回调，在 type="editable-card" 时有效
    const onEdit = (targetKey, action) => {
      if (action === "add") {
        add();
      } else {
        remove(targetKey);
      }
    };
    let data = require("../../assets/json/men.json");
    // 点击当前的tbas
    const OnTbas = ((item)=>{
          // 默认展开左边菜单 刷新前的样子
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
          for (let y = 0; y < data[i].children.length; y++) {
              if (data[i].children[y].key === item) {
                 $store.commit('setopenKeys', data[i].key);
              }
          }
      }
    }
      router.push({
             path: item,
         });
    })
    return {
      ...toRefs(states),
      onEdit,
      OnTbas
    };
  },
});

</script>

<style></style>
