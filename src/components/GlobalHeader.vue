<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="doMenuClick">
        </a-menu>
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <a-button type="primary" @click="() => router.push('/login')">
            登录
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { HomeOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
const current = ref<string[]>([]);
// 假设使用的是ant-design-vue，引入MenuProps
import type { MenuProps } from "ant-design-vue";
const items = ref<MenuProps["items"]>([
  {
    label: "首页",
    // 假设 HomeOutlined 是从 @ant-design/icons-vue 导入的图标

    icon: () => h(HomeOutlined),
    key: "/",
  },
  {
    label: "文章",
    key: "/article",
  },
  {
    label: "留言板",
    key: "/message",
  },
  {
    label: "关于",
    key: "/about",
  },
]);

const router = useRouter();
//路由守卫，在每次路由切换完成后触发，用于菜单高亮显示
router.afterEach((to) => {
  current.value = [to.path];
});

//菜单点击路由跳转
const doMenuClick = ({key}: { key: string }) => {
  router.push({
    path: key
  })
};
</script>
<style scoped>
.logo {
  height: 36px;
}
.title {
  color: black;
  margin-left: 18px;
  font-size: 16px;
}
.title-bar {
  display: flex;
  align-items: center;
}
</style>
