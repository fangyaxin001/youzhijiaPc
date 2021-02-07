
<template>
  <div>
    <div class="left_box">
      <ul>
        <li v-for="(item, index) in dataList" :key="index">
          <div v-show="index == 0">  <main v-show="leftIndex<6"></main> <p :class="leftIndex<6 ? 'style_color':''">我的订单</p> </div>
          <div v-show="index == 6">  <main v-show="leftIndex>5 && leftIndex<8"></main> <p :class="leftIndex>5 && leftIndex<8 ? 'style_color':''" >我的优惠</p></div>
          <div v-show="index == 8">  <main v-show="leftIndex>7 && leftIndex<11"></main> <p >我的服务</p></div>
          <div v-show="index == 11"> <main v-show="leftIndex>10 && leftIndex<12"></main> <p >我的服务</p></div>
          <p class="p_li" :class="leftIndex==index? 'style_color':''" @click="getIndex(index)">{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    props:["showIndex"],
  data() {
    return {
      dataList: [
        "全部订单",
        "待付款",
        "待发货",
        "待收货",
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
          if(index===6 || index===7){
            this.$router.push("/coupon")
          }
      }
  },
  watch:{
showIndex(newVal,oldVal){
    this.leftIndex = newVal
}
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