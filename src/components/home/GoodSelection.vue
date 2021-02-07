
<template>
  <div>
    <div class="good_box">
      <div class="classify_box">
        <div class="flex_sa classify_list">
          <p class="fenlei" :class="styleFlag ? 'bto_bor' : ''">分类:</p>
          <ul :class="styleFlag ? 'bto_bor' : ''">
            <li
              :class="navIndex == index ? 'hove_set' : ''"
              v-for="(item, index) in 14"
              :key="index"
              @mouseover="liCkick(index)"
              @mouseleave="LeaveliCkick(index)" 
            >
              全部
            </li>
            <li>新鲜蔬菜</li>
          </ul>
        </div>
        <div
          class="classify_two"
          v-show="styleFlag"
          @mouseover="liCkick()"
          @mouseleave="LeaveliCkick()"
        >
          <ul>
            <li>全部</li>
            <li>新鲜蔬菜</li>
            <li>海鲜水产</li>
            <li>肉禽</li>
            <li>调料干货</li>
            <li>全部</li>
            <li>新鲜蔬菜</li>
            <li>海鲜水产</li>
            <li>肉禽</li>
            <li>调料干货</li>
            <li>新鲜蔬菜</li>
            <li>海鲜水产</li>
            <li>肉禽</li>
            <li>肉禽</li>
            <li>肉禽</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="recommend_box">
      <!-- 列表 -->
      <div class="felx_wap">
        <div class="rec_box" v-for="(item, index) in 20" :key="index" @click="lookDetial"> 
          <div style="text-ag">
            <img src="../../assets/image/dome.png" alt="" />
          </div>
          <p class="ellipsis">十月稻田 黑米1kg五谷杂粮</p>
          <p><s>￥228</s></p>
          <div class="flex_sb">
            <p class="rec_money">￥156</p>
            <p class="rec_good">55个好评</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_ye">
      <el-pagination background layout="prev, pager, next" :total="20">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      styleFlag: false,
      navIndex: null,
      setIndex: null,
    };
  },
  methods: {
    //   点击一级分类
    liCkick(index) {
      if (index != null) {
        this.navIndex = index;
        this.setIndex = index;
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
    lookDetial(){
      this.$router.push("./good_detial")
   
    }
  },
  created() {},
};
</script>
<style lang="less">
.good_box {
  width: 1200px;
  margin: auto;
}
.classify_list {
  margin-top: 15px;
  background-color: #fff;
  overflow: hidden;
  .fenlei {
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin: 0;
  }
  p {
    color: #999999;
  }
  ul {
    width: 1100px;
    font-size: 14px;
    color: #666666;
    white-space: nowrap;

    li {
      display: inline-block;
      cursor: pointer;
      width: 100px;
      text-align: center;
      height: 50px;
      line-height: 50px;
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
</style>