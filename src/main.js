import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const resizeObserverErrRegExp = /ResizeObserver loop completed with undelivered notifications/;
window.addEventListener('error', event => {
  if (resizeObserverErrRegExp.test(event.message)) {
    // 阻止 Webpack Dev Server 的 overlay 弹窗
    event.stopImmediatePropagation();
    event.preventDefault();
    // 如果你还想在控制台静默输出，可以取消下面一行的注释：
    // console.warn('[ResizeObserver]', event.message);
  }
}, true);

axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = '/csxyb_server_war'
let app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(VueAxios,axios);
app.use(ElementPlus);
app.use(store).use(router).mount('#app')
