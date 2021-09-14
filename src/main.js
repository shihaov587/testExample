import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
// import _ from 'lodash'
require("./mock/mock.js")
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(less)

// 百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: 'xPNLWkqdUGRQNqT2ze1Hh6bGVoj0GTuk'
})
// echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// console.log(_.now());
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
