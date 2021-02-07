
<template>
  <div>
    <div style="background-color: #ededed">
      <div class="top_nav flex_sb">
        <div class="flex_sa left_box">
          <p @click="toLogin">立即登录</p>
          <div>|</div>
          <p @click="toReg">注册</p>
        </div>
        <ul class="flex_sa right_box">
          <li>我的优之家</li>
          <li>|</li>
          <li class="flex_c">
            <img
              style="margin-right: 5px"
              src="../../assets/image/chqi.png"
              alt=""
            />
            <p>购物车(0)</p>
          </li>
          <li>|</li>
          <li>我的消息</li>
          <li>|</li>
          <el-popover
            placement="bottom"
            width="110"
            trigger="click" 
          >
          <div style="text-align:center"><img style="width:110px height:110px object-fit: unset;" src="../../assets/image/erweima.png" alt=""></div>
           <li slot="reference" @click="phoneApp">手机APP</li>
          </el-popover>
         
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //  跳登录
    toLogin() {
      this.$router.push("/login");
    },
    //   跳注册
    toReg() {
      this.$router.push("/register");
    },
    //  手机二维码
    phoneApp() {},
  },
  created() {},
};
</script>
<style lang="less">
.top_nav {
  width: 1200px;
  margin: auto;
  font-size: 12px;
  color: #666666;
  

  .left_box {
    width: 160px;
    p {
      cursor: pointer;
    }
  }
  .right_box {
    width: 350px;
    margin: 0;
    padding: 0;
    li {
      cursor: pointer; 
    }
     /deep/.el-popover{
       min-width: 115px !important;
  }
  }
 
}
</style>