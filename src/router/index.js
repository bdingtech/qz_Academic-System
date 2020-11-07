import Vue from 'vue'
import Router from 'vue-router'
// import laboratory from './laboratory'
// import teacherRoute from './teacher'
// import studentRoute from './student'
//公共部分
import Login from '@/components/Login'
// import casLogin from '@/components/casLogin'
// import loginSso from '@/components/loginSso'
// import bindLogin from '@/components/bindLogin'
// import weChatLogin from '@/components/weChatLogin'
// import Notice from '@/components/pages/Notice'
// import Adv from '@/components/pages/Adv'
// import AdvItem from '@/components/pages/AdvItem'
// import Index from '@/components/common/Index'
// import Home from '@/components/pages/Home'
// import Message from '@/components/pages/Message'
// import Person from '@/components/pages/Person'
// import About from '@/components/pages/About'
// import Untied from '@/components/pages/Untied'
Vue.use(Router)
// import { GET_CONFIG } from "../utils/config";
// const router = new Router({
// //   mode:'history'
// })

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      },
    },
    // {
    //   path: '/loginSso',
    //   name: 'loginSso',
    //   component: loginSso
    // },
    // {
    //   path: '/bindLogin',
    //   name: 'bindLogin',
    //   component: bindLogin
    // },
    // {
    //   path: '/weChatLogin',
    //   name: 'weChatLogin',
    //   component: weChatLogin
    // },
    // {
    //   path: '/casLogin',
    //   name: 'casLogin',
    //   component: casLogin,
    //   meta: {
    //     title: '登录'
    //   },
    // },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: Index,
    //   redirect: '/homeIndex',
    //   children: [{
    //     path: '/homeIndex',
    //     name: 'homeIndex',
    //     component: Home,
    //     meta: {
    //       keepAlive:false
    //     },
    //   },
    //     {
    //       path: '/person',
    //       name: 'person',
    //       component: Person
    //     },
    //     {
    //       path: '/message',
    //       name: 'message',
    //       component: Message
    //     },
    //     {
    //       path: '/about',
    //       name: 'about',
    //       component: About
    //     },
    //     {
    //       path: '/untied',
    //       name: 'untied',
    //       component: Untied
    //     },
    //     {
    //       path: '/forget',
    //       name: 'forget',
    //       component: () => import('@/components/pages/mine/forgetPwd.vue')
    //     },
    //   ]
    // },
    // {
    //   path: '/notice',
    //   name: 'notice',
    //   component: Notice
    // },
    // {
    //   path: '/adv',
    //   name: 'adv',
    //   component: Adv
    // },
    // {
    //   path: '/advItem',
    //   name: 'advItem',
    //   component: AdvItem
    // },
    // ...laboratory,
    // ...teacherRoute,
    // ...studentRoute
  ]
})



// WEBPACK FOOTER //
// ./src/router/index.js