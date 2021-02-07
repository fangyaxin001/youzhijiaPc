
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
        <p>设置新密码</p>
        <el-input v-model="password" placeholder="密码"></el-input>
      </div>
      <div class="flex_c re_input">
        <p></p>
        <div><button @click="registerTo">注册</button></div>
      </div>
      <div class="flex_c re_input" style="margin-top: 10px">
        <p></p>
        <div style="width: 300px">
          <el-checkbox v-model="checked">《用户协议》</el-checkbox>
        </div>
      </div>
    </div>
    <bottombei></bottombei>
  </div>
</template>
<script>
import loginHead from "@/components/loginHead/loginHead.vue";
import bottombei from "@/components/bottomTitle/bottomBei.vue";
export default {
  name: "regiter",
  components: {
    loginHead,
    bottombei,
  },
  data() {
    return {
      phone: "",
      vftCode: "",
      password: "",
      checked: true, //控制协议
      passgei:true,
    };
  },
  methods: {
    //   注册
    registerTo() {},
    // 控制验证码
    getMa(){

    }
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
      color: #FF61A1;
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