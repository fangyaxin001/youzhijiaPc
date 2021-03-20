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
      <div class="order_right">
        <div class="order_ul">
          <ul>
            <li
              @click="showSompons"
              :class="listIndex == 7 ? 'styleColer' : ''"
            >
              优惠劵
              <div v-show="listIndex == 7" class="heng"></div>
            </li>
            <li
              @click="lingjunaCenter"
              :class="listIndex == 8 ? 'styleColer' : ''"
            >
              领劵中心
              <div v-show="listIndex == 8" class="heng"></div>
            </li>
          </ul>
        </div>
        <!-- 优惠劵 -->
        <div class="you_box" v-show="listIndex == 7">
          <div class="flex_sb coup_box" v-if="mysonpons.length != 0">
            <div
              class="coup_b flex_sb"
              v-for="(item, index) in mysonpons"
              :key="index"
              :class="item.status == 1 || item.status == -1 ? 'bc_img' : ''"
            >
              <div class="left">
                <p class="p1">{{ item.name }}</p>
                <p class="p2">满{{ item.man }}减{{ item.jian }}元</p>
                <p class="p3">有效期至 {{ item.endtime | endData }}</p>
              </div>
              <div class="right">
                <p class="p1"><span>₱</span>{{ item.jian }}</p>
                <p class="p2" v-show="item.status == 0">未使用</p>
                <p class="p2 font_color" v-show="item.status == 1">已使用</p>
                <p class="p2 font_color" v-show="item.status == -1">已过期</p>
              </div>
            </div>
          </div>
          <div v-else class="zanwei">
            <img src="../../assets/image/zanwushuju.png" alt="" />
            <p>暂无优惠劵，请前往领取</p>
          </div>
          <!-- 分页 -->
          <div class="page_ye" v-show="mysonpons.length != 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="currents"
              @prev-click="prevs"
              @next-click="nexts"
            >
            </el-pagination>
          </div>
        </div>
        <!-- 领劵中心 -->
        <div class="you_box" v-show="listIndex == 8">
          <div class="flex_sb coup_box" v-if="sonponsCenter.length != 0">
            <div
              class="coup_b flex_sb"
              v-for="(item, index) in sonponsCenter"
              :key="index"
              :class="item.status == 3 ? 'bc_img' : ''"
            >
              <div class="left">
                <p class="p1">{{ item.name }}</p>
                <p class="p2">满{{ item.man }}减{{ item.jian }}元</p>
                <p class="p3">有效期至 {{ item.endtime | endData }}</p>
              </div>
              <div class="right">
                <p class="p1"><span>₱</span>{{ item.jian }}</p>
                <p class="p2" v-show="item.status == 2" @click="getTo(item)">
                  立即领取
                </p>
                <p class="p2 font_color" v-show="item.status == 3">已领取</p>
              </div>
            </div>
          </div>
          <div v-else class="zanwei">
            <img src="../../assets/image/zanwushuju.png" alt="" />
            <p>暂无优惠劵活动</p>
          </div>
            <!-- 分页 -->
          <div class="page_ye" v-show="mysonpons.length != 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="currents"
              @prev-click="prevs"
              @next-click="nexts"
            >
            </el-pagination>
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
      listIndex:7,
      mysonpons: [], //我的优惠劵列表
      sonponsCenter: [], //领劵中心
      total: null, //
      mypage: [], //当前页数
      num:1,
    };
  },
  filters: {
    endData(value) {
      value = value.substring(0, 10);
      return value;
    },
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
      if (e > 6 && e < 9) {
        this.listIndex = e;
        if (this.listIndex == 7) {
           this.num = 1
          this.sonpons(this.num);
        } else if (this.listIndex ==8) {
           this.num = 2
          this.sonpons(this.num);
        }
      } else {
        return;
      }
    },
        // 上一页
    prevs() {
      this.mypage--;
      if (this.mypage < 1) return (this.mypage = 1);
      if (this.num==1) {
        this.sonpons(this.num);
      } else {
        this.sonpons(this.num);
      }
    },
    // 下一页
    nexts() {
      this.mypage++; 
      if (this.mypage >Math.ceil(this.total / 10))  
        return (this.mypage = this.listNum / 10);
      if (this.num==1) {
        this.sonpons(this.num);
      } else {
        this.sonpons(this.num);
      }
    },
    // 当前页
    currents(index) {
      console.log(index);
      this.mypage = index;
      if (this.num==1) {
        this.sonpons(this.num);
      } else {
        this.sonpons(this.num);
      }
    },
    //立即领取优惠劵
    getTo(item) {
      this.$require
        .post(this.$inter.common.getCoupons, {
          coupons_id: item.cid,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("领取成功");
            this.sonpons(this.num);
          }
        });
    },
    // 优惠劵
    showSompons() {
      this.listIndex = 7;
      this.num =1
      this.sonpons(this.num);
    },
    // 点击领劵中心
    lingjunaCenter() {
      this.listIndex = 8;
      this.num =2
      this.sonpons(this.num);
    },
    sonpons(num) {
      this.$require
        .post(this.$inter.common.couponsList, {
          type: num,
          page: this.mypage,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.total = res.data.total;
            if (num == 2) {
              this.sonponsCenter = res.data.items;
            } else {
              this.mysonpons = res.data.items;
            }
          }
        });
    },
  },
  created() {
    this.listIndex = this.$route.query.idx;
    if (this.listIndex == 7) {
      this.num = 1
      this.sonpons(this.num);
    } else if (this.listIndex == 8) {
      this.num = 2
      this.sonpons(this.num);
    }
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
    .order_ul {
      ul {
        background-color: #fff;
        display: flex;
        padding-left: 10px;
        box-sizing: border-box;
        height: 47px;
        li {
          width: 80px;
          text-align: center;
          height: 45px;
          line-height: 45px;
          margin-left: 10px;
          color: #999999;
          cursor: pointer;
        }
        .heng {
          border-top: 3px solid #ff61a1;
          width: 40px;
          margin: auto;
        }
      }
    }
    .styleColer {
      color: #ff61a1 !important;
    }
    .you_box {
      background-color: #fff;
      margin-top: 2px;
      min-height: 500px;
      overflow: hidden;
      .coup_box {
        width: 780px;
        margin: auto;
        flex-wrap: wrap;
        .coup_b {
          width: 330px;
          margin-left: 20px;
          height: 112px;
          margin-top: 40px;
          background-image: url("../../assets/image/orgin_img.png");
          background-repeat: no-repeat;
          block-size: 100%, 100%;
          .left {
            width: 200px;
            text-align: center;
            .p1 {
              color: #333333;
              font-size: 14px;
              margin: 7px;
            }
            .p2 {
              color: #333333;
              font-size: 18px;
              font-weight: Bold;
              margin: 0;
            }
            .p3 {
              color: #999999;
              font-size: 14px;
              margin: 7px;
            }
          }
          .right {
            width: 120px;
            text-align: center;
            .p1 {
              font-size: 32px;
              font-weight: bold;
              color: white;
              margin: 10px;
              span {
                font-size: 18px;
              }
            }
            .p2 {
              width: 72px;
              height: 28px;
              border-radius: 20px;
              line-height: 28px;
              text-align: center;
              color: #ff2b4c;
              background-color: #fff;
              margin: auto;
              font-size: 12px;
              cursor: pointer;
            }
          }
        }
        .bc_img {
          background-image: url("../../assets/image/gray_img.png");
        }
        .font_color {
          color: #999999 !important;
        }
      }
    }
  }
}
.page_ye{
  margin-bottom: 20px;
}

</style>
