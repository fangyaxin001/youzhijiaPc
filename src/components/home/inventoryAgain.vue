
<template>
  <!-- 常用清单 -->
  <div>
    <div class="recommend_box" v-show="qungDanList.length != 0">
      <!-- 列表 -->
      <div class="felx_wap">
        <div class="rec_box" v-for="(item, index) in qungDanList" :key="index" @click="lookDetial(item)">
          <div class="del_img" @click="delChangyong(item)">
            <img
              width="30px"
              height="30px"
              src="../../assets/image/delet.png"
              alt=""
            />
          </div>
          <div style="text-ag">
            <img class="bind_img" :src="url+item.img1_url" alt="" />
          </div>
          <p class="ellipsis">{{item.name}}</p>
          <p><s>₱{{item.yprice}}</s></p>
          <div class="flex_sb">
            <p class="rec_money">₱{{item.xprice}}</p>
            <p class="rec_good">{{item.nice}}个好评</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_ye" v-show="qungDanList.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totas"
        @current-change="currents"
        @prev-click="prevs"
        @next-click="nexts"
      >
      </el-pagination>
    </div>
    <div v-show="qungDanList.length == 0" class="zanwei">
      <img src="../../assets/image/zanwushuju.png" alt="" />
      <p>暂无商品清单，请前往添加</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      qungDanList: [],
      totas: null,
      newPages: 1,
    };
  },
  methods: {
    // 上一页
    prevs() {
      this.newPages--;
      if (this.newPages < 1) return (this.newPages = 1);
    
        this.qingDan();
      
    },
    // 下一页
    nexts() {
      this.newPages++;         
      if (this.newPages >Math.floor(this.totas / 10))
        return (this.newPages = this.newPages-1);
        this.qingDan();
      
    },
    // 当前页
    currents(index) {
      console.log(index);
      this.newPages = index;
        this.qingDan();
    },
    // 删除常用清单
    delChangyong(item){
      event.stopPropagation()
           this.$require
        .post(this.$inter.common.delQingDan, {
          id: item.id,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("删除成功")
            this.qingDan();
          }
        });
    }, 
    lookDetial(item) {
      if (this.USER_INFO) {
         this.$router.push({
        path:"/good_detial",
        query:{
          id:item.gid 
        }
      });
      } else {
        this.$message.error("请先登录");
      }
    },
    qingDan() {
      this.$require
        .post(this.$inter.common.qingDanList, {
          page: this.newPages,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.qungDanList = res.data.items;
            this.totas = res.data.total;   
          }
        });
    },
  },
  created() {
     this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
    this.qingDan();
  },
};
</script>
<style lang="less" >
.rec_box {
  position: relative;
  .del_img {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    overflow: hidden;
    img {
      width: 30px;
      height: 30px;
      object-fit: unset;
    }
  }
}

</style>