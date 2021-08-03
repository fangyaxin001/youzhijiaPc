<template>
  <div>
    <!-- 顶部组件 -->
    <homeTop></homeTop>
    <!-- 搜索组件 -->
    <loginHead @searchName="searchName" :seatch="true"></loginHead>
    <!-- 悬浮组件 -->
    <fielxRight></fielxRight>
    <!-- 搜索结果 -->
    <searchResult v-if="homeIndex == 0" :searchValue="searchVale"></searchResult>
    <!-- 个人中心 -->
    <div class="mycenter" v-else>
      <!-- 左边导航栏 -->
      <personalLeft :showIndex="listIndex" @leftIndex="leftIndex"></personalLeft>
      <div class="box">
        <!-- 上头 -->
        <div class="r-box">
          <div class="t_flex">
            <div>
              返佣状态
              <el-select style="width: 150px" v-model="comm_status" placeholder="请选择">
                <el-option
                  v-for="item in commList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              订单状态
              <el-select style="width: 150px" v-model="order_status" placeholder="请选择">
                <el-option
                  v-for="item in orderList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="date_list">
              <el-date-picker
                v-model="date"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="seach_in" @click="seatch">
                搜索
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <div>
          <!-- nav列表 -->
          <div class="nav">
            <div
              class="nav-detial"
              :class="isFlag ? 'show_bick' : ''"
              @click="isFlag = true"
            >
              订单详情
              <main :class="isFlag ? 'is_show' : ''"></main>
            </div>
            <!-- <div class="nav-team"  :class="!isFlag?'show_bick':''" @click="isFlag=false">团队成员 <main :class="!isFlag?'is_show':''" ></main></div> -->
          </div>
          <!-- 团队成员 -->
          <div class="detial_list">
            <div class="top_head">
              <div style="flex:1.5">订单编号 </div>
              <div style="flex:1.5">消费时间</div>
              <div>商品总价</div>
              <div>订单状态</div>
              <div>返佣</div>
              <div>返佣状态</div>
            </div>
            <div class="list_items" v-for="(item, index) in teamList" :key="index" v-show="teamList.length != 0 " >
              <div class="item_flex" style="flex: 1.5">{{item.order_num}}</div>  
              <div class="item_flex" style="flex: 1.5">{{item.addtime}}</div> 
              <div class="item_flex">₱{{item.paymoney}}</div>  
              <div class="item_flex" style="color: #ff61a1">{{item.status_str}}</div>  
              <div class="item_flex">₱{{item.fan_comm}}</div>  
              <div class="item_flex" >{{item.fan_status}}</div>  
            </div>
            <!-- 分页 -->
            <div class="page_ye">
              <el-pagination
                v-show="teamList.length != 0"
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
              <p>暂无列表信息</p>
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
  filters: {
    getnum(val) {
      console.log(val);
      if (val > 0) {
        return "+₱" + val;
      } else if (val < 0) {
        return "-₱" + val;
      }
    },
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
      Id: null, //我的id
      detialList: [], //余额详情列表
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      listIndex: 14,
      datialFlag: true,
      teamList: [], //团第成员列表
      isFlag: true, //控制列表切换
      detial_total: 10, //余额详情总数
      detial_page: 1, //余额详情页数
      loading: false,
      detial_obj: {},
      date: [],
      options: [],
      value: "",
      // 新增
      commList:[{
                        value: '-1',
                        text: '全部'
                    }, {
                        value: '0',
                        text: '未完成 '
                    },{
                        value: '1',
                        text: '已完成'
                    },{
                        value: '2',
                        text: '已失败'
                    },],
      orderList:[{
                        value: '0',
                        text: '全部 '
                    }, {
                        value: '1',
                        text: '待付款'
                    },{
                        value: '2',
                        text: '待发货'
                    },{
                        value: '3',
                        text: '待收货'
                    },{
                        value: '4',
                        text: '待评价'
                    },{
                        value: '5',
                        text: '已完成（已评价）'
                    },{
                        value: '6',
                        text: '退换货'
                    },],
      uid:'',//下级id
      order_status:'0',//下级id
      comm_status:'-1',//下级id
      start_time:'',//下级id
      end_time:'',//下级id 
    };
  },
  methods: {
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
      if (this.detial_page > Math.ceil(this.detial_total / 10))
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
    seatch(){
      if (!this.date.length)  return this.$message.error("请选择开始结束时间")
      this.start_time = this.date[0]
      this.end_time = this.date[1] 
      this.myteam()  
    },
    // 团队列表
    myteam() {
      this.loading = true;
      this.$require
        .post(this.$inter.common.myteamDetial, {
          user_id: this.Id,
          team_uid: this.uid,
          order_status: this.order_status,
          comm_status: this.comm_status,
          start_time: this.start_time, 
          end_time: this.end_time, 
          detial_page: 1,
          page: this.detial_page,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.teamList = res.data.items;
            this.detial_total = res.data.total;
          }
          this.loading = false;
        });
    },
  },
  created() {
    var err = localStorage.getItem("USER_INFO");
    this.Id = JSON.parse(err).id;
   this.uid = this.$route.query.idx
   console.log(this.uid )
    this.myteam();
  
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
      .date_list {
        /deep/ .el-date-editor .el-range__icon {
          color: #ff61a1;
        }
        /deep/ .el-input__inner {
          border: 1px solid #ff61a1;
          background-color: rgba(255, 97, 161, 0.11);
        }
        /deep/ .el-date-editor .el-range-input,
        .el-date-editor .el-range-separator {
          background: none;
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
.earnings {
  font-size: 40px;
  text-align: center;
  margin: 40px auto;
  color: #f37021;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.pink-img {
  margin-left: 5px;
  margin-top: -10px;
}
.t_flex {
  display: flex;
  justify-content: space-between;
}
.fan_list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  .price {
    color: #ff61a1;
    font-size: 28px;
  }
  .list_item {
    text-align: center;
    width: 200px;
  }
  .item_shu {
    border-right: 1px solid #999;
  }
}
.seach_in{
    width: 90px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #FF61A1;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
</style>
