<template>
  <div class="breadcurmb">
    <a-breadcrumb>
          <a-breadcrumb-item href="">
            <home-outlined />
            首页
            </a-breadcrumb-item>
        <a-breadcrumb-item v-for="item in this.$store.state.list" :key="item.id">{{item}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { HomeOutlined } from '@ant-design/icons-vue';
import { defineComponent} from "vue";
export default defineComponent({
    components: {
      HomeOutlined
    },
 setup(proxy) {
//    let data 

    return {
     
    };
   },
    
});
</script>

<style>
.breadcurmb{
    margin-bottom: 9px;
}
</style>