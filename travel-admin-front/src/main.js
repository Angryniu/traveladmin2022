import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import * as Icons from '@ant-design/icons-vue'

import "animate.css";

const app = createApp(App)

app.use(store).use(router)
app.use(Antd)
app.use(ElementPlus)
// element图标全局引入
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// for (const name in ElementPlusIconsVue) {
//   app.component(name, ElementPlusIconsVue[name])
// }

// antd图标全局引入
// const icons = Icons;
// for (const i in icons) {
//   app.component(i, icons[i]);
// }
app.mount('#app')
