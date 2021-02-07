<template>
  <div>
    <div class="fixed_box">
      <div>
        <img src="../../assets/image/new.png" alt="" />
        <p>新品需求</p>
      </div>
      <div>
        <img src="../../assets/image/myfoot.png" alt="" />
        <p>我的足迹</p>
      </div>

      <el-popover
        placement="left"
        width="150"
        trigger="click"
      >
       <div style="text-align:center">
         <div >客服电话</div>
       <p style="color:#FF61A1;font-size:14px">137339996420</p>
       </div>
        <div slot="reference">
          <img src="../../assets/image/myphone.png" alt="" />
          <p>客服电话</p>
        </div>
        <!-- <el-button >click 激活</el-button> -->
      </el-popover>
      <div class="gotop" @click="gotop">
        <img src="../../assets/image/gotop.png" alt="" />
        <p>回顶部</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollTop: null,
      //   goTopShow: false,
    };
  },
  watch: {
    // scrollTop(val) {
    //   if (this.scrollTop > 500) {
    //     this.goTopShow = true;
    //   } else {
    //     this.goTopShow = false;
    //   }
    // },
  },
  methods: {
    // handleScroll() {
    //   this.scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //     console.log(this.scrollTop);
    //   if (this.scrollTop > 200) {
    //     this.goTopShow = true;
    //   }else{
    //     this.goTopShow = false;

    //   }
    // },
    gotop() {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop <= 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    mounted() {
      // document.getElementById('body').addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
      //   window.removeEventListener("scroll", this.handleScroll);
    },
  },
};
</script>
<style lang="less">
.fixed_box {
  position: fixed;
  right: 0;
  top: 300px;
  div {
    text-align: center;
    font-size: 14px;
    width: 84px;
    background-color: #fff;
    height: 92px;
    padding: 20px 10px 10px 10px;
    box-sizing: border-box;
    box-shadow: 0 0 1px 0 #999999;
    color: #666666;
    cursor: pointer;
  }
  .gotop {
    margin-top: 20px;
    color: #ff61a1;
  }
}
</style>