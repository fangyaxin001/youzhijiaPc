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
    path: '/shopping_cart',//购物车
    name: 'shoppingCart', 
    component: () => import('../views/good_detial/shopping_cart.vue')
  },
  {
    path: '/evaluate',//订单详情
    name: 'evaluate', 
    component: () => import('../views/good_detial/evaluate.vue')
  },
  {
    path: '/order_detial',//订单详情
    name: 'orderDetial', 
    component: () => import('../views/good_detial/order_detial.vue')
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
  },
  {
    path: '/my_message',//我的消息
    name: 'myMessage', 
    component: () => import('../views/personal_my/my_message.vue')
  },
  {
    path: '/myYouZhiJia',//我的优之家
    name: 'myYouZhiJia', 
    component: () => import('../views/personal_my/myYouZhiJia.vue')
  },
  {
    path: '/personal',//个人信息
    name: 'personal', 
    component: () => import('../views/personal_my/personal.vue')
  },
  {
    path: '/binding_email',//绑定邮箱 
    name: 'bindingEmail', 
    component: () => import('../views/personal_my/binding_email.vue')
  },
  {
    path: '/iphone_binding',//手机号换绑 
    name: 'iphoneBinding', 
    component: () => import('../views/personal_my/iphone_binding.vue')
  },
  {
    path: '/Email_binding',//邮箱换绑 
    name: 'EmailBinding', 
    component: () => import('../views/personal_my/Email_binding.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
