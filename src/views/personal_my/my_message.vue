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
        @leftIndex="leftIndex"
      ></personalLeft>
      <div class="order_right" v-show="datialFlag" v-loading="loading">
        <ul v-if="messageList.length != 0">
          <li
            @click="goDatial(item)"
            v-for="(item, index) in messageList"
            :key="index"
          >
            <div class="myImfg"><img  :src="item.img_url" alt=""></div><p class="p1">{{item.title}}</p>
          </li>
        </ul>
        <!-- 占位图 -->
        <div v-else class="zanwei">
          <img src="../../assets/image/zanwushuju.png" alt="" />
          <p>暂无消息列表...</p>
        </div>
      </div>
      <div class="order_right" v-show="!datialFlag">
        <div class="flex_sb datialTop_box">
          <p>{{mesDetial.title}}</p> 
        </div>
       <p class="myboxs" v-html="mesDetial.content"></p>
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
  import { mapState } from 'vuex'
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
 computed: {
      ...mapState(["my_ssage"])
    },
    watch:{
       my_ssage(newVal,oldVal){
         console.log(newVal);
          if (newVal) {
              this.datialFlag=newVal
          }
       }
    },
  data() {
    return {
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      listIndex: 12,
      datialFlag: true,
      messageList: [], //消息列表
      loading: false,
      mesDetial:{},//消息详情
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
      if (e.idx == 12) {
        this.listIndex = e.idx;
        this.datialFlag = e.flag;
        this.mesList();
      } else {
        return;
      }
    },
    //跳转至详情
    goDatial(item) {
      console.log(item);
       this.$require
        .post(this.$inter.common.myMsgDetail, {
          id: item.id,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.mesDetial = res.data
             this.datialFlag = false;
             this.$store.commit("myMessage",false)
          }
         
        });
     
    },
    // 消息列表
    mesList() {
      this.loading = true;
      if (this.$route.query.idx) {
        this.listIndex = this.$route.query.idx;
      }
      this.$require
        .post(this.$inter.common.myMessage, {
          page: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.messageList = res.data.items;
          }
          this.loading = false;
        });
    },
  },
  created() {
    this.mesList();
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
    width: 970px;
    .zanwei {
      margin-top: 80px;
      color: black;
      text-align: center;
      color: #999999;
      font-size: 14px;
    }
    li {
      display: flex; 
      padding: 15px;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20px;
      cursor: pointer;
      p {
        margin-left: 20px;
        color: #333333;
        font-size: 14px;

      }
    }
    .myImfg{ 
      img{
        width: 170px;
        height: 120px;
      }
     
    }
     .p1{
        font-size: 14px;
        color: #333333;
      }
  }
}
.datialTop_box {
  background-color: #fff;
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
  color: #333333;
  font-weight: Bold;
  .p2 {
    font-size: 12px;
    color: #999999;
  }
}
.detial_box {
  margin-top: 2px;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  div {
    text-align: center;
    margin: 20px;
  }
  p {
    font-size: 14px;
    color: #333333;
  }
}
</style>
