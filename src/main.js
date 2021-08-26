import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import _ from 'lodash'
require("./mock/mock.js")
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
