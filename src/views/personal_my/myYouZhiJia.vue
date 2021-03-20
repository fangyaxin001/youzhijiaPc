<template>
  <div>
    <!-- 顶部组件 -->
    <homeTop></homeTop>
    <!-- 搜索组件 -->
    <loginHead @searchName="searchName" :seatch="true"></loginHead>
    <!-- 悬浮组件 -->
    <fielxRight></fielxRight>
    <!-- 搜索结果 -->
    <searchResult
      v-if="homeIndex == 0"
      :searchValue="searchVale"
    ></searchResult>
    <!-- 个人中心 -->
    <div class="mycenter" v-else>
      <!-- 左边导航栏 -->
      <personalLeft
        :showIndex="listIndex"
        :styleFlag="true"
        @leftIndex="leftIndex"
      ></personalLeft>
      <div>
        <div class="order_right flex_sb">
          <div class="top_box">
            <div class="head_img">
              <img style="width:80px;height:80px;object-fit: unset;" :src="url+USER_INFO.headimg_url" alt="" />
            </div>
            <div><p>{{USER_INFO.nick}}</p></div>
          </div>
          <div @click="myPersonal" class="my_setting">
            个人信息设置 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="my_orderTitle">我的订单</div>
        <div class="orderList">
          <ul class="flex_sa">
            <li @click="fukuan">
              <div><img src="../../assets/order/fukuan.png" alt="" /></div>
              <p>待付款</p>
            </li>
            <li  @click="fahuo">
              <div><img src="../../assets/order/fahuo.png" alt="" /></div>
              <p>待发货</p>
            </li>
            <li  @click="shouhuo">
              <div><img src="../../assets/order/shouhuo.png" alt="" /></div>
              <p>待收货</p>
            </li>
             <li @click="pngja">
              <div><img src="../../assets/order/pingjia.png" alt="" /></div>
              <p>待评价</p> 
            </li>
            <li @click="wancheng">
              <div><img src="../../assets/order/wancheng.png" alt="" /></div>
              <p>已完成</p>
            </li>
            <li @click="shouhou">
              <div><img src="../../assets/order/shouhou.png" alt="" /></div>
              <p>退款/售后</p>
            </li>
            <li @click="orderall">
              <div><img src="../../assets/order/orderall.png" alt="" /></div>
              <p>全部订单</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 底部组件 -->
    <bottombei></bottombei>
  </div>
</template>

<script>
// @ is an alias to /src
import homeTop from "@/components/homeTop/homeTop.vue"; //顶部组件
import loginHead from "@/components/loginHead/loginHead.vue"; //搜索组件
import bottombei from "@/components/bottomTitle/bottomBei.vue"; //底部组件
import fielxRight from "@/components/homeTop/fielxRight.vue"; //悬浮组件
import searchResult from "@/components/home/searchResult.vue"; //搜索结果
import personalLeft from "@/components/personal_ponents/personal_left.vue"; //搜索结果
export default {
  name: "Home",
  components: {
    homeTop,
    loginHead,
    bottombei,
    fielxRight,
    searchResult,
    personalLeft,
  },
  data() {
    return {
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      listIndex: 6,
      myDetial:{},//我的信息
      
    };
  },
  methods: {
    // 接受搜索的结果
    searchName(e) {
      console.log(e);
      this.homeIndex = e.index;
      this.searchVale = e.value;
    },
       //  接受子组件传过来的索引
    leftIndex(e) {
      console.log(e);
      if (e > 5 && e < 8) {
        this.listIndex = e;
      } else {
        return;
      }
    },
     fukuan(){
         this.$router.push({
              path:"/my_order",
              query:{
                idx:1
              }
            })
     },
      fahuo(){
         this.$router.push({
              path:"/my_order",
              query:{
                idx:2
              }
            })
     },
      shouhuo(){
         this.$router.push({
              path:"/my_order",
              query:{
                idx:3
              }
            })
     },
     pngja(){
        this.$router.push({
              path:"/my_order",
              query:{
                idx:4
              }
            })
     },
      wancheng(){
         this.$router.push({
              path:"/my_order",
              query:{
                idx:5
              }
            })
     },
      shouhou(){
         this.$router.push({
              path:"/my_order",
              query:{
                idx:6
              }
            })
     },
      orderall(){
         this.$router.push({
              path:"/my_order",
              query:{
                idx:0
              }
            })
     },
    //  个人设置
     myPersonal(){
 this.$router.push("/personal")
     },
 
  },
  created() {
         this.listIndex = this.$route.query.idx;
     this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
  },
};
</script>
<style lang="less" scoped>
.mycenter {
  width: 1200px;
  margin: auto;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  .order_right {
    width: 900px;
    height: 160px;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    .top_box {
      display: flex;
      align-items: center;
      .head_img {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 50%;
        
      }
      div {
        margin-left: 20px;
        p {
          font-weight: bold;
          color: #333333;
        }
      }
    }
    .my_setting {
      font-size: 12px;
      color: #999999;
      cursor: pointer;
    }
  }
  .my_orderTitle {
    width: 900px;
    height: 50px;
    line-height: 50px;
    padding-left: 40px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 20px;
    color: #333333;
    font-weight: bold;
  }
  .orderList {
    height: 150px;
    width: 900px;
    background-color: #fff;
    margin-top: 2px;
    ul{
        height: 150px;
           li {
      text-align: center;
      cursor: pointer;
      p {
        margin: 0;
        font-size: 14px;
        color: #333333;
        margin-top: 5px;
      }
    }
    }
 
  }
}
</style>
