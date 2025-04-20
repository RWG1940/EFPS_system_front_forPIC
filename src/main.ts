
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as TDesignIconsVue from 'tdesign-icons-vue-next'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
for (const [key, component] of Object.entries(TDesignIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(TDesign);
app.use(createPinia())
app.use(router)

app.config.globalProperties.$echarts = echarts
app.provide("$echarts",echarts)

app.mount('#app')
