
<template>
  <div>
    <div style="background-color: #ededed">
      <div class="top_nav flex_sb">
        <div class="flex_sa left_box">
          <p class="p1" @click="myYouzhijia" v-if="USER_INFO">{{nick}}</p>
          <p @click="toLogin" v-else >立即登录</p>
          <div>|</div>
          <p @click="clearInfo"  v-if="USER_INFO">退出</p>
          <p @click="toReg" v-else>注册</p>
        </div>
        <ul class="flex_sa right_box">
          <li @click="myYouzhijia">我的优之家</li>
          <li>|</li>
          <li class="flex_c">
            <img
              style="margin-right: 5px"
              src="../../assets/image/chqi.png"
              alt=""
            />
            <p @click="goCart" >购物车<span v-show="total">({{total}})</span></p>
          </li>
          <li>|</li>
          <li @click="myMessage">我的消息</li>
          <li>|</li>
          <el-popover
            placement="bottom"
            width="110"
            trigger="click" 
          >
          <div v-if="!user_id" class="phoneApp" style="text-align:center"><img width="110px" style="width:110px height:110px object-fit: unset;" src="../../assets/image/erweima.png" alt=""></div>
          <div  v-else class="phoneApp" style="text-align:center"><img width="110px" style="width:110px height:110px object-fit: unset;" :src="condeImg" alt=""></div>
           <li slot="reference" @click="phoneApp" v-if="!user_id">手机APP</li>
           <li slot="reference" @click="phoneApp" v-else>分享二维码</li>
          </el-popover>
         
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

export default {
  data() {
    return {
      total:null,
      nick:"",
      user_id:'',
      condeImg:'',
    };
  },
  computed: {
      ...mapState(["trolley","myname"])
    },
    watch:{
      trolley(newVal,oldVal){
             if(this.trolley){
            this.total = newVal
    }
      },
      myname(newVal,oldVal){
        console.log(newVal);
       this.nick = newVal
      }
    },
  methods: {
    //退出
    clearInfo(){
      localStorage.clear()
      this.$router.push("/login")
    },
    //  跳登录
    toLogin() {
      this.$router.push("/login");
    },
    //   跳注册
    toReg() {
      this.$router.push("/register");
    },
    // 获取分享维码
    getCode(){
  this.$require
        .post(this.$inter.common.getCode, {
          user_id: this.user_id
         
        })
        .then((res) => {
      console.log(res)
      this.condeImg = res.data.invitation_code_url
        })
    },
    // 我的消息
    myMessage(){
       if(this.USER_INFO){
         this.$store.commit("myMessage",true)
     this.$router.push({
        path:"/my_message",
        query:{
          idx:12
        }
      }); 
      }else{
        this.$message.error("请先登录")
      }
   
    },
    // 购物车
    goCart(){ 
     if(this.USER_INFO){
  this.$router.push("/shopping_cart")
      }else{
        this.$message.error("请先登录")
      }
    },
    // 我的优之家
    myYouzhijia(){
      if(this.USER_INFO){
  this.$router.push({  
        path:"/myYouZhiJia"
      });
      }else{
       this.$router.push({
        path:"/login"
      });
      }
       
    },
    //  手机二维码s
    phoneApp() {},
  },
  created() {
    console.log(this.trolley);
     this.user_id = JSON.parse(localStorage.getItem("is_userId")); 
     this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
     this.nick = this.USER_INFO.nick
      this.$require
        .post(this.$inter.common.getTrolley, {
          page: this.myPage,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
          this.total = res.data.total
          }
        });
        this.getCode()
  },
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
    .p1{
        color:  #FF61A1;
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
.phoneApp{
  padding: 10px 0 10px 0;
  border: 1px solid #eeeeee;
}
</style>