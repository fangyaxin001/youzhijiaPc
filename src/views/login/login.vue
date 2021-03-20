<template>
  <div class="home">
    <loginHead></loginHead>
    <div class="login_box">
      <div class="center_box flex_sa">
        <div style="width: 400px"></div>
        <div class="login_inpit_box">
          <div style="width: 300px; margin: auto">
            <h3>账号登录</h3>
            <div class="my_input">
              <el-input
                type="number"
                v-model="phone"
                placeholder="+86 手机号" @input="loginLength"
              ></el-input>
            </div>
            <div class="my_input">
              <el-input
                v-model="password"
                placeholder="密码"
                :show-password="false" 
                :type="pwdType"
                maxlength="24"
                
              >
               <i v-show="!flag" slot="suffix" class="el-icon-view  top" @click="showPwd"></i>
               <img v-show="flag" width="15px"  slot="suffix"  class="top" src="../../assets/image/biyan.png" alt=""  @click="showPwd">
    </el-input>
            </div>
            <div class="forget_word" @click="forgetWord">忘记密码</div>
            <div class="buttin_login"> 
              <button @click="loginTo">登录</button>
            </div>
            <div class="nophone">
              <p>还没有账号？<span @click="register">免费注册</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bottombei></bottombei>
  </div>
</template>

<script>
// @ is an alias to /src
import loginHead from "@/components/loginHead/loginHead.vue";
import bottombei from "@/components/bottomTitle/bottomBei.vue";

export default {
  name: "login",
  components: {
    loginHead,
    bottombei,
  },
  data() {
    return {
      phone: "", //手机号
      password: "", //密码
      pwdType:'password',
      flag:true,
    };
  },
  methods: {
    
showPwd () {
  this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
   this.flag = !this.flag
  //  let e = document.getElementsByClassName('el-icon-view')[0];
  // this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc')
},
    // 忘记密码
    forgetWord() { 
      this.$router.push("/forgetword")
    },
    // 注册
    register() {
      this.$router.push("/register")

    },
     // 限制登录手机号输入长度
      loginLength(e) {
        if (e.length > 12) {
          this.phone = this.phone.slice(0, 13)

        }
      },
    // 登录
    loginTo(){
      if (this.phone == "") return this.$message.error("手机号不能为空，请输入手机号"); 
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.password)) return this.$message.error('请输入密码为6-12位字母加数字的组合')  
       this.$require.post(this.$inter.common.myLogin, {
                        phone: this.phone, 
                        pass:this.password,
                    }).then(res=>{
                      console.log(res);
                      if(res.code==1){
                           localStorage.setItem("is_userId",  JSON.stringify(res.data.userId))

                         this.$require.post(this.$inter.common.personalDetails,{ 
                           user_id:res.data.userId
                         }).then(res=>{
                           console.log(res);
                           localStorage.setItem("USER_INFO",  JSON.stringify(res.data))
                        this.$message.success("登录成功")
                        this.$router.push("/")
                         })
                        
                      }else{
                        this.$message.error(res.msg)

                      } 
                    })
      
    }
  },
  created() {},
};
</script>
<style lang="less" scoped>
.login_box {
  width: 100%;
  height: 710px;
  background-image: url(../../assets/image/loginbc.png);
  background-repeat: no-repeat;
  background-position: 100%, 100%;
  .center_box {
    width: 1200px;
    height: 600px;
    margin: auto;
    .login_inpit_box {
      width: 400px;
      height: 500px;
      background-color: white;
      padding: 30px;
      box-sizing: border-box;
      .my_input {
        margin-top: 30px;
      }
      .forget_word {
        text-align: right;
        color: #2ca9eb;
        font-size: 14px;
        margin: 5px;
        cursor: pointer;
      }
      .buttin_login {
        width: 100%;
        button {
          width: 100%;
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
      .nophone {
        color: #999999;
        font-size:  14px;
        span{
          color: #FF61A1;
          cursor: pointer;
        }
      }
    }
  }
}

 /deep/input::-webkit-outer-spin-button,
  /deep/input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  } 
  /deep/input[type="number"] {
    -moz-appearance: textfield;
    
  }
  /deep/.el-input__inner{
    line-height: normal;
  }
.top{
  margin-top: 14px;
  margin-right: 2px;
}
</style>
