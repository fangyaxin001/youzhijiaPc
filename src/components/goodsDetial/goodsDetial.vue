
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
                :src="url+big_img"
                alt=""
              />
            </div>
            <div class="swper_small">
              <div
                class="small_img"
                v-for="(item, index) in goodsData.img_url"
                :key="index"
              >
                <img
                  style="width: 60px; height: 60px; object-fit: unset"
                  :src="url+item"
                  alt=""
                  @click="getImg(index)"
                />
              </div>
            </div>
          </div>
          <!-- 选择商品规格和数量 -->
          <div class="spec_box">
            <p class="top_title">{{goodsData.name}}</p>
            <div class="flex_sb money">
              <div class="left_flex">
                <div class="flex_sb">
                  <p class="p1">价格</p>
                  <p class="p2"><s>₱{{goodsData.yprice}}</s></p>
                </div>
                <div class="flex_sb"> 
                  <p class="p1" style="margin-top: 0;">促销价</p>
                  <p class="p3" style="margin-top: 0;">₱{{goodsData.xprice}}</p>
                </div>
              </div>
              <div class="flex_sb right">
                <div>
                  <p class="m1">{{goodsData.nice}}</p>
                  <p style="margin-top: 3px;">好评</p>
                </div>
                <div class="riget_two">
                  <p class="m1">{{goodsData.sales}}</p>
                  <p style="margin-top: 3px;">购买</p>
                </div>
              </div>
            </div>
            <!-- 包邮 -->
            <div class="cen_box">
              <div class="flex_sb yun_box">
                <p class="p1">运费</p>
                <p class="p2" v-if="goodsData.cost==0"><s>包邮</s></p>
                <p class="p2" v-else>{{goodsData.cost}}</p>
              </div>
            </div>
            <!-- 颜色 -->
            <div class="flex_sb color_box">
              <p class="p1">规格</p>
              <div class="wei_list">
                <p :class="guigeIndex == index3 ? 'phover':''" class="ellipsis" v-for="(item3,index3) in goodsData.size" :key="index3" @click="guigeClick(item3,index3)">
                  {{item3.note}}<img v-show= "guigeIndex == index3" class="abxuan" src="../../assets/image/xuan.png" alt="">  </p>
                 
              </div>
            </div>
            <!-- 数量 -->
            <div class="flex_sb">
              <p class="p1">数量</p>
              <div class="number">
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :precision="0"
                  :min="1"
                  :max="guigeTotal"
                  label="描述文字"
                ></el-input-number>
              </div>
            </div>
            <div class="goumai">
              <div class="tow1" @click="goBuy">立即购买</div>
              <div class="tow2" @click="joinCart">加入购物车</div>
            </div>
            <div class="qing_box">
              <p class="pw" v-if="goodsData.isQingdan==-1" @click="addQingdan">+添加至清单</p>
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
              @click="goodPing"
            >
              商品评价
            </div>
          </div>
          <div v-if="detialIndex">
            <div v-show="noteImg.length != 0" v-for="(item2,index2) in noteImg" :key="index2"><img width="850px" :src="url+item2" alt="" /></div>
            <div v-show="noteImg.length == 0" class="noDetial">
              该商品暂无详情介绍
            </div>
          </div>
          <div v-else class="comment">
            <div v-show="pinglunList.length!=0" class="comment_box" v-for="(item,index) in pinglunList" :key="index">
              <div>
                <div class="flex_sb comment_left">
                <div><img :src="url+item.headimg_url" alt="" /></div>
                <div class="com_name_box">
                  <p class="ellipsis">{{item.nick}}</p>
                  <p class="p1">{{item.datetime | endData}}</p>
                </div>
              </div>
              </div>
              <div class="comment_right">
                <!-- 五星评分 -->
                <div class="good_ping">
                  <el-rate 
                    v-model="item.nice"
                    disabled
                    
                    text-color="#ff9900"
                  >
                  </el-rate>
                </div>
                <p>{{item.content}}</p>
                <div class=" img_box">
                  <viewer :images="item.img_url">
                      <img 
                      
                        v-for="(itemImg, indexImg) in item.img_url"
                        :key="indexImg"
                         style="width: 83px; height: 83px; object-fit: unset; margin-left:10px" 
                        :src="url+itemImg"
                        alt=""
                      />
                    </viewer>
                  <!-- <div v-for="(item,index) in item.img" :key="index"><img  :src="url+item" alt=""></div> -->
                </div>
              </div>
            </div>
            <div v-show="pinglunList.length==0" class="noDetial">
               该商品暂无评论内容
            </div>
          </div>
        </div>
      </div>
      <!-- 详情左边 为你推荐 -->
      <div class="right_box">
        <p class="title">为您推荐</p>
        <el-scrollbar style="height: 945px">
          <div class="flex_sb ml" :class="mlIndex==index ? 'mlgo':''" v-for="(item, index) in recommended" :key="index" @click="recommendClick(item,index)">
            <div style="width: 120px; height: 120px; border: 1px solid #eeeeee;" class="flex_c">
              <img
                style="width: 90px; height: 90px; object-fit: unset"
                :src="url+item.img1_url"
                alt=""
              />
            </div>
            <div class="right">
              <p class="rigth_title text-line" >
               {{item.name}}
              </p>
              <p class="right_maney" ><span style="font-weight: bold;">₱{{item.xprice}}</span><s>₱{{item.yprice}}</s></p>
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
      goodId:'',//商品Id
      big_img: "", 
      num: 1, //商品数量
      detialIndex: true, //商品详情和商品评价切换
      tureFlag: false, //判断添加购物车成功
      xingValue:4,//星星评分
      goodsData:{},//商品详情数据
      noteImg:[],//商品详情图片
      guigeIndex:0,//规格索引
      guigeTotal:null,//库存
      guigeId:'',//规格Id
      pinglunList:[],//评论列表
      newPage:1,
      total:null,
      recommended:[],//为你推荐
      mlIndex:null,
    };
  },
 
  filters:{
      endData(value){
        value = value.substring(0,10)
        return value
      }
  },
  methods: {
    //   切换轮播图
    getImg(index) {
      this.big_img = this.goodsData.img_url[index];
    },
    // 添加购物车
    joinCart() { 
        this.$require
        .post(this.$inter.common.addTrolley, {
          gid:this.goodId,
          gsid:this.guigeId,
          num:this.num
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
            this.$require
        .post(this.$inter.common.getTrolley, {
          page: this.myPage,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
             this.$store.commit("Trolley",res.data.total)
          }
        });
          this.tureFlag = true; 
          setTimeout(()=>{
             this.tureFlag = false; 
          },2000)
          }
        });
    },
    recommendClick(item,index){
         console.log(item);
         this.mlIndex= index
         this.goodId = item.id
         this.$require
        .post(this.$inter.common.goodsDetial, {
          goods_id: this.goodId,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.detialIndex = true
            this.tureFlag = false
            // console.log(this.imglist);
            this.goodsData = res.data
            this.big_img = res.data.img_url[0]
            this.guigeTotal = res.data.size[0].total
            this.guigeId = res.data.size[0].id
            this.noteImg = res.data.note_url
          }
        });
        this.goodsTuiJian()
    },
    // 增减数量
    handleChange(value) {
      console.log(value);
    },
    // 立即购买
    goBuy(){
      console.log(11);  
      var gid = JSON.stringify([""+this.goodId+""])
      var size = JSON.stringify([""+this.guigeId+""]) 
       this.$router.push({
         path:"/check_order",
         query:{
           gid:gid,
           size:size,
           num:this.num,
           type:2
         }
       })
   
    },
    //选择规格
    guigeClick(item,index){
       this.guigeIndex = index 
       this.guigeId = item.id
       this.goodsData.xprice = item.xprice
       this.goodsData.yprice = item.yprice
       this.guigeTotal = item.total
    },
    // 添加至清单
    addQingdan(){ 
      this.$require
        .post(this.$inter.common.addQingDan, {
          common_id: this.goodId,
          type:1
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
            console.log(this.goodsData);
            this.goodsData.isQingdan = 1
            console.log(this.goodsData.isQingdan);
          }
        });
    },
    // 商品评价
    goodComment(){
    this.$require
        .post(this.$inter.common.goodComment, {
          goods_id: this.goodId,
          page:this.newPage 
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
           this.pinglunList = [...this.pinglunList,...res.data.items] 
           this.total = res.data.total
          }
        });
    },
    // 商品评价
    goodPing(){
      this.pinglunList = []
      this.detialIndex= false 
       this.goodComment()
    },
     // 商品推荐
    goodsTuiJian() {
      this.$require
        .post(this.$inter.common.recommendedGoods, {
          page: this.recPage,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.recommended = res.data.items;
          }
        });
    },
      },
  created() {
    this.goodId = this.$route.query.id
     this.$require
        .post(this.$inter.common.goodsDetial, {
          goods_id: this.goodId,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            // console.log(this.imglist);
            this.goodsData = res.data
            this.big_img = res.data.img_url[0]
            this.guigeTotal = res.data.size[0].total
            this.guigeId = res.data.size[0].id
            this.noteImg = res.data.note_url
          }
        });
        this.goodsTuiJian()
  },
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
            width: 80px;
          }
          .p3 {
            font-size: 18px;
            color: #f10200;
            font-weight: bold;
             width: 80px;
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
          flex-wrap: wrap;
          width: 300px;
          margin-bottom: 10px;
          p {
            position: relative;
            margin:15px 0  0 10px;
            min-width: 60px;
            height: 35px;
            max-width: 300px;
            padding: 0 20px 0 10px;
            box-sizing: border-box;
            text-align: center;
            line-height: 35px;
            border: 1px solid #bfbfbf;
            cursor: pointer;
          }
          .abxuan{
            position: absolute;
            height: 13px;
            right: -1px;
            bottom: 0;
            z-index: 99;
           
          }
          p:hover{
            color: #ff61a1;
            border: 1px solid #ff61a1;
          }
          .phover{
            color: #ff61a1;
            border: 1px solid #ff61a1;
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
    width: 335px;
    height: 1000px;
    background-color: #fff;
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .ml {
     width: 330px;
    margin-left: 3px;
    margin-top: 15px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .ml:hover{
       box-shadow: 0px 0px 3px 0px #ff61a1;  
  }
   .mlgo{
     outline: 1px solid #ff61a1;
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
      margin-bottom: 50px;
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
    // background-color: #fff;
   
  .comment_box {
    background-color: #fff;
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
.noDetial{
  color: #999999;
  font-size: 14px;
  margin-top: 50px;
  text-align: center;
}
</style>