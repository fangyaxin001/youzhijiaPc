
<template>
  <div>
    <div class="detial_box">
      <!-- 详情右边 -->
      <div class="left_box">
        <!-- 轮播加规格 -->
        <div class="top_box flex_sb">
          <!-- 轮播图 放大镜 -->
          <div class="swper_box">
            <div style="big_img">
              <img
                style="width: 420px; height: 420px; object-fit: unset"
                :src="big_img"
                alt=""
              />
            </div>
            <div class="swper_small">
              <div
                class="small_img"
                v-for="(item, index) in imgPath"
                :key="index"
              >
                <img
                  style="width: 60px; height: 60px; object-fit: unset"
                  :src="item"
                  alt=""
                  @click="getImg(index)"
                />
              </div>
            </div>
          </div>
          <!-- 选择商品规格和数量 -->
          <div class="spec_box">
            <p class="top_title">精品胡萝卜500g 新鲜蔬菜 萝卜 生鲜超市</p>
            <div class="flex_sb money">
              <div class="left_flex">
                <div class="flex_sb">
                  <p class="p1">价格</p>
                  <p class="p2"><s>￥998</s></p>
                </div>
                <div class="flex_sb">
                  <p class="p1">促销价</p>
                  <p class="p3">￥558</p>
                </div>
              </div>
              <div class="flex_sb right">
                <div>
                  <p class="m1">23</p>
                  <p>好评</p>
                </div>
                <div class="riget_two">
                  <p class="m1">562</p>
                  <p>购买</p>
                </div>
              </div>
            </div>
            <!-- 包邮 -->
            <div class="cen_box">
              <div class="flex_sb yun_box">
                <p class="p1">运费</p>
                <p class="p2"><s>包邮</s></p>
              </div>
            </div>
            <!-- 颜色 -->
            <div class="flex_sb color_box">
              <p class="p1">颜色</p>
              <div class="wei_list">
                <p>红色</p>
                <p>蓝色</p>
              </div>
            </div>
            <!-- 数量 -->
            <div class="flex_sb">
              <p class="p1">数量</p>
              <div class="number">
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
              </div>
            </div>
            <div class="goumai">
              <div class="tow1" @click="goBuy">立即购买</div>
              <div class="tow2" @click="joinCart">加入购物车</div>
            </div>
            <div class="qing_box">
              <p class="pw" v-if="getDetailed">+添加值清单</p>
              <p v-else class="pi">已加入常用清单</p>
            </div>
            <div class="succeed" v-show="tureFlag">
              <img width="20px" src="../../assets/image/ture_gou.png" alt="" />
              <span>商品已成功加入购物车</span>
            </div>
          </div>
        </div>
        <!-- 详情加评价 -->
        <div class="bottom_box">
          <div class="goods_dital">
            <div
              :class="detialIndex ? 'bcshow' : ''"
              @click="detialIndex = true"
            >
              商品详情
            </div>
            <div
              :class="detialIndex ? '' : 'bcshow'"
              @click="detialIndex = false"
            >
              商品评价
            </div>
          </div>
          <div v-if="detialIndex">
            <img width="850px" src="../../assets/image/img_detial.png" alt="" />
          </div>
          <div v-else class="comment">
            <div class="comment_box" v-for="(item,index) in 5" :key="index">
              <div>
                <div class="flex_sb comment_left">
                <div><img src="../../assets/image/header.png" alt="" /></div>
                <div class="com_name_box">
                  <p class="ellipsis">我是你爸爸你爸哈哈爸</p>
                  <p class="p1">2002-12-12</p>
                </div>
              </div>
              </div>
              <div class="comment_right">
                <!-- 五星评分 -->
                <div class="good_ping">
                  <el-rate 
                    v-model="xingValue"
                    disabled
                    show-score
                    text-color="#ff9900"
                  >
                  </el-rate>
                </div>
                <p>真不错，很新鲜的，发货速度超级快真不错，很新鲜的，发货速度超级快真不错，很新鲜的，发货速度超级快真不错，很新鲜的，发货速度超级快真不错，很新鲜的，发货速度超级快真不错，很新鲜的，发货速度超级快</p>
                <div class=" img_box">
                  <div><img style="width: 83px; height: 83px; object-fit: unset" src="../../assets/image/swper2.png" alt=""></div>
                  <div><img style="width: 83px; height: 83px; object-fit: unset" src="../../assets/image/swper2.png" alt=""></div>
                  <div><img style="width: 83px; height: 83px; object-fit: unset" src="../../assets/image/swper2.png" alt=""></div>
                  <div><img style="width: 83px; height: 83px; object-fit: unset" src="../../assets/image/swper2.png" alt=""></div>
                  <div><img style="width: 83px; height: 83px; object-fit: unset" src="../../assets/image/swper2.png" alt=""></div>
                  <div><img style="width: 83px; height: 83px; object-fit: unset" src="../../assets/image/swper2.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 详情左边 为你推荐 -->
      <div class="right_box">
        <p class="title">为您推荐</p>
        <el-scrollbar style="height: 945px">
          <div class="flex_sb ml" v-for="(item, index) in 20" :key="index">
            <div>
              <img
                style="width: 120px; height: 120px; object-fit: unset"
                src="../../assets/image/dome.png"
                alt=""
              />
            </div>
            <div class="right">
              <p class="rigth_title text-line">
                十月稻田 黑米1kg五谷杂粮十月稻田
              </p>
              <p class="right_maney"><span>￥190</span><s>￥155</s></p>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      big_img: "https://t7.baidu.com/it/u=1962848802,1705699489&fm=193&f=GIF",
      imgPath: [
        "https://t7.baidu.com/it/u=1962848802,1705699489&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=3863249326,4619162&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=2961328957,4241816621&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=340366643,1502786826&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=3470247674,3294276407&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=3241382419,346296150&fm=193&f=GIF",
      ],
      num: 1, //商品数量
      getDetailed: false, //添加清单
      detialIndex: true, //商品详情和商品评价切换
      tureFlag: false, //判断添加购物车成功
      xingValue:4,//星星评分
    };
  },
  methods: {
    //   切换轮播图
    getImg(index) {
      this.big_img = this.imgPath[index];
    },
    // 添加购物车
    joinCart() {
      this.tureFlag = true;
    },
    // 增减数量
    handleChange(value) {
      console.log(value);
    },
    // 立即购买
    goBuy(){
      console.log(11);
       this.$router.push("/check_order")
    }
  },
  created() {},
};
</script>
<style lang="less" scoped>
.detial_box {
  width: 1200px;
  margin: auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  .left_box {
    width: 850px;
    .top_box {
      height: 550px;
      padding: 20px;
      box-sizing: border-box;
      .swper_box {
        width: 425px;
        .swper_small {
          display: flex;
          margin-top: 15px;
          .small_img {
            width: 60px;
            height: 60px;
            margin-left: 10px;
            border-radius: 3px;
            overflow: hidden;
            cursor: pointer;
          }
          .small_img:hover {
            box-shadow: 0px 0px 5px 0px #ff61a1;
          }
        }
      }
      .spec_box {
        height: 550px;
        padding: 15px;
        box-sizing: border-box;
        .top_title {
          font-size: 16px;
          color: #333333;
          font-weight: Regular;
        }
        .money {
          background-color: rgba(255, 97, 161, 0.1);
        }
        .left_flex {
          width: 150px;
          font-size: 14px;
          .p1 {
            color: #bfbfbf;
            margin-left: 10px;
          }
          .p2 {
            color: #666666;
          }
          .p3 {
            font-size: 18px;
            color: #f10200;
            font-weight: bold;
          }
        }
        .right {
          width: 110px;

          color: #666666;
          .m1 {
            font-weight: bold;
            margin: 0;
          }
          div {
            width: 55px;
            height: 60px;
            text-align: center;
          }
          .riget_two {
            border-left: 1px solid #fcdfea;
          }
        }
        .cen_box {
          background-color: rgba(255, 97, 161, 0.05);
          .yun_box {
            width: 150px;
            .p1 {
              color: #bfbfbf;
              font-size: 14px;
              margin-left: 15px;
            }
            .p2 {
              color: #666666;
            }
          }
        }
      }
      .color_box {
        .p1 {
          margin-left: 15px;
          color: #bfbfbf;
        }
        .wei_list {
          display: flex;
          width: 250px;
          p {
            margin: 0;
            width: 100px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            border: 1px solid #bfbfbf;
            margin-left: 15px;
            cursor: pointer;
          }
        }
      }
      .qing_box {
        .pw {
          color: #2ca9eb;
          font-size: 14px;
          margin-left: 15px;
          cursor: pointer;
        }
        .pi {
          color: #bfbfbf;
          margin-left: 15px;
          font-size: 14px;
        }
      }
      .p1 {
        margin-left: 15px;
        color: #bfbfbf;
      }
      .number {
        width: 235px;
      }
      .goumai {
        display: flex;
        div {
          margin: 15px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 5px;
          cursor: pointer;
        }
        .tow1 {
          border: 1px solid #ff61a1;
          background-color: rgba(255, 97, 161, 0.2);
          width: 120px;
          color: #ff61a1;
        }
        .tow2 {
          width: 180px;
          background-color: #ff61a1;
          border: 1px solid #ff61a1;
          color: white;
        }
      }
    }
    .spec_box {
      width: 420px;
    }
  }
  //   详情和评论
  .bottom_box {
    .goods_dital {
      display: flex;
      background-color: #fff;
      border-bottom: 1px solid #bfbfbf;
      div {
        height: 60px;
        line-height: 60px;
        text-align: center;
        width: 120px;
        color: #666666;
        font-size: 14px;
        cursor: pointer;
      }
      .bcshow {
        background-color: #ff61a1;
        color: white;
      }
    }
  }
  .right_box {
    width: 330px;
    height: 1000px;
    background-color: #fff;
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .ml {
    margin-left: 15px;
    margin-top: 15px;
  }
  .title {
    color: #333333;
    font-weight: Bold;
    font-size: 16px;
    height: 55px;
    line-height: 55px;
    margin: 0;
    padding-left: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #bfbfbf;
  }
  .right {
    margin-left: 10px;
    width: 180px;
    .rigth_title {
      width: 170px;
      font-size: 14px;
      color: #333333;
    }
    .right_maney {
      span {
        font-size: 18px;
        color: #f10200;
      }
      s {
        font-size: 14px;
        color: #999999;
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
}
.succeed {
  text-align: center;
  color: #46df6a;
  span {
    margin-top: 20px;
    display: inline-block;
    margin-left: 5px;
  }
}
.comment {
  background-color: #fff; 
  .comment_box {
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #BFBFBF;
    .comment_left {
      width: 220px;
      img {
        width: 55px;
        height: 55px;
        border-radius: 50px;
        overflow: hidden;
        object-fit: unset;
      }
      .com_name_box {
        margin-left: 10px;
        width: 150px;
        color: #333333;
        p {
          margin: 9px 0px 9 px 0px;
        }
        .p1 {
          color: #bfbfbf;
          font-size: 14px;
        }
      }
    }
    .comment_right {
      width: 580px;
      padding: 10px;
      box-sizing: border-box;
      .good_ping{
              margin-top: 10px;
        /deep/.el-rate__icon{
          font-size: 30px;
        }
      }
      .img_box{
        display: flex;
        flex-wrap: wrap;
        div {
          margin: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>