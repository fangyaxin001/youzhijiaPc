
<template>
  <div>
    <div class="good_box">
      <div class="classify_box">
        <div class="classify_list">
          <p class="fenlei" :class="styleFlag ? 'bto_bor' : ''">分类:</p>
          <ul :class="styleFlag ? 'bto_bor' : ''">
            <li :class="allGoods ? 'all_goods' : ''" @click="myallGoods">
              全部
            </li>
            <div class="scoll">
              <li
                :class="navIndex == index ? 'hove_set' : ''"
                :style="{ color: titleIndex == index ? '#ff61a1' : '' }"
                v-for="(item, index) in oneList"
                :key="index"
                @mouseover="liCkick(index, item)"
                @mouseleave="LeaveliCkick(index)"
              >
                {{ item.name }}
              </li>
            </div>
          </ul>
        </div>
        <div
          class="classify_two"
          v-show="styleFlag"
          @mouseover="liCkick()"
          @mouseleave="LeaveliCkick()"
        >
          <ul>
            <li
              @click="myGoodsList(item)"
              class="two_li"
              v-for="(item, index) in twoList"
              :key="index"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="recommend_box">
      <!-- 列表 -->
      <div class="felx_wap">
        <div
          class="rec_box"
          v-for="(item, index) in goodsList"
          :key="index"
          @click="lookDetial(item)"
        >
          <div style="text-ag">
            <img v-lazy="url + item.img1_url" alt="" />
          </div>
          <p class="ellipsis">{{ item.name }}</p>
          <p>
            <s>₱{{ item.yprice }}</s>
          </p>
          <div class="flex_sb">
            <p class="rec_money">₱{{ item.xprice }}</p>
            <p class="rec_good">{{ item.nice }}个好评</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_ye">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="listNum"
        @current-change="currents"
        @prev-click="prevs"
        @next-click="nexts"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ["myCalss"],
  data() {
    return {
      styleFlag: false,
      allGoods: true,
      navIndex: null,
      setIndex: null,
      titleIndex: null,
      itemObj: null,
      oneList: [], //一级分类
      twoList: [], //二级分类
      goodsList: [], //商品列表
      listNum: null,
      newPages: 1, //商品分页
    };
  },
  methods: {
    //   点击一级分类
    liCkick(index, item) {
      if (index != null) {
        this.navIndex = index;
        this.setIndex = index;

        this.classList(item.id);
      } else {
        this.navIndex = this.setIndex;
      }
      this.styleFlag = true;
    },
    //  鼠标离开
    LeaveliCkick() {
      this.navIndex = null;
      this.styleFlag = false;
    },
    lookDetial(item) {
      if (this.USER_INFO) {
         this.$router.push({
        path:"/good_detial",
        query:{
          id:item.id 
        }
      });
      } else {
        this.$message.error("请先登录");
      }
    },
    // 商品列表
    myGoodsList(item) {
      this.itemObj = item.id;
      this.newPages = 1;
      this.allGoods = false;
      this.titleIndex = this.navIndex;
      this.goodsFrom(item.id);
    },
    // 全部
    myallGoods() {
      this.itemObj = null;
      this.newPages = 1;
      this.allGoods = true;
      this.titleIndex = null;
      this.goodsFrom();
    },
    // 分类
    classList(num) {
      this.$require
        .post(this.$inter.common.goodCateOne, {
          id: num,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            if (num == 0) {
              this.oneList = res.data; 
             if (this.myCalss) {
                for (var i = 0; i < this.oneList.length; i++) {
                if (this.oneList[i].id == this.myCalss) {
                  this.titleIndex = i;
                }
              }
             }
            } else {
              this.twoList = res.data;
              console.log(this.twoList);
            }
          }
        });
    },
    // 上一页
    prevs() {
      this.newPages--;
      if (this.newPages < 1) return (this.newPages = 1);
      if (this.itemObj) {
        this.goodsFrom(this.itemObj);
      } else {
        this.goodsFrom();
      }
    },
    // 下一页
    nexts() {
      this.newPages++;
      if (this.newPages >  Math.ceil(this.listPages / 10))
        return (this.newPages = this.listNum / 10);
      if (this.itemObj) {
        this.goodsFrom(this.itemObj);
      } else {
        this.goodsFrom();
      }
    },
    // 当前页
    currents(index) {
      console.log(index);
      this.newPages = index;
      console.log(this.itemObj);
      if (this.itemObj) {
        this.goodsFrom(this.itemObj);
      } else {
        this.goodsFrom();
      }
    },
    goodsFrom(item) {
      console.log(this.titleIndex);
      this.$require
        .post(this.$inter.common.goodsList, {
          page: this.newPages,
          cate_id: item,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.listNum = res.data.total;
            this.goodsList = res.data.items;
          }
        });
    },
  },
  created() {
     this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));

    console.log(this.myCalss);
    if (this.myCalss) {
      this.itemObj = this.myCalss
      this.classList(0);
      this.goodsFrom(this.myCalss);
    } else {
      this.classList(0);
      console.log(this.titleIndex);
      this.goodsFrom();
    }
  },
};
</script>
<style lang="less">
.good_box {
  width: 1200px;
  margin: auto;
}
.classify_list {
  display: flex;
  align-items: center;
  margin-top: 15px;
  background-color: #fff;
  overflow: hidden;
  .fenlei {
    width: 70px;
    text-align: center;
    height: 51px;
    line-height: 50px;
    margin: 0;
  }
  p {
    color: #999999;
  }
  ul {
    width: 1130px;
    font-size: 14px;
    color: #666666;
    white-space: nowrap;

    li {
      display: inline-block;
      cursor: pointer;
      width: 70px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      padding: 0 7px 0 7px;
    }
  }
}
.classify_two {
  background-color: #fff;
  border: 1px solid #ff61a1;
  border-top: none;
  ul {
    font-size: 14px;
    color: #666666;
    display: flex;
    flex-wrap: wrap;

    li {
      cursor: pointer;
      width: 90px;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  }
}
.hove_set {
  color: #ff61a1;
  border: 1px solid #ff61a1;
  border-bottom: 1px solid white;
  margin-bottom: -1px;
  width: 98px !important;
}
.bto_bor {
  border-bottom: 1px solid #ff61a1;
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
.two_li:hover {
  color: #ff61a1;
}
.all_goods {
  color: #ff61a1;
}
// 滚动
.scoll {
  display: inline-block;
  width: 1060px;
}
</style>