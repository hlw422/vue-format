<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView/>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.zhihu.com/" target="_blank">前往知识的海洋</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
// 若使用了 TypeScript 且开启了严格类型检查，需确保有类型声明文件
// 可以通过在项目中添加 shims-vue.d.ts 文件来解决
// 在 shims-vue.d.ts 中添加以下内容：
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue';
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useWebsiteStore } from "@/stores/websiteStorage.ts";
import type{  Website }from '@/data/initWebsites'
import {  initWebsites }from '@/data/initWebsites'
const WebsiteStore=useWebsiteStore();

if(WebsiteStore.websites.length===0){
  initWebsites.forEach((website:Website)=>{
  WebsiteStore.addWebsite(website);
})


}

</script>

<style scoped>
#basicLayout .footer{
   background: #efefef;
   padding: 16px;
   text-align: center;
   left: 0;
   right: 0;
   bottom: 0;
   position: fixed;
   min-height: 30px;
}
#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}
#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}
</style>
@/data/websites.js