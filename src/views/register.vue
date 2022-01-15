<!-- 注册 -->
<template>
<div class='Register'>
    <SonRegister/>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { defineComponent,} from "vue";
import SonRegister from '../sonmodule/register/SonRegister.vue'
export default defineComponent({
 components: {
    SonRegister,
  }
})
</script>
<style  scoped>

</style>