
<template>
  <div>
    <div class="seach_box">
         <p class="top_title">
          <span>“菠菜”</span> 共 <span>2683</span> 款相关产品
        </p>
      <!-- 搜索无商品 -->
      <div v-show="false">
       
        <div class="kong">
          <img src="../../assets/image/kong.png" alt="" />
          <p>抱歉~没有找到相关商品,换个词再试试吧</p>
        </div>
      </div>
      <div>
        <!-- 搜过结果 -->
        <div class="recommend_box"> 
          <!-- 列表 -->
          <div class="felx_wap">
            <div class="rec_box" v-for="(item, index) in 50" :key="index">
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["searchValue"],
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.searchValue);
  },
  created() {},
};
</script>
<style lang="less">
.seach_box {
  width: 1200px;
  margin: auto;
  margin-top: 15px;
  .top_title {
    span {
      color: #ff61a1;
    }
  }
  .kong {
    text-align: center;
    color: #666666;
    font-size: 14px;
    margin-top: 130px;
    height: 570px;
  }
}
.recommend_box {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
  .title {
    font-size: 24px;
    font-weight: bold;
    p {
      margin: 0 20px 5px 20px;
    }
  }
  .rec_box {
    width: 220px;
    height: 320px;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 3px;
    cursor: pointer;

    img {
      width: 170px;
      height: 170px;
      object-fit: unset;
    }
    .ellipsis {
      font-size: 14px;
      color: #333333;
    }
    s {
      font-size: 14px;
      color: #999999;
    }
    .rec_money {
      color: #f10200;
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }
    .rec_good {
      font-size: 14px;
      color: #bfbfbf;
      margin: 0;
    }
  }
  .rec_box:hover {
    box-shadow: 0px 0px 2px 0px #ff61a1;
  }
}
</style>