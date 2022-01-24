<template>
  <div class="home">
    <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" ></div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>系统管理</span>
            </span>
          </template>
          <a-menu-item key="1">用户管理</a-menu-item>
          <a-menu-item key="2">角色管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>云管理</span>
            </span>
          </template>
          <a-menu-item key="3">云空间</a-menu-item>
          <a-menu-item key="4">云笔记</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
  </div>
</template>
<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },

  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },

});
</script>

<style scoped>
.logo {
  height: 40px;
  margin: 5px;
  background: url('../assets/image/logoko.png') no-repeat;
  background-position:center;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>