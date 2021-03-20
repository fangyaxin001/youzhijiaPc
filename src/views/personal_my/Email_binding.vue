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
          <!-- 验证号码 -->
          <div v-show="flag == 1">
            <div class="top_status flex_c">
              <div class="top_imgBox">
                <img src="../../assets/image/shen1.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m1">1</main>
                  <p class="p1">验证号码</p>
                </div>
              </div>
              <div class="top_imgBox">
                <img src="../../assets/image/gray1.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m2">2</main>
                  <p class="p2">绑定新邮箱</p>
                </div>
              </div>
              <div class="top_imgBox">
                <img src="../../assets/image/gray2.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m2">3</main>
                  <p class="p2">完成</p>
                </div>
              </div>
            </div>
            <div class="anquan flex_c">
              <p>为了您的账户安全，请先验证邮箱</p>
              <div>
                <img width="14px" src="../../assets/image/anquan.png" alt="" />
              </div>
            </div>
            <div class="c-box">
              <div class="phone_box">
                <p class="p1">你绑定的邮箱</p>
                <p class="p2">{{USER_INFO.email}}</p>
              </div>
              <div class="phone_box">
                <p class="p1">邮箱验证码</p>
                <div style="width: 250px; margin-left: 20px">
                  <el-input type="text" v-model="vftCode">
                    <span
                      class="yanz"
                      slot="suffix"
                      @click="getMa"
                      v-if="passgei"
                      >获取验证码</span
                    >
                    <span class="yanz" slot="suffix" v-else>
                      <span style="color: red">{{ num }}</span>
                      秒可重新获取</span
                    ></el-input
                  >
                </div>
              </div>
              <div class="getTo" @click="nextTo">下一步</div>
            </div>
          </div>
          <!-- 为绑定新邮箱 -->
          <div v-show="flag == 2">
            <div class="top_status flex_c">
              <div class="top_imgBox">
                <img src="../../assets/image/qian1.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m1">1</main>
                  <p class="p1" style="color: #ff61a1">验证号码</p>
                </div>
              </div>
              <div class="top_imgBox">
                <img src="../../assets/image/shen2.png" alt="" />
                <div class="set_title flex_c">
                  <main
                    class="m2"
                    style="color: #ff61a1; background-color: #fff"
                  >
                    2
                  </main>
                  <p class="p2" style="color: #ffffff">绑定新邮箱</p>
                </div>
              </div>
              <div class="top_imgBox">
                <img src="../../assets/image/gray2.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m2">3</main>
                  <p class="p2">完成</p>
                </div>
              </div>
            </div>
            <div class="anquan flex_c">
              <p>您的验证已经成功通过，请立即修改您的邮箱</p>
              <div>
                <img width="14px" src="../../assets/image/anquan.png" alt="" />
              </div>
            </div>
            <div class="c-box">
              <div class="phone_box">
                <p class="p1">新邮箱</p>
                <div style="width: 250px; margin-left: 20px">
                  <el-input type="text" v-model="newEmail"></el-input>
                </div>
              </div>
              <div class="phone_box">
                <p class="p1">邮箱验证码</p>
                <div style="width: 250px; margin-left: 20px">
                  <el-input type="text" v-model="vftCodes">
                    <span
                      class="yanz"
                      slot="suffix"
                      @click="getMas"
                      v-if="passgeis"
                      >获取验证码</span
                    >
                    <span class="yanz" slot="suffix" v-else>
                      <span style="color: red">{{ num1 }}</span>
                      秒可重新获取</span
                    ></el-input
                  >
                </div>
              </div>
              <div class="getTo" @click="nextTo">确定</div>
            </div>
          </div>
          <!-- 完成 -->
          <div v-show="flag == 3">
            <div class="top_status flex_c">
              <div class="top_imgBox">
                <img src="../../assets/image/qian1.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m1">1</main>
                  <p class="p1" style="color: #ff61a1">验证号码</p>
                </div>
              </div>
              <div class="top_imgBox">
                <img src="../../assets/image/qian2.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m1">2</main>
                  <p class="p2" style="color: #ff61a1">绑定新邮箱</p>
                </div>
              </div>
              <div class="top_imgBox">
                <img src="../../assets/image/shen3.png" alt="" />
                <div class="set_title flex_c">
                  <main class="m1">3</main>
                  <p class="p1">完成</p>
                </div>
              </div>
            </div>
            <div class="con_box">
              <div><img src="../../assets/image/bindingT.png" alt="" /></div>
              <div>绑定成功</div>
            </div>
            <div class="confirm" @click="confirmTo">确定</div>
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
      vftCode: "", //验证码
      passgei: true,
      num: 60,
      flag: 1, //进度控制 1为验证号码 2为绑定新手机 3为完成
      newEmail: "", //新邮箱
      num1: 60,
      vftCodes: "", //验证码
      passgeis: true,
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

    // 点击获取验证码
    getMa() {
      this.$require
        .post(this.$inter.common.emailCode, {
          email: this.USER_INFO.email,
          type: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("验证码发送成功");
            this.passgei = false;
            this.num = 60;
            var timer = setInterval(() => {
              this.num--;
              if (this.num == 0) {
                clearInterval(timer);
                this.passgei = true;
              }
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 完成
    confirmTo() {
      this.$router.push("/myYouZhiJia");
    },
    //   下一步
    nextTo() {
       this.flag = 2;
      if (this.flag == 2) {
       this.$require
          .post(this.$inter.common.amendEmailTwo, {
            email: this.newEmail,
            code: this.vftCodes,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 1) {
               this.USER_INFO.email = this.newEmail
              localStorage.setItem("USER_INFO",  JSON.stringify(this.USER_INFO))
              this.flag = 3; 
            } else {
              this.$message.error(res.msg);
            }
          });
      } else {
         this.$require
          .post(this.$inter.common.amendEmailOne, {
            email: this.USER_INFO.email,
            code: this.vftCode,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 1) {
              this.flag = 2;
            } else {
              this.$message.error(res.msg);
            }
          });

      }
    },

    // 获取新邮箱的验证码
    getMas() {
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
            this.passgeis = false;
            this.num1 = 60;
            var timer = setInterval(() => {
        this.num1--;
        if (this.num1 == 0) {
          clearInterval(timer);
          this.passgeis = true;
        }
      }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        }); 
      
      
      
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
    overflow: hidden;
    padding: 40px;
    box-sizing: border-box;
    .top_status {
      .top_imgBox {
        margin: -7px;
        position: relative;
        .set_title {
          width: 220px;
          height: 36px;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 14px;
          .m1 {
            width: 17px;
            height: 17px;
            line-height: 17px;
            text-align: center;
            border-radius: 50%;
            background-color: #fff;
            color: #ff61a1;
          }
          .p1 {
            margin: 0;
            margin-left: 5px;
            color: white;
          }
          .m2 {
            width: 17px;
            height: 17px;
            line-height: 17px;
            text-align: center;
            border-radius: 50%;
            background-color: #999999;
            color: #ffffff;
          }
          .p2 {
            margin: 0;
            margin-left: 5px;
            color: #999999;
          }
        }
      }
    }
    .anquan {
      font-size: 14px;
      color: #333333;
      height: 80px;
      p {
        margin-right: 10px;
      }
    }
    .c-box {
      width: 400px;
      margin: auto;
      .phone_box {
        display: flex;
        margin-bottom: 10px;
        p {
          font-size: 14px;
          color: #333333;
        }
        .p1 {
          width: 120px;
          text-align: right;
        }
        .p2 {
          margin-left: 20px;
        }
        .yanz {
          color: #ff61a1;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }
      }
      .getTo {
        border: 1px solid #ff61a1;
        border-radius: 5px;
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
    .con_box {
      text-align: center;
      margin-top: 40px;
      div {
        margin-top: 20px;
        font-size: 18px;
        color: #333333;
      }
    }
    .confirm {
      border: 1px solid #ff61a1;
      border-radius: 5px;
      width: 300px;
      margin: auto;
      text-align: center;
      height: 45px;
      line-height: 45px;
      margin-top: 80px;
      margin-bottom: 40px;
      background-color: #ff61a1;
      font-size: 16px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
