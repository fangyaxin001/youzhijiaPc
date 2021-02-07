
<template>
  <div>
    <loginHead :setLog="true"></loginHead>
    <div class="reg_box flex-column">
      <div class="flex_c re_input" style="margin-top: 120px">
        <p>手机号</p>
        <el-input
          type="number"
          v-model="phone"
          placeholder="+86 手机号"
        ></el-input>
      </div>
      <div class="flex_c re_input">
        <p>短信验证码</p>
        <el-input type="number" v-model="vftCode" placeholder="验证码">
          <span class="yanz" slot="suffix" @click="getMa" v-if="passgei"
            >获取验证码</span
          >
          <span class="yanz" slot="suffix" v-else
            > <span style="color: red">{{ num }}</span> 秒可重新获取</span
          ></el-input
        >
      </div>
      <div class="flex_c re_input">
        <p>登录密码</p>
        <el-input v-model="password" placeholder="密码"></el-input>
      </div>
      <div class="flex_c re_input">
        <p></p>
        <button @click="forgetTo">提交</button>
      </div>
    </div>
    <bottombei></bottombei>
  </div>
</template>
<script>
import loginHead from "@/components/loginHead/loginHead.vue";
import bottombei from "@/components/bottomTitle/bottomBei.vue";
export default {
  name: "forgetword",
  components: {
    loginHead,
    bottombei,
  },
  data() {
    return {
      phone: "",
      vftCode: "",
      password: "",
      passgei: true,
      num: 60,
    };
  },
  methods: {
    forgetTo() {},
    getMa() {
      if (this.phone == "")
        return this.$message.error("手机号不能为空，请输入手机号");

      this.$message.success("验证码发送成功");
      this.passgei = false;
      this.num = 60;
      this.countDown();
    },
    // 倒计时
    countDown() {
      console.log(11);
      var timer = setInterval(() => {
        this.num--;
        if (this.num == 0) {
          clearInterval(timer);
          this.risignFilg = true;
          this.passgei = true;
        }
      }, 1000);
    },
  },
  created() {},
};
</script>
<style lang="less">
.reg_box {
  width: 1200px;
  height: 700px;
  margin: auto;
  margin-top: 30px;
  background-color: #ffffff;
  .re_input {
    width: 400px;
    margin-top: 25px;
    /deep/input::-webkit-outer-spin-button,
    /deep/input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    /deep/input[type="number"] {
      -moz-appearance: textfield;
    }
    /deep/.el-input__inner {
      line-height: normal;
    }
    .yanz {
      color: #ff61a1;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
    p {
      width: 120px;
    }
    button {
      width: 360px;
      height: 40px;
      font-size: 16px;
      color: white;
      background-color: #ff61a1;
      border: none;
      outline: none;
      text-align: center;
      cursor: pointer;
      margin-top: 30px;
    }
  }
}
</style>