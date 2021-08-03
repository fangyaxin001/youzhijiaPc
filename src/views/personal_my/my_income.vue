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
      <div class="box">
          <!-- 上头 -->
     <div class="r-box"> 
           <div class="earnings"> ₱{{detial_obj.estimate}} 
 <div class="pink-img">
                    <el-popover
                 placement="top-start"
                 title="预估收益"
                 width="400"
                 trigger="hover" > 
         <div style=" font-size:14px">{{detial_obj.canuse_benefit_statement}}</div> 
      <img slot="reference" src="../../assets/image/orange1.png" alt=""> 
       </el-popover>
                </div>
           </div>
            <div class="income-pick">可使用收益</div>
     </div>
      <!-- 列表 -->
         <div>
             <!-- nav列表 -->
             <div class="nav">
                 <div class="nav-detial " :class="isFlag?'show_bick':''" @click="isFlag=true">余额明细 <main :class="isFlag?'is_show':''" ></main></div>
                 <!-- <div class="nav-team"  :class="!isFlag?'show_bick':''" @click="isFlag=false">团队成员 <main :class="!isFlag?'is_show':''" ></main></div> -->
             </div>
             <!-- 余额明细列表 -->
             <div v-if="isFlag" class="detial_list" v-loading="loading">
                 <div class="top_head">
                     <div>类型</div>
                     <div>时间</div>
                     <div>金额</div>
                 </div>
                 <div class="list_item" v-for="(item,index) in detialList" :key="index">
                     <div>{{item.title}}</div>
                     <div>{{item.datetime}}</div>
                     <div>{{item.coin | getnum}}</div>
                 </div>
                  <!-- 分页 -->
            <div class="page_ye" >
            <el-pagination  v-show="detialList.length != 0"
              background
              layout="prev, pager, next"
              :total="detial_total"
              @current-change="currents"
              @prev-click="prevs"
              @next-click="nexts"
            >
            </el-pagination>
          </div>
           <!-- 暂无数据 -->
          <div v-show="detialList.length == 0" class="zanwei">
            <img src="../../assets/image/zanwushuju.png" alt="" />
            <p>暂无余额明细</p>
          </div>
             </div>
             <!-- 团队成员 -->
               <div v-else class="detial_list" >
                 <div class="top_head">
                     <div>成员</div>
                     <div>注册时间</div> 
                 </div>
                 <div class="list_items"  v-for="(item,index) in teamList" :key="index">
                     <div ><img :src="item.headimg_url" alt=""> <p style="margin-left:20px">{{item.nick}}</p></div>
                     
                     <div>{{item.regdate}}</div> 
                 </div>
                  <!-- 分页 -->
            <div class="page_ye" >
            <el-pagination v-show="teamList.length != 0"
              background 
              layout="prev, pager, next"
              :total="detial_total"
              @current-change="currents"
              @prev-click="prevs"
              @next-click="nexts"
            >
            </el-pagination>
          </div>
          <!-- 暂无数据 -->
          <div v-show="teamList.length == 0" class="zanwei">
            <img src="../../assets/image/zanwushuju.png" alt="" />
            <p>暂无团队成员</p>
          </div>
             </div>
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
import { mapState } from "vuex";
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
    ...mapState(["my_ssage"]),
  },
  filters:{
     getnum(val){
         console.log(val)
          if(val>0){
	    return '+₱'+val;
	  }else if(val<0){
	    return '-₱'+val;;
	  }
     }
  },
  watch: {
    my_ssage(newVal, oldVal) {
      console.log(newVal);
      if (newVal) {
        this.datialFlag = newVal;
      }
    },
  },
  data() {
    return {
        Id:null,//我的id
      detialList:[],//余额详情列表
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      listIndex: 13,
      datialFlag: true,
      teamList: [], //团第成员列表 
      isFlag: true, //控制列表切换
      detial_total: 10, //余额详情总数
      detial_page:1,//余额详情页数 
      loading:false,
      detial_obj:{},
    };
  },
  methods: {
    currents(index) {
        this.detial_page = index;
        if(this.isFlag){
         this.MinxisList();
        }else{ 
        }
    },
    // 上一页
    prevs() {
        this.detial_page--;
        if (this.detial_page < 1) return (this.mydetial_pagepage = 1);
        if(this.isFlag){
         this.MinxisList();
        }else{ 
        }
    },
    // 下一页
    nexts() {
        this.detial_page++;
        if (this.detial_page >Math.ceil(this.detial_total / 10))
          return (this.detial_page = this.detial_total / 10);
         if(this.isFlag){
         this.MinxisList();
        }else{ 
        }
    },
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

    // 余额列表
    MinxisList() {
      this.loading = true; 
      this.$require
        .post(this.$inter.common.detialMinxi, {
             user_id:this.Id,
             type:1,
             page: this.detial_page,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.detialList = res.data.items;
            this.detial_total = res.data.total
          }
          this.loading = false;
        });
    }, 
  },
  created() {
     var err =  localStorage.getItem("USER_INFO")
     this.Id = JSON.parse(err).id 
      this.MinxisList() 
       this.$require
        .post(this.$inter.common.myBrokerage, {
            user_id:this.Id,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
              
            this.detial_obj = res.data
            
          }
          this.loading = false;
        });
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
  .box {
    .r-box { 
      width: 960px;
      background-color: rgba(255, 90, 21, 0.11);
      height: 120px;
      overflow: hidden;
      img {
        width: 20px;
        height: 20px;
      }
      .r-box-pink {
        padding: 10px;
        box-sizing: border-box;
        width: 460px;
        height: 160px;
        font-size: 40px;
        // background-color: rgba(255, 90, 21, 0.11);
        color: #f37021;
        .pink-img {
          text-align: right;
        }
        .price-pick {
          font-size: 28px;
          text-align: center;
          margin-top: 10px;
        } 
      }
      .r-box-blue {
        padding: 10px;
        box-sizing: border-box;
        width: 460px;
        height: 160px;
        background-color: rgba(162, 205, 255, 0.2);
        color: #569def;
        .blue-img {
          text-align: right;
        }
        .price-blue {
          font-size: 28px;
          text-align: center;
          margin-top: 10px;
        }
        .income-blue {
          font-size: 20px;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
    //   团队成员和余额明细
    .nav {
      margin-top: 20px;
      display: flex;
      color: #999999;
      padding: 0 20px;
      align-items: center;
      height: 50px;
      background-color: #fff;
      .is_show {
        height: 4px;
        width: 40px;
        background-color: #ff61a1;
        left: 10px;
        bottom: 0;
        position: absolute;
      }
      .show_bick {
        color: #ff61a1;
        font-weight: bold;
      }
      .nav-detial {
        position: relative;
        height: 100%;
        line-height: 50px;
        cursor: pointer;
      }
      .nav-team {
        margin-left: 20px;
        position: relative;
        height: 100%;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .detial_list {
      width: 100%;
      color: #333333;
      font-size: 14px;
      .top_head {
        display: flex;
        background-color: #eeeeee;
        height: 55px;
        div {
          height: 55px;
          line-height: 55px;
          flex: 1;
          text-align: center;
        }
      }
      .list_item {
        display: flex;
        background-color: #fff;
        height: 55px;
        div {
          height: 55px;
          line-height: 55px;
          flex: 1;
          text-align: center;
          border: 1px solid #eee;
        }
      }
      .list_items {
        display: flex;
        background-color: #fff;
        height: 95px;
        div {
          height: 95px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
          flex: 1;
        }
      }
    }
  }
}

.earnings{
  font-size: 40px;
  text-align: center; 
  margin-bottom: 0;
  margin-top: 20px;
  color:#f37021 ; 
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.pink-img{
  margin-left: 5px;
  margin-top: -10px;
}
 .income-pick {
          font-size: 20px;
          text-align: center; 
          color: #F37021;
          font-size: 20px;
        }
</style>
