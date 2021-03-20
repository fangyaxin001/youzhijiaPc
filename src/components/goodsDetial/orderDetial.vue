<template>
  <div class="order">
    <div class="top_status flex_sb">
      <div class="d1">当前订单状态：{{orderData.status | setStatus}}</div>
      <div class="d2" v-show="orderData.status==2">平台已发货等待买家确认收货</div>
    </div>
    <div class="commodity_detial">商品信息</div>
    <div class="order_list" v-for="(item,index) in orderData.goods" :key="index">
         <div class="flex_sb" style="width:500px">
                <div>
                  <img
                    style="width: 85px; height: 85px; object-fit: unset"
                    :src="url+item.img1_url"
                    alt=""
                  />
                </div>
                <div class="detail_right ">
                  <p class="text-line ">{{item.name}}</p>
                  <div class="g_tue flex_sb">
                    <p class="p1">₱{{item.xprice}}</p>
                    <p>规格：{{item.size}}</p>
                  </div>
                </div>
              </div>
    </div> 
    <div class="commodity_detial">订单信息</div>
    <div class="order_message">
         <p>商品总额总价：₱ {{orderData.sum}}</p>
         <p>运费：₱ {{orderData.cost}}</p>
         <p>优惠折扣：-₱ {{orderData.coupons}}</p>
         <p>实际支付：₱ {{orderData.paymoney}}</p>
         <p>订单号：{{order.order_num}}</p>
         <p>下单时间：{{orderData.addtime}}</p>
    </div>
     <div class="commodity_detial">收货信息</div>
    <div class="order_message">
         <p>收货人：{{orderData.address_user}}</p>
         <p>联系手机：{{orderData.address_phone}}</p>
         <p>收货地址：{{orderData.address}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderData:{},//订单详情
      order:{
        order_num:'',
        order_time:'',
      },
    };
  },
  filters:{
    setStatus(e){
       var arr = ["全部","待付款","待发货","待收货","待评价","已完成","申请售后中","售后已完成"]
       return arr[e]
    }
  },
  methods: {},
  created() {
    this.order.order_num = this.$route.query.orderNum
    this.order.order_time = this.$route.query.orderTime
      this.$require
        .post(this.$inter.common.orderDetail, {
          order_num: this.$route.query.orderNum,  
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
             this.orderData = res.data
          }
        });
  },
};
</script>
<style lang="less" scoped>
   .order{
       width: 1200px;
       margin: auto;
       margin-top: 40px;
        .top_status{
          height: 80px;
          padding: 20px 35px 20px 35px;
          box-sizing: border-box;
          background-color: rgba(255,97,161,0.06);
          border: 1px solid #FF61A1;
          .d1{
              color: #FF61A1;
              font-size: 18px;
              font-weight: bold;
          }
          .d2{
              color: #FF61A1;
              font-size: 16px;
          }
    }
    .commodity_detial{
         padding: 20px 35px 20px 35px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 20px;
        color: #333333;
        font-weight: bold;
    }
    .order_list{
        background-color: #fff;
         padding: 20px 35px 20px 35px;
        box-sizing: border-box;
        margin-top: 2px;
        margin-bottom: 5px;
         .detail_right {
      width: 390px;
      text-align: left !important;
      font-size: 14px;
      color: #333333;
      p {
        margin: 10px;
        font-size: 14px;
        color: #333333;
      }
    
      .g_tue {
          width: 200px;
        color: #999999 !important;
          .p1{
          color:#F10200 ;
          font-size: 18px;
          font-weight: bold;
      }
      }
    }
    }
    .order_message{
        background-color: #fff;
         padding: 10px 35px 10px 35px;
        box-sizing: border-box;
        margin-top: 2px;
        p{
            margin: 15px;
            font-size: 14px;
            color: #333333;
        }
    }
   }
   
</style>