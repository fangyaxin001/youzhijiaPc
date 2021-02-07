<template>
  <div>
    <div class="home_img flex_sb">
      <!-- 轮播图 -->
      <div class="block">
        <div class="lunbo_box">
          <el-carousel height="380px">
            <el-carousel-item v-for="(item, index) in imglist" :key="index">
              <img width="100%" :src="item" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 轮播图右边 -->
      <div class="right_img">
        <div class="r-top_img">
          <p>米面粮油上新</p>
          <div class="bot_img">
            <div><img src="../../assets/image/home_left.png" alt="" /></div>
            <div>
              <img
                class="ic_img"
                src="../../assets/image/home_left2.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex_sb">
          <div class="l_bottom_img">
            <p>新鲜蔬菜</p>
            <div class="bot_img">
              <div><img src="../../assets/image/home_left.png" alt="" /></div>
              <div>
                <img
                  class="ic_img"
                  src="../../assets/image/home_left3.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="r_bottom_img">
            <p>酒饮上新</p>
            <div class="bot_img">
              <div><img src="../../assets/image/home_left.png" alt="" /></div>
              <div>
                <img
                  class="ic_img"
                  src="../../assets/image/home_left4.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热销产品 -->
    <div class="sell_box">
      <div class="flex_sb title">
        <div class="flex_sb">
          <div>
            <img width="40px" src="../../assets/image/hot.png" alt="" />
          </div>
          <p>热销产品</p>
        </div>
        <div class="flex_sb">
          <p class="fen_duo">查看更多</p>
          <div>
            <img width="5px" src="../../assets/image/hot_left.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <el-scrollbar>
          <div class="flex_c">
            <div class="hot_List" v-for="(item, index) in 5" :key="index">
              <div><img src="../../assets/image/dome.png" alt="" /></div>
              <p class="ellipsis">十月稻田asdddddddddddddd 黑米1kg五谷杂粮</p>
              <div><span>￥419 </span><s> ￥998</s></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!-- 为你推荐 -->
    <div class="recommend_box">
      <div class="flex_c title">
        <div><img src="../../assets/image/wei_left.png" alt="" /></div>
        <p>为您推荐</p>
        <div><img src="../../assets/image/wei_right.png" alt="" /></div>
      </div>
      <!-- 列表 -->
      <div class="felx_wap">
        <div class="rec_box" v-for="(item, index) in 50" :key="index"  @click="lookDetial">
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
</template>
<script>
export default {
  data() {
    return {
      imglist: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg&refer=http%3A%2F%2Fa0.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614846038&t=cc8c4571d07f7c3227a37bee10c623a2",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa0.att.hudong.com%2F52%2F62%2F31300542679117141195629117826.jpg&refer=http%3A%2F%2Fa0.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614846038&t=bbd79eabe064a78d7c5dd1f039cf3250",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F27%2F81%2F01200000194677136358818023076.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614846038&t=09b91db3d5a408f8a14e11675257ddf9",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa1.att.hudong.com%2F81%2F71%2F01300000164151121808718718556.jpg&refer=http%3A%2F%2Fa1.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614846038&t=c52fd607bec575235aee04edd71f2351",
      ],
    };
  },
  methods: {
    lookDetial(){
      this.$router.push("/good_detial")
    }
  },
  created() {},
};
</script>
<style lang="less">
.home_img {
  width: 1200px;
  margin: auto;
  margin-top: 10px;
  .lunbo_box {
    width: 750px;
  }
  .right_img {
    width: 430px;
    height: 380px;
    .r-top_img {
      background: linear-gradient(to bottom, #c6efc3, #4db95f);
      overflow: hidden;
      height: 230px;
      p {
        color: white;
        margin-top: 20px;
        margin-left: 25px;
        margin: 20px 0 5px 25px;
        font-size: 18px;
      }
      .bot_img {
        display: flex;
        margin-left: 25px;
        .ic_img {
          width: 300px;
          height: 180px;
          object-fit: unset;
        }
      }
    }
    .l_bottom_img {
      background: linear-gradient(to bottom, #d3ef9f, #96c754);
      overflow: hidden;
      width: 210px;
      height: 150px;
      margin-top: 5px;
      p {
        color: white;
        margin-top: 20px;
        margin-left: 25px;
        margin: 20px 0 5px 25px;
        font-size: 18px;
      }
      .bot_img {
        display: flex;
        margin-left: 25px;
        .ic_img {
          width: 120px;
          height: 90px;
          object-fit: unset;
        }
      }
    }
    .r_bottom_img {
      background: linear-gradient(to bottom, #d3ef9f, #96c754);
      overflow: hidden;
      width: 210px;
      height: 150px;
      margin-top: 5px;

      p {
        color: white;
        margin-top: 20px;
        margin-left: 25px;
        margin: 20px 0 5px 25px;
        font-size: 18px;
      }
      .bot_img {
        display: flex;
        margin-left: 25px;
        .ic_img {
          width: 120px;
          height: 90px;
          object-fit: unset;
        }
      }
    }
  }
}
.sell_box {
  width: 1200px;
  margin: auto;
  margin-top: 20px;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  .title {
    height: 30px;
    p {
      margin-left: 5px;
      color: #ff61a1;
      margin-bottom: 23px;
      font-size: 20px;
    }
    .fen_duo {
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .hot_List {
    width: 210px;
    height: 310px;
    margin: 10px;
    p {
      font-size: 14px;
      color: #333333;
    }
    span {
      font-size: 18px;
      color: #f10200;
    }
    s {
      font-size: 14px;
      color: #999999;
    }
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
    margin-top: 10px; 
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