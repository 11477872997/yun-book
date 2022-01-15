<template>
  <div id="App">
    <!-- 全局路由入出口 -->
   <router-view v-slot="{ Component }">
              <keep-alive>
                  <component :is="Component"/>
              </keep-alive>
      </router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
<style >
#App{
  height: 100%;
}
</style>
