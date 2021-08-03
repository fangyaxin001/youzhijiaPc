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
     <div  class="r-box">
       <div class="t_flex">
            <div style="color:#FF61A1"> 资产统计</div>
          <div > 
    <el-date-picker
      v-model="date"
      @change="weDate"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
          </div> 
       </div>
       <!-- 总返佣列表 -->
       <div class="fan_list">
         <div  class="list_item item_shu" >
           <div class="price">₱{{price_obj.sales}}</div>
           <div style="margin-top:5px;font-size:20px">总消费</div>
         </div>
         <div  class="list_item item_shu" >
           <div class="price">₱{{price_obj.no_sales}}</div>
           <div style="margin-top:5px;font-size:20px">预消费</div>
         </div>
         <div  class="list_item item_shu" >
           <div class="price">₱{{price_obj.all_comm}}</div>
           <div style="margin-top:5px;font-size:20px">总返佣</div>
         </div>
         <div  class="list_item item_shu" >
           <div class="price">₱{{price_obj.no_comm}}</div>
           <div style="margin-top:5px;font-size:20px">预返佣</div>
         </div>
       </div>
     </div>
      <!-- 列表 -->
         <div>
             <!-- nav列表 -->
             <div class="nav">
                 <div class="nav-detial " :class="isFlag?'show_bick':''" @click="isFlag=true">我的团队 <main :class="isFlag?'is_show':''" ></main></div>
                 <!-- <div class="nav-team"  :class="!isFlag?'show_bick':''" @click="isFlag=false">团队成员 <main :class="!isFlag?'is_show':''" ></main></div> -->
             </div> 
             <!-- 团队成员 -->
               <div class="detial_list" > 
                 <div class="top_head">
                     <div style="flex:2">信息</div>
                     <div>总消费</div>
                     <div>预消费</div>
                     <div>总返佣</div>
                     <div>预返佣</div>
                     <div>操作</div>
                 </div>
                 <div class="list_items"  v-for="(item,index) in teamList" :key="index">
                     <div class="item_flex" style="flex:2"><img :src="item.headimg_url" alt=""> 
                       <div style="margin-left:20px">
                          <div >{{item.nick}}</div>
                          <div style="margin-top:10px; font-size:14px;color:#666666">邀请时间：{{item.regdate}}</div>
                       </div>
                     </div> 
                     <div class="item_flex" >₱{{item.sales}}</div>
                     <div class="item_flex">₱{{item.no_sales}}</div>
                     <div class="item_flex">₱{{item.all_comm}}</div>
                     <div class="item_flex">₱{{item.no_comm}}</div>
                     <div class="item_flex" style="color:#FF61A1; cursor: pointer;" @click="lookDetial(item)">查看详情</div>
                 </div>
                  <!-- 分页 -->
            <div class="page_ye" >
            <el-pagination v-show="teamList.length != 0"
              background 
              layout="prev, pager, next"
              :total="detial_total"
              @current-change="currents"
              @prev-click="prevs"
              @next-click="nexts" >
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
      listIndex: 14,
      datialFlag: true,
      teamList: [], //团第成员列表 
      isFlag: true, //控制列表切换
      detial_total: 10, //余额详情总数
      detial_page:1,//余额详情页数 
      loading:false,
      detial_obj:{},
      date:[],
        start_time:'',
         end_time:'',
      price_obj:{},
    };
  },
  methods: {
    // 查看详情
    lookDetial(item){
          this.$router.push({
            path:'/team_detial',
            query:{
              idx:item.id
            }
          })
    },
    currents(index) {
        this.detial_page = index;
        this.myteam();
    },
    // 上一页
    prevs() {
        this.detial_page--;
        if (this.detial_page < 1) return (this.mydetial_pagepage = 1);
        this.myteam();
    },
    // 下一页
    nexts() {
        this.detial_page++;
        if (this.detial_page >Math.ceil(this.detial_total / 10))
          return (this.detial_page = this.detial_total / 10);
        this.myteam();
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
  // 选择时间
     weDate(e){
     console.log("我选择了时间");
     console.log(this.date);
     this.start_time = this.date[0]
     this.end_time = this.date[1]
     this.myteam()
     },
   
    // 团队列表
       myteam() {
      this.loading = true; 
      this.$require
        .post(this.$inter.common.myteam, {
             user_id:this.Id,
             detial_page: 1,
             page: this.detial_page,
             start_time:this.start_time,
             end_time:this.end_time
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.teamList = res.data.items;
            this.detial_total = res.data.total
            this.price_obj = res.data
          }
          this.loading = false;
        });
    }, 
  },
  created() {
     var err =  localStorage.getItem("USER_INFO")
     this.Id = JSON.parse(err).id  
      this.myteam()
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
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
    /deep/ .el-date-editor .el-range__icon {
color: #ff61a1;
}
/deep/ .el-input__inner{
  border: 1px solid #ff61a1;
  background-color: rgba(255, 97, 161, 0.11);

}
/deep/ .el-date-editor .el-range-input, .el-date-editor .el-range-separator{
  background:none;
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
        align-items: center; 
        height: 95px;
        .item_flex {
          flex: 1; 
          height: 95px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-size: 14px;
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
  margin: 40px auto;
  color:#f37021 ; 
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.pink-img{
  margin-left: 5px;
  margin-top: -10px;
}
.t_flex{
  display: flex;
  justify-content: space-between;  
}
.fan_list{
  margin-top: 20px;
  display: flex;
  justify-content: center; 
  .price{
    color: #FF61A1;
    font-size: 28px;
  }
  .list_item{
    text-align: center;
    width: 200px;
  }
  .item_shu{
    border-right:  1px solid #999;
  }
}  
</style>
