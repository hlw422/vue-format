import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";


import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
const pinia = createPinia() //创建pinia实例
pinia.use(piniaPluginPersistedstate) //将插件添加到 pinia 实例上

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Antd);
app.mount('#app')
