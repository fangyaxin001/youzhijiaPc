<template>
  <div ref="container">
    <div class="home_img flex_sb">
      <!-- 轮播图 -->
      <div class="block">
        <div class="lunbo_box">
          <el-carousel height="380px">
            <el-carousel-item v-for="(item, index) in imglist" :key="index">
              <img width="100%" :src="url + item.img_url" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 轮播图右边 -->
      <div class="right_img">
        <div class="r-top_img" @click="goGoods(newsudi1)">
          <p>{{ newsudi1.name }}</p>
          <div class="bot_img">
            <div><img src="../../assets/image/home_left.png" alt="" /></div>
            <div>
              <img class="ic_img" :src="url + newsudi1.img_url" alt="" />
            </div>
          </div>
        </div>
        <div class="flex_sb">
          <div class="l_bottom_img" @click="goGoods(newsudi2)">
            <p>{{ newsudi2.name }}</p>
            <div class="bot_img">
              <div><img src="../../assets/image/home_left.png" alt="" /></div>
              <div>
                <img class="ic_img" :src="url + newsudi2.img_url" alt="" />
              </div>
            </div>
          </div>
          <div class="r_bottom_img" @click="goGoods(newsudi3)">
            <p>{{ newsudi3.name }}</p>
            <div class="bot_img">
              <div><img src="../../assets/image/home_left.png" alt="" /></div>
              <div>
                <img class="ic_img" :src="url + newsudi3.img_url" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热销产品 -->
    <div class="sell_box">
      <p class="el-icon-arrow-left f-p1" @click="black"></p>
      <p class="el-icon-arrow-right f-p2" @click="nick"></p>
      <div class="flex_sb title">
        <div class="flex_sb">
          <div>
            <img width="40px" src="../../assets/image/hot.png" alt="" />
          </div>
          <p>热销产品</p>
        </div>
        <div class="flex_sb" >
          <p class="fen_duo" @click="lookAglins">查看更多</p>
          <div>
            <img width="5px" src="../../assets/image/hot_left.png" alt="" />
          </div>
        </div>
      </div>
      <div>
        <el-scrollbar>
          <div class="flex_c">
            <div
              class="hot_List"
              v-for="(item, index) in hotGodds"
              :key="index" @click="lookDetial(item)"
            >
              <div style="width: 212px; height: 240px; border: 1px solid #eeeeee;" class="flex_c">
                <img 
                  style=" width: 170px; height: 170px; object-fit: unset"
                  v-lazy="url + item.img1_url"
                  alt=""
                />
              </div>
              <p class="ellipsis">{{ item.name }}</p>
              <div>
                <span style="font-weight: bold;">₱{{ item.xprice }} </span><s> ₱{{ item.yprice }}</s>
              </div>
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
        <div
          class="rec_box"
          v-for="(item, index) in recommended"
          :key="index"
          @click="lookDetial(item)"
        >
          <div style="text-ag">
            <img
              style="width: 170px; height: 170px; object-fit: unset"
              v-lazy="url + item.img1_url"
              alt=""
            />
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
        <div v-show="listFlag" style="text-align: center; color: #999999;font-size: 14px;margin-top:20px">不好意思，我已经到底线了...</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imglist: [], //轮播图列表
      newsudi1: {}, //新品速递
      newsudi2: {}, //新品速递
      newsudi3: {}, //新品速递
      hotGodds: [], //热销商品
      recommended: [], //商品推荐
      recPage: 1, //商品推荐页数
      listPages: null,
      flag:false,
      listFlag:false,
      hotPage:1,//热销页面数
      listhotPages:null,
    };
  },
  methods: {
    lookDetial(item) {
      console.log(item.id); 
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
    // 查看更多
    lookAglins(){
        this.$emit('looks', 2) 
    },
    // 跳转
    goGoods(item){
       console.log(item);
        this.$emit('mySevenClass', item.id) 
    },
    black(){
    this.hotPage--
    if(this.hotPage<=0){
      return
    }else{
       this.homeHotGoods();  
    }
    },
    nick(){
       this.hotPage++ 
    if (this.recPage >  this.listhotPages / 10) { 
      return
          } else {    
           this.homeHotGoods();  
          } 
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
            // console.log(this.imglist);
            this.listPages = res.data.total;
            console.log(this.listPages);
            this.recommended = [...this.recommended, ...res.data.items];
          }
        });
    },
    // 热销产品
    homeHotGoods(){
  this.$require.post(this.$inter.common.homeHotGoods, {
    page:this.hotPage
  }).then((res) => {
      console.log(res);
      if (res.code == 1) {
        this.hotGodds = res.data.items;
        this.listhotPages = res.data.total
        // console.log(this.imglist);
      }
    });
    },
    onScroll() {
      // 可滚动容器的高度
      let innerHeight = document.querySelector("#app").clientHeight;
      // 屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight <= (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
    
       if(!this.flag){
        if (outerHeight + scrollTop >= innerHeight) {
        // 加载更多操作
       this.flag = true
          if (this.recPage >this.listPages / 10) { 
           this.listFlag = true  
          } else {   
            this.recPage++;
          this.goodsTuiJian();  
          } 
      }else{
        this.flag = false
      }
     }else{
       if(outerHeight + scrollTop < innerHeight){
            this.flag = false
       }
     }
      
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed(){
    window.removeEventListener("scroll", this.onScroll);
    
  },
  created() {
    this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO")); 
    // 轮播图
    this.$require.post(this.$inter.common.slideshow, {}).then((res) => {
      console.log(res);
      if (res.code == 1) {
        this.imglist = res.data;
        console.log(this.imglist);
      }
    });
    // 新品速递
    this.$require.post(this.$inter.common.homeNewGoods, {}).then((res) => {
      console.log(res);
      if (res.code == 1) {
        if (res.data.items[0]) {
           this.newsudi1 = res.data.items[0];
        }
       if (res.data.items[1]) {
            this.newsudi2 = res.data.items[1];
        }
        if (res.data.items[2]) {
          this.newsudi3 = res.data.items[2];
        }
      
        
        // console.log(this.imglist);
      }
    });
    // 热销产品 
    this.homeHotGoods()
    // 商品推荐
    this.goodsTuiJian();
  },
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
        cursor: pointer;

      }
      .bot_img {
        display: flex;
        margin-left: 25px;
        cursor: pointer;
        .ic_img {
          width: 280px;
          height: 160px;
          object-fit: unset;
          margin-left: 20px;
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
        cursor: pointer;

      }
      .bot_img {
        display: flex;
        margin-left: 25px;
        cursor: pointer;

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
        cursor: pointer; 
      }
      .bot_img {
        display: flex;
        margin-left: 25px;
        cursor: pointer; 
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
  position: relative;
  .f-p1{
    cursor: pointer;
      position: absolute;
      left: 0;
      font-size: 20px;
      background-color:rgba(128, 128, 128, 0.1);
      width: 50px;
      height: 50px;
      border-radius: 50px;
      text-align: center;
      line-height: 50px;
      top: 130px;
      z-index: 88;
  }
  .f-p1:hover, .f-p2:hover{
     background-color:rgba(255, 97, 161, 0.2)
     
  }
  .f-p2{
    cursor: pointer; 
      z-index: 88; 
      position: absolute;
      right: 0;
        font-size: 20px;
      background-color:rgba(128, 128, 128, 0.1);
      width: 50px;
      height: 50px;
      border-radius: 50px;
      text-align: center;
      line-height: 50px;
      top: 130px;
  }
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
      margin-top: 23px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .hot_List {
    width: 210px;
    height: 310px;
    margin: 10px;
    cursor: pointer;
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
    margin-left: 15px;
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