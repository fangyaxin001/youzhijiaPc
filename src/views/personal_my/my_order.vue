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
    <div class="mycenter">
      <!-- 左边导航栏 -->
      <personalLeft
        :showIndex="listIndex"
        @leftIndex="leftIndex"
      ></personalLeft>
      <div class="order_right">
        <div class="order_ul">
          <ul>
            <li
              @click="toIndex(index)"
              :class="listIndex == index ? 'styleColer' : ''"
              v-for="(item, index) in dataList"
              :key="index"
            >
              {{ item }}
              <div v-show="listIndex == index" class="heng"></div>
            </li>
          </ul>
        </div>
        <div class="conent_box">
          <div class="p_title">
            <p class="p1">订单详情</p>
            <p>收货人</p>
            <p>金额</p>
            <p>订单状态</p>
            <p>操作</p>
          </div>
          <ul class="list_ul">
            <li class="list_li" v-for="(item, index) in 7" :key="index">
              <div class="flex_sb list_top">
                <div class="li_title">
                  <p>2020-09-09 20:39:34</p>
                  <p class="p2">订单号：145124125412</p>
                </div>
                <div>
                  <img src="../../assets/image/pos_del.png" alt="" />
                </div>
              </div>
              <div class="list_concent">
                <!-- 订单详情 -->
                <div class="order_datial">
                  <div>
                    <img
                      style="width: 86px; height: 86px; object-fit: unset"
                      src="../../assets/image/dome.png"
                      alt=""
                    />
                  </div>
                  <div class="d2">
                    <p class="text-line p1">
                      精品胡萝卜500g 新鲜蔬菜 萝卜 生鲜
                    </p>
                    <div class="flex_sb color_box">
                      <p>颜色：<span>红色</span></p>
                      <p>x1</p>
                    </div>
                  </div>
                </div>
                <div class="shou_name">三七啊</div>
                <div class="shou_name money">￥815.00</div>
                <!-- 订单状态 -->
                <div class="shou_name">已完成</div>
                <!-- 操作 -->
                <div class="cao_zuo">
                  <p class="p1">取消订单</p>
                  <p class="p2">查看订单详情</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页 -->
        <div class="page_ye">
          <el-pagination background layout="prev, pager, next" :total="20">
          </el-pagination>
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
      dataList: [
        "全部订单",
        "待付款",
        "待发货",
        "待收货",
        "已完成",
        "退款/售后",
      ],
      listIndex: 0,
    };
  },
  methods: {
    // 接受搜索的结果
    searchName(e) {
      console.log(e);
      this.homeIndex = e.index;
      this.searchVale = e.value;
    },
    toIndex(index) {
      this.listIndex = index;
    },
    //  接受子组件传过来的索引
    leftIndex(e) {
      console.log(e);
      if (e < 6) {
        this.listIndex = e;
      } else {
        return;
      }
    },
  },
  created() {},
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
  }
}
.styleColer {
  color: #ff61a1 !important;
}
.conent_box {
  background-color: #fff;
  margin-top: 3px;
  padding: 15px;
  box-sizing: border-box;
  .p_title {
    display: flex;
    color: #333333;
    font-size: 14px;
    background-color: #f9f9f9;
    border: 1px solid #eeeeee;
    p {
      text-align: center;
      height: 54px;
      line-height: 54px;
      width: 150px;
      margin: 0;
    }
    .p1 {
      width: 320px !important;
    }
  }
  .list_ul {
    .list_li {
      margin-top: 20px;
      border: 1px solid #eeeeee;
    }
    .list_top {
      background-color: #f9f9f9;
      border-bottom: 1px solid #eeeeee;
      padding: 0 20px 0 20px;
      box-sizing: border-box;
      .li_title {
        display: flex;
        font-size: 14px;
        color: #333333;
        .p2 {
          margin-left: 25px;
        }
      }
      img {
        cursor: pointer;
      }
    }
    .list_concent {
      display: flex;
      align-items: center;
      .order_datial {
        display: flex;
        align-items: center;
        height: 120px;
        width: 320px;
        border-right: 1px solid #eeeeee;
        padding: 15px;
        box-sizing: border-box;
        .d2 {
          width: 180px;
          margin-left: 20px;
          line-height: 20px;
          p {
            font-size: 14px;
            margin: 0;
          }
          .p1 {
            margin-bottom: 3px;
          }
          .color_box {
            color: #999999;
            font-size: 14px;
            margin-top: 10px;
          }
        }
      }
      .shou_name {
        padding: 15px;
        box-sizing: border-box;
        width: 150px;
        height: 120px;
        line-height: 100px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        border-right: 1px solid #eeeeee;
      }
      .money {
        color: #f10200;
      }
      .cao_zuo {
        font-size: 14px;
        text-align: center;
        width: 150px;
        p {
          cursor: pointer;
        }
        .p1 {
          color: #999999;
        }
        .p2 {
          color: #ff61a1;
        }
      }
    }
  }
}

.page_ye {
  text-align: center;
  margin-top: 50px;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ff61a1;
  }
  /deep/.el-pagination.is-background .el-pager li:hover {
    color: #ff61a1 !important;
  }
}
</style>
