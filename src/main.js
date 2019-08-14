import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

import VueRouter from 'vue-router'
// 1.2 安装路由
import router from './router.js'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL = 'http://localhost:8090'

import moment from 'moment';

Vue.use(axios)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)


Vue.filter('dataFormat', function(datstr,patten='YYYY-MM-DD HH:mm:ss'){
    return  moment(datstr).format(patten);
})

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render: h => h(App),
  router
})
