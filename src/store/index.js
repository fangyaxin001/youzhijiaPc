import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trolley:0,
    myname:'',
    my_ssage:true,
  },
  mutations: {
    Trolley(a,b){
      a.trolley=b
    },
    myname(a,b){
      console.log(b);
      a.myname=b
    },
    myMessage(a,b){
      console.log(b);
      a.my_ssage=b
    },
  },
  actions: {
  },
  modules: {
  }
})
