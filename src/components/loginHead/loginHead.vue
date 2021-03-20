<template>
  <div style="background: #ffffff">
    <div class="head_top flex_sb">
      <h1 class="left_you" @click="toHome">优之家易购</h1>
      <div v-show="setLog" class="right_you">
        已有优之家账号？<span class="login" @click="toLogin">登录</span>
      </div>
      <div v-show="seatch" class="ceach_input">
        <el-input placeholder="新鲜菜等你搜" v-model="searchValue" maxlength="15" @keyup.enter.native="searchGo">
          <el-button slot="append" style="cursor: pointer;" @click="searchGo">搜索</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["setLog", "seatch",'clear'],
  data() {
    return {
      searchValue: "",
     
    };
  },
  methods: {
    // 跳登录
    toLogin() {
      this.$router.push("/login");
    },
    // 跳首页
    toHome() {
      this.$router.push("/");
    },
    // 点击搜索搜索
    searchGo() {
      console.log(11); 
            this.$emit('searchName', {value:this.searchValue,index:0}) 

    },
  },
  watch:{
        clear(newVal,oldVal){
          console.log(newVal);
          if(newVal){
            this.searchValue =  ''
          }
        }
  },
  mounted(){
  
     
  },
  created() {},
};
</script>
<style lang="less" >
.head_top {
  width: 1200px;
  margin: auto;
  .left_you {
    width: 160px;
    font-size: 25px;
    color: #ff61a1;
    cursor: pointer;
  }
  .right_you {
    color: #999999;
    font-size: 14px;
    .login {
      color: #ff61a1;
      cursor: pointer;
    }
  }
}

.ceach_input {
  width: 650px;
  margin-right: 300px;
  /deep/.el-input-group__append, .el-input-group__prepend{
     border-top-right-radius: 8px;
     border-bottom-right-radius: 8px;
  }
 
  /deep/.el-input__inner,
  .el-input__inner:focus,
  .el-input__inner:hover {
    border: #ff61a1 1px solid;
    outline: none;
    border-top-left-radius: 8px;
     border-bottom-left-radius: 8px;
     overflow: hidden;
  }
  // /deep/.el-input__inner:focus  {
  //   outline: none;
  //   border: #ff61a1 1px solid;
  // }

  /deep/.el-input-group__append,
  .el-input-group__prepend {
    border: #ff61a1 1px solid;
    background-color: #ff61a1;
    color: white; 
  }
}
// .fe {
//   display: flex;
// }
</style>