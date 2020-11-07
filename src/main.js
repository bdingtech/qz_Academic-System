// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import less from 'less'
Vue.use(less)
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import Moment from 'moment'
import store from './store'
import header from './components/common/header'
import noData from './components/common/noData'
Vue.prototype.$echarts = echarts
Vue.prototype.moment=Moment
import Vant, { Toast  } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Toast);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.component("Header",header);
Vue.component("NOdata",noData);
import { GET_CONFIG } from "./utils/config";
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  let allowList = ['/login','/','/loginSso','/casLogin','/bindLogin','/weChatLogin','/upload','/uploadFile']
  if(!sessionStorage.getItem('Token') && !allowList.includes(to.path)){
    Toast.fail("请先登录!") 
    setTimeout(function(){ 
      next('/login')
    },1500)
  }else{
    GET_CONFIG()
    setTimeout(() => {
      next()
    }, 200);
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")



// WEBPACK FOOTER //
// ./src/main.js