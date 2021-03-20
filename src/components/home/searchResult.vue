
<template>
  <div>
    <div class="seach_box">
        <div v-show="total"> <p class="top_title" v-if="searchValue"> <span>“{{searchValue}}”</span> 共 <span>{{total}}</span> 款相关产品 </p>
         <p class="top_title" v-else> 共 <span>{{total}}</span> 款相关产品 </p>
         </div>
      <!-- 搜索无商品 -->
      <div v-show="!total">
       
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
            <div class="rec_box" v-for="(item, index) in goodsList" :key="index" @click="lookDetial(item)" >
              <div style="text-ag">
                <img v-lazy="url+item.img1_url" alt="" />
              </div>
              <p class="ellipsis">{{item.name}}</p>
              <p><s>₱{{item.yprice}}</s></p>
              <div class="flex_sb">
                <p class="rec_money">₱{{item.xprice}}</p>
                <p class="rec_good">{{item.nice}}个好评</p>
              </div>
            </div>
          </div>
          <div v-if="goodsList.length != 0" v-show="listFlag" style="text-align: center; color: #999999;font-size: 14px;margin-top:20px">不好意思，我已经到底线了...</div>
        </div>

      </div>
      
    </div>
    
  </div>
</template>
<script>
export default {
  props: ["searchValue"],
  data() {
    return {
       newPages:1,
      total:null,
      goodsList:[],
      flag:false,
      listFlag:false,
    };
  },
  watch:{
     searchValue(newval,oldval){
       this.newPages = 1
       this.goodsList= []
       this.listFlag = false
       this.searchValue = newval
        this.seatchList();
      
     }
  },
  methods: {
    // 查看商品详情
    lookDetial(item){
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
        console.log(this.recPage);
        // 加载更多操作
       this.flag = true
          if (this.newPages > this.total / 10) { 
           this.listFlag = true  
          } else {   
            this.newPages++;
          this.seatchList();  
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
    // 搜索商品
    seatchList(){
               this.$require .post(this.$inter.common.goodsList, {
          page: this.newPages,
          search:this.searchValue,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.total = res.data.total;
            this.goodsList = [...this.goodsList,...res.data.items];
          }else{
             this.total =0
             this.goodsList = []
          }
         
    })
    }
  },
  mounted() {
    console.log(this.searchValue);
        this.seatchList();
    window.addEventListener("scroll", this.onScroll);
  },
  created() {
    this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO")); 

  },
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
    height:490px;
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