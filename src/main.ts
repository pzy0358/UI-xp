import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'

// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入element plus icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from './utils'

const app = createApp(App)


// 注册element plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`el-icon-${toLine(key)}`,component)
    // app.component(key, component)
}
  
import mUI from './components'
app.use(mUI)

app.use(ElementPlus)
app.use(router)
app.mount('#app')