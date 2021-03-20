
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
          @input="loginLength"
        ></el-input>
      </div>
      <div class="flex_c re_input">
        <p>短信验证码</p>
        <el-input type="number" v-model="vftCode" placeholder="验证码">
          <span class="yanz" slot="suffix" @click="getMa" v-if="passgei"
            >获取验证码</span
          >
          <span class="yanz" slot="suffix" v-else>
            <span style="color: red">{{ num }}</span> 秒可重新获取</span
          ></el-input
        >
      </div>
      <div class="flex_c re_input">
        <p> 设置新密码</p>
        <el-input
          v-model="password"
          type="password"
          :show-password="false" 
          placeholder="密码"
          maxlength="24"
        ></el-input>
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
    // 限制登录手机号输入长度
      loginLength(e) {
        if (e.length > 12) {
          this.phone = this.phone.slice(0, 13)

        }
      },
    forgetTo() {
      if (this.phone == "")
        return this.$message.error("手机号不能为空，请输入手机号");
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.password))
        return this.$message.error("请设置密码为6-12位字母加数字的组合");
      this.$require
        .post(this.$inter.common.forgetPassword, {
          phone: this.phone,
          code: this.vftCode,
          pass: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$router.push("/login");
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    getMa() {
      if (this.phone == "")
        return this.$message.error("手机号不能为空，请输入手机号");
      console.log(this.phone);
      // 验证码
      this.$require
        .post(this.$inter.common.isCode, {
          phone: this.phone,
          type: 1,
        })
        .then((res) => { 
          console.log(res);
          if (res.code == 1) {
            this.$message.success("验证码发送成功");
            this.passgei = false;
            this.num = 60;
          this.countDown();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 倒计时
    countDown() {
      console.log(11);
      var timer = setInterval(() => {
        this.num--;
        if (this.num <= 0) {
          clearInterval(timer);
           timer = null;
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
  height: 680px;
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