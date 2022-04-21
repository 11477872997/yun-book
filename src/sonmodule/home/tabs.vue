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
 onMounted,
 computed
} from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
     // 监听路由 
    let router =  useRouter();
    const states = reactive({
      //  初始化数据
      panes: [
        {
          key: "/home/box",
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
             key: name,
            title: title
          });
        }
    };

    //监听路由
    watch( () => router.currentRoute.value.path, (newValue, oldValue) => {
        let title = router.currentRoute.value.meta.title;
         add(newValue, title);
      },
      { immediate: true,deep:true }
    );
    // 删除
    const remove = (targetKey) => {
       // //如果当前tab正活跃 被删除时执行
      if( states.activeKey === targetKey){
        states.panes.forEach((tab,index)=>{
          if(tab.key === targetKey){
              let nextTab = states.panes[index + 1] || states.panes[index - 1];
           if (nextTab) {
            //  选中删除后下一个路由
                states.activeKey= nextTab.key;
                // 同步联动
                OnTbas(nextTab.key,'removes')
              }
          }
        })
      }else{
        // 不是当前被选中的直接暴力删除数组
        states.panes.splice(states.panes.findIndex(item => item.key === targetKey), 1)
         
      }
      
    };
    // 新增和删除页签的回调，在 type="editable-card" 时有效
    const onEdit = (targetKey, action) => {
      if (action === "add") {
        add();
      } else {
        remove(targetKey);
      }
    };
    // 点击当前的tbas
    const OnTbas = ((item,name)=>{
      // 区分删除还是切换
      if(name != undefined){
        if(name === 'removes'){
          states.panes.splice(states.panes.findIndex(item => item.key === item), 1)
        }
      }
      // 同步左边菜单展开
        var data = JSON.parse(JSON.stringify($store.state.data));
        for (let i = 0; i < data.length; i++) {
          if (data[i].children) {
              for (let y = 0; y < data[i].children.length; y++) {
                let pageUrl = data[i].children[y].meta.pageUrl;
               if (data[i].alwaysShow) {
                  if (pageUrl === item) {
                    $store.commit("setopenKeys", data[i].name);
                    let list = [
                      data[i].children[y].meta.fatitle,
                      data[i].children[y].meta.title,
                    ];
                    $store.commit("setlist", list);
                  }
                }else{
                  $store.commit("setopenKeys", "");
                  $store.commit("setlist", []);
        
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

<style>
</style>
