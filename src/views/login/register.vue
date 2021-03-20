
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
        <p>登录密码</p>
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
        <div><button @click="registerTo">注册</button></div>
      </div>
      <div class="flex_c re_input" style="margin-top: 10px">
        <p></p>
        <div style="width: 300px">
          <el-checkbox v-model="checked"></el-checkbox><span @click="xieFlag = true">《用户协议》</span>
        </div>
      </div>
    </div>
    <bottombei></bottombei>
    
<el-dialog
  title="用户协议"
  :visible.sync="xieFlag"
  width="700px"
  :before-close="handleClose">
 <div v-html="myxieyi"></div>
</el-dialog>
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
      passgei: true,
      xieFlag:false,//打开协议 
      myxieyi:null,
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
      handleClose(){
         this.xieFlag = false
      },
    // 控制验证码
    getMa() {
      if (this.phone == "")
        return this.$message.error("手机号不能为空，请输入手机号");
       
      console.log(this.phone);
      // 验证码
      this.$require
        .post(this.$inter.common.isCode, {
          phone: this.phone,
          type: 0,
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
      if (timer) return;
      var timer = setInterval(() => {
         this.num--; 
        if (this.num <= 0) {
          clearInterval(timer);
          timer = null
          this.passgei = true;
        }
      }, 1000);
    },
    //   注册
    registerTo() {
      if (this.phone == "")
        return this.$message.error("手机号不能为空，请输入手机号");
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.password))
        return this.$message.error("请设置密码为6-12位字母加数字的组合");
      if (!this.checked) return this.$message.error("请勾选用户协议");
      this.$require
        .post(this.$inter.common.myRegister, {
          phone: this.phone,
          code: this.vftCode,
          pass: this.password,
          is_xieyi: 1,
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
  },
  created() {
      this.$require
        .post(this.$inter.common.aboutUs,{})
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
             this.myxieyi = res.data.agreement
          } else {
           
          }
        });
  },
};
</script>
<style lang="less">
.reg_box {
  /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff61a1;
  border: 1px solid #ff61a1;
}
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff61a1;
  border: 1px solid #ff61a1;
}
/deep/.el-checkbox__inner:hover {
  border: 1px solid #ff61a1;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner {
  border: 1px solid #ff61a1;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ff61a1;
}
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
      text-align: right;
      margin-right: 15px;
    }
    span{
         font-size: 14px;
         color:#ff61a1 ;
      cursor: pointer;
}
    button {
      width: 360px;
      height: 40px;
      font-size: 16px;
      color: white;
      background-color: #ff61a1;
      border-radius: 5px;
      border: none;
      outline: none;
      text-align: center;
      cursor: pointer;
      margin-top: 30px;
    }
  }
}

</style>