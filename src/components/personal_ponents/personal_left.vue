
<template>
  <div>
    <div class="left_box">
      <ul>
        <li v-for="(item, index) in dataList" :key="index">
          <div v-show="index == 0">  <main v-show="leftIndex<7 || styleFlag"></main> <p :class="leftIndex<7 ? 'style_color':styleFlag?'style_color':''">我的订单</p> </div>
          <div v-show="index == 7">  <main v-show="leftIndex>6 && leftIndex<9"></main> <p :class="leftIndex>6 && leftIndex<9 ? 'style_color':''" >我的优惠</p></div>
          <div v-show="index == 9">  <main v-show="leftIndex>8 && leftIndex<12"></main> <p :class="leftIndex>8 && leftIndex<12 ? 'style_color':''"  >我的服务</p></div>
          <div v-show="index == 12"> <main v-show="leftIndex>11 && leftIndex<13"></main> <p :class="leftIndex>11 && leftIndex<13 ? 'style_color':''" >我的消息</p></div>
          <p class="p_li" :class="leftIndex==index? 'style_color':''" @click="getIndex(index)">{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    props:["showIndex","styleFlag"],
  data() {
    return {
      dataList: [
        "全部订单",
        "待付款",
        "待发货",
        "待收货",
        "待评价",
        "已完成",
        "退款/售后",
        "优惠券",
        "领券中心",
        "我的评价",
        "我的足迹",
        "新品需求",
        "我的消息",
      ],
      leftIndex:0,//导航索引
    };
  },
  methods: {
      getIndex(index){
        console.log(index);
          this.leftIndex=index
          this.$emit('leftIndex', index)
           if(index>=0 && index<=6){
            this.$router.push({
              path:"/my_order",
              query:{
                idx:index
              }
            })
          }else if(index===7 || index===8){
            console.log(1111);
            this.$router.push({
              path:"/coupon",
              query:{
                idx:index
              }
            })
          }else if(index>=9 && index<=11){
            this.$router.push({
              path:"/footprint",
              query:{
                idx:index
              }
            })
          }else if(index==12){
           var indexFlag={idx:index,flag:true}
             this.$emit('leftIndex', indexFlag)
            this.$router.push({
              path:"/my_message",
              query:{
                idx:index,
              }
            })
          }
      }
  },
  watch:{
showIndex(newVal,oldVal){
    this.leftIndex = newVal
}
  },
   mounted(){
    this.leftIndex = this.showIndex
   },
  created() {},
};
</script>
<style lang="less" scoped>
.left_box {
  width: 200px;
  background-color: #fff;
  padding: 25px;
  box-sizing: border-box;
  ul{
      margin-left: 40px;
      li{
         .p_li{
             cursor: pointer;
             font-size: 14px;
             color: #666666;
         }
          div{
              position: relative;
              font-size: 16px;
              font-weight: bold;
             main{
                  position: absolute;
                  left: -16px;
                  width: 5px;
                  height: 5px;
                  top: 7px;
                  border: 2px solid #FF61A1;
                  border-radius: 50%;
              }
          }
      }
  }
   
}
.style_color{
    color: #FF61A1 !important;
}
</style>