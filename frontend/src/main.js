import { createApp} from 'vue'
import App from './App.vue'

import ElementPlus  from 'element-plus';
import Vuex from 'vuex'
import 'element-plus/lib/theme-chalk/index.css';
import router from './router';
import store from './store'

createApp(App)
.use(Vuex)
.use(router)
.use(store)
.use(ElementPlus)
.mount('#app')
