import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
 return originalPush.call(this, location).catch(err => err);
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',//首页
    name: 'About',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',//登录
    name: 'Login', 
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/register',//注册
    name: 'register', 
    component: () => import('../views/login/register.vue')
  },
  {
    path: '/forgetword',//注册忘记密码
    name: 'forgetWord', 
    component: () => import('../views/login/forgetword.vue')
  },
  {
    path: '/good_detial',//商品详情
    name: 'goodDetial', 
    component: () => import('../views/good_detial/good_detial.vue')
  },
  {
    path: '/check_order',//核对订单
    name: 'checkOrder', 
    component: () => import('../views/order/check_order.vue')
  },
  {
    path: '/my_order',//我的订单
    name: 'myOrder', 
    component: () => import('../views/personal_my/my_order.vue')
  },
  {
    path: '/coupon',//优惠劵
    name: 'coupon', 
    component: () => import('../views/personal_my/coupon.vue')
  }
  ,
  {
    path: '/footprint',//我的足迹
    name: 'footprint', 
    component: () => import('../views/personal_my/footprint.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
