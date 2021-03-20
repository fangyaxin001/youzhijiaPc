<template>
  <div>
    <!-- 顶部组件 -->
    <homeTop></homeTop>
    <!-- 搜索组件 -->
    <loginHead @searchName="searchName" :seatch="true"></loginHead>
    <!-- 悬浮组件 -->
    <fielxRight></fielxRight>
    <!-- 搜索结果 -->
    <searchResult
      v-if="homeIndex == 0"
      :searchValue="searchVale"
    ></searchResult>
    <!-- 个人中心 -->
    <div class="mycenter" v-else>
      <!-- 左边导航栏 -->
      <personalLeft
        :showIndex="listIndex"
        :styleFlag="true"
        @leftIndex="leftIndex"
      ></personalLeft>
      <div>
        <div class="order_right">
          <div class="one_for">
            <div class="flex_c re_input" style="margin-top: 120px">
              <!-- 要做正则验证邮箱 -->
              <p>新邮箱</p>
              <el-input type="text" v-model="newEmail" maxlength="30"></el-input>
            </div>
            <div class="flex_c re_input">
              <p>邮箱验证码</p>
              <el-input type="text" v-model="vftCode">
                <span class="yanz" slot="suffix" @click="getMa" v-if="passgei"
                  >获取验证码</span
                >
                <span class="yanz" slot="suffix" v-else>
                  <span style="color: red">{{ num }}</span> 秒可重新获取</span
                ></el-input
              >
            </div>
            <div class="getTo" @click="toBlack">确定</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部组件 -->
    <bottombei></bottombei>
  </div>
</template>

<script>
// @ is an alias to /src
import homeTop from "@/components/homeTop/homeTop.vue"; //顶部组件
import loginHead from "@/components/loginHead/loginHead.vue"; //搜索组件
import bottombei from "@/components/bottomTitle/bottomBei.vue"; //底部组件
import fielxRight from "@/components/homeTop/fielxRight.vue"; //悬浮组件
import searchResult from "@/components/home/searchResult.vue"; //搜索结果
import personalLeft from "@/components/personal_ponents/personal_left.vue"; //搜索结果
export default {
  name: "Home",
  components: {
    homeTop,
    loginHead,
    bottombei,
    fielxRight,
    searchResult,
    personalLeft,
  },
  data() {
    return {
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      listIndex: 6,
      newEmail: "", //新邮箱
      vftCode: "", //验证码
      passgei: true,
      num: 60,
    };
  },
  methods: {
    // 接受搜索的结果
    searchName(e) {
      console.log(e);
      this.homeIndex = e.index;
      this.searchVale = e.value;
    },
    //  接受子组件传过来的索引
    leftIndex(e) {
      console.log(e);
      if (e > 5 && e < 8) {
        this.listIndex = e;
      } else {
        return;
      }
    },
    // 确认返回上一级
    toBlack() { 
      this.$require
          .post(this.$inter.common.amendEmailTwo, {
            email: this.newEmail,
            code: this.vftCode,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 1) {
              this.USER_INFO.email = this.newEmail
              localStorage.setItem("USER_INFO",  JSON.stringify(this.USER_INFO))
              this.$message.success(res.msg)
             this.$router.push("/personal");
            } else {
              this.$message.error(res.msg);
            }
          });
    },
    // 点击获取验证码
    getMa() {
      if (this.newEmail == "")
        return this.$message.error("邮箱不能为空，请输入邮箱");
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.newEmail))
        return this.$message.error("邮箱格式错误，请输入正确的邮箱");
      this.$require
        .post(this.$inter.common.emailCode, {
          email: this.newEmail,
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
      var timer = setInterval(() => {
        this.num--;
        if (this.num == 0) {
          clearInterval(timer);
          this.passgei = true;
        }
      }, 1000);
    },
  },
  created() {
    this.listIndex = this.$route.query.idx;
    this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));

  },
};
</script>
<style lang="less" scoped>
.mycenter {
  width: 1200px;
  margin: auto;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  .order_right {
    width: 970px;
    background-color: #fff;
    .one_for {
      width: 400px;
      margin: auto;
      overflow: hidden;
    }
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
        margin-right: 20px;
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
  .getTo {
    border: 1px solid #ff61a1;
    border-radius: 8px;
    margin-top: 60px;
    margin-bottom: 80px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    background-color: #ff61a1;
    color: white;
    cursor: pointer;
  }
}
</style>
