import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
import request from './common/request';
import Interface from "@/common/Interface";
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'
router.afterEach(function (to) {
  window.scrollTo(0, 0)
 })
Vue.use(VueLazyload, {
  loading: require('/img/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('/img/shibai.jpg')  //加载失败图片
});
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.use(ElementUI); 
Vue.prototype.$require = request;
Vue.prototype.$inter = Interface;
Vue.prototype.url = "";//加载图片路径
    
Vue.prototype.upUrl = "http://www.udejia.com/apis/upload/img"; //上传图片路径


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
