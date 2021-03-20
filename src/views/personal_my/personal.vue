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
          <div class="order_ul">
            <ul>
              <li class="styleColer">
                个人信息
                <div class="heng"></div>
              </li>
            </ul>
          </div>
          <div class="box">
            <div class="pon_box flex_sb">
              <div class="left_box">
                <p>头像</p>
                <div class="header_img headImg">
                  <el-upload
                    class="avatar-uploader"
                    :action="upUrl"
                    name="image"
                    :show-file-list="false"
                    :on-success="headerseass"
                    :before-upload="beforeAvatarUpload"
                    accept=".png, .gif, .jpg"
                  >
                    <div class="tou-img">
                      <el-image
                        style="width: 80px; height: 80px"
                        :src="url + USER_INFO.headimg_url"
                        fit="fill"
                      ></el-image>
                    </div>
                  </el-upload>
                </div> 
              </div>
              <div class="xugai" @click="amendHeading">修改</div>
            </div>
            <div class="pon_box flex_sb">
              <div class="left_box">
                <p>用户ID</p>
                <div class="header_img">52561561565</div>
              </div>
            </div>
            <div class="pon_box flex_sb">
              <div class="left_box">
                <p>昵称</p>
                <div class="header_img">{{ USER_INFO.nick}}</div>
              </div>
              <div class="xugai" @click="changeName">修改</div>
            </div>
            <div class="pon_box flex_sb">
              <div class="left_box">
                <p>性别</p>
                <div class="header_img">{{ USER_INFO.sex | sexFun }}</div>
              </div>
              <div class="xugai" @click="changSex">修改</div>
            </div>
            <div class="pon_box flex_sb">
              <div class="left_box">
                <p>手机号</p>
                <div class="header_img">{{ USER_INFO.phone }}</div>
              </div>
              <div class="xugai" @click="iphoneBin">换绑</div>
            </div>
            <div class="pon_box flex_sb" v-if="USER_INFO.email">
              <div class="left_box" style="width: 200px">
                <p>邮箱</p>
                <div class="header_img">{{ USER_INFO.email }}</div>
              </div>
              <div class="xugai" @click="EmailBin">换绑</div>
            </div>
            <div class="pon_box flex_sb" v-else>
              <div class="left_box" style="width: 200px">
                <p>邮箱</p>
                <div class="header_img nobang">未绑定</div>
              </div>
              <div class="noxugai" @click="bindingEmail">绑定邮箱</div>
            </div>
            <div class="pon_box flex_sb">
              <div class="left_box" style="width: 800px">
                <p style="width:120px">默认收货信息</p>
                <p style="width:220px">收货人：<span>{{addressListOne.name}}</span></p>
                <p style="width:220px">手机号：<span>{{addressListOne.phone}}</span></p>
                <p style="width:320px">收货地址：<span>{{city}}</span></p>
              </div> 
                 <div class="xugai" @click="lookFlag = true">查看</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部组件 -->
    <bottombei></bottombei>
    <!-- 修改昵称 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="amend_name"
      width="750px"
      :show-close="false"
    >
      <div class="flex_sb newly_title">
        <div>
          <div class="kong"></div>
          <p>修改昵称</p>
        </div>
        <div class="cu_img" @click="amend_name = false">
          <img src="../../assets/image/gray_cha.png" alt="" />
        </div>
      </div>
      <div class="amend_box">
        <div class="oldName">
          <p class="p1">当前昵称</p>
          <p>{{ USER_INFO.nick }}</p>
        </div>
        <div class="newName">
          <p>新昵称</p>
          <div><input type="text" v-model="newName" maxlength="8" /></div>
        </div>
        <div class="btt_box flex_sa">
          <div class="c1" @click="setName">确认</div>
          <div class="c2" @click="amend_name = false">取消</div>
        </div>
      </div>
    </el-dialog>
    <!-- 修改性别 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="amend_sex"
      width="750px"
      :show-close="false"
    >
      <div class="flex_sb newly_title">
        <div>
          <div class="kong"></div>
          <p>修改性别</p>
        </div>
        <div class="cu_img" @click="amend_sex = false">
          <img src="../../assets/image/gray_cha.png" alt="" />
        </div>
      </div>
      <div class="amend_box">
        <div class="sex_box flex_sb">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </div>
        <div class="btt_box flex_sa">
          <div @click="setSex" class="c1">确认</div>
          <div class="c2" @click="amend_sex = false">取消</div>
        </div>
      </div>
    </el-dialog>
     <!-- 新增收货地址弹框 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="lookFlag"
      width="750px"
      :show-close="false"
    >
      <div class="flex_sb newly_title">
        <div>
          <div class="kong"></div>
          <p>默认收货人信息</p>
        </div>
        <div class="cu_img" @click="lookFlag = false">
          <img src="../../assets/image/gray_cha.png" alt="" />
        </div>
      </div>
      <div class="input_box">
        <div class="input_set">
          <p><span>*</span>收货人</p>
          <input type="text" maxlength="12" v-model="addressListOne.name" />
        </div>

        <div class="input_set">
          <p><span>*</span>手机号码</p>
          <input type="number" maxlength="15" @input="loginLength"  v-model="addressListOne.phone"  />
        </div>
        <div class="input_set">
          <p><span>*</span>详细地址</p>
          <span style="cursor: pointer;" v-if="city" @click="map_city = true">{{ city }}</span>
          <p v-else class="p1" @click="map_city = true">选择地址</p>
        </div>
      </div>
      <div class="save_consignee">
        <div @click="compile">保存收货人信息</div>
      </div>
    </el-dialog>
     <!-- 地图弹框 -->
    <el-dialog
      class="map_dialog"
      :visible.sync="map_city"
      width="750px"
      :show-close="false"
    >
      <div class="map_box">
        <myMap id="allmap" class="Gmaps" @typeValue="typeValue"></myMap>
      </div>
    </el-dialog>
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
import myMap from "@/components/map.vue"; //地图组件
export default {
  name: "Home",
  components: {
    homeTop,
    loginHead,
    bottombei,
    fielxRight,
    searchResult,
    personalLeft,
    myMap
  },
  data() {
    return {
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      listIndex: 6,
      amend_name: false, //控制修改昵称弹框
      newName: "", //新昵称
      amend_sex: false, //控制修改性别弹框
      radio: "1", //控制男女 1为男性，2为女性
      USER_INFO:{},
      lookFlag :false,
      addressListOne :{}, //默认收货地址
      addressList:[], //收货地址列表
      map_city:false,
      city:''
    };
  },
  filters: {
    sexFun(value) {
      console.log(value);
      if (value == 1) {
        return (value = "男");
      } else {
        return (value = "女");
      }
    },
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
    // 设置个人资料
    setMyDetial() {
      this.$require
        .post(this.$inter.common.setMyDetial, {
          nick: this.USER_INFO.nick,
          headimg: this.USER_INFO.headimg,
          sex: this.USER_INFO.sex,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("修改成功");
            this.amend_name = false;
            this.amend_sex = false;
              this.$store.commit('myname', this.USER_INFO.nick) 
            console.log(this.USER_INFO);
            localStorage.setItem("USER_INFO", JSON.stringify(this.USER_INFO)); 
          } else {
            
          }
        });
    },
   // 编辑收货地址
    compile() { 
      if (this.addressListOne.id) {
          this.$require
        .post(this.$inter.common.setAddress, {
          id: this.addressListOne.id,
          name:  this.addressListOne.name,
          phone:  this.addressListOne.phone,
          address: this.city,
          status: 0,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.lookFlag = false;
             this.$message.success("保存成功");
            this.getAddress(); 
          } else { 
            this.$message.error(res.msg);
          }
        });
      }else{
        this.$require
        .post(this.$inter.common.addAddress, {
          name: this.addressListOne.name,
          phone:  this.addressListOne.phone,
          address: this.city,
          status: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
             this.$message.success("保存成功"); 
            this.lookFlag = false; 
            this.getAddress();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    
    },
       typeValue(e) {
      console.log(e);
      if (e) {
        this.city = e; 
        this.map_city = false;
      }
    },
        // 限制登录手机号输入长度
      loginLength(e) {
        if (this.phone > 12) {
          this.phone = this.phone.slice(0, 13) 
       
        }
      },
    changeName(){
    this.amend_name = true
    this.newName = ''
    },
    changSex(){ 
     console.log(this.USER_INFO.sex);
        this.amend_sex = true
          this.radio =JSON.stringify(this.USER_INFO.sex) 
    },
    // 修改头像
    amendHeading(){
     this.setMyDetial();
    },
    // 修改姓名
    setName() {
      this.USER_INFO.nick = this.newName;
      this.setMyDetial();
    },
    // 修改性别
    setSex() { 
      console.log(Number(this.radio));
      this.USER_INFO.sex = Number(this.radio);
      this.setMyDetial();
    },
    // 上传头像图片
    headerseass(res, file) {
      console.log(res, file);
      if(res.code == 1){
        console.log(res.pic_url );
           this.USER_INFO.headimg_url = res.pic_url    
           this.USER_INFO.headimg = res.pic   

      }
    },
    // 上传图片前
    beforeAvatarUpload(file) {
      console.log(file);

      console.log(11);
      if (file.size / 1024 / 1024 > 2)
        return this.$message.error("上传文件限制在2M内");
    },
    // 绑定邮箱
    bindingEmail() {
      this.$router.push("/binding_email");
    },
    // 手机号换绑
    iphoneBin() {
      this.$router.push("/iphone_binding");
    },
    // 邮箱换绑
    EmailBin() {
      this.$router.push("/Email_binding");
    },
    // 收货地址
    getAddress(){
 // 获取收货地址列表
      this.$require.post(this.$inter.common.getAddress, {}).then((res) => {
        console.log(res);
        if (res.code == 1) {
            this.addressListOne  = res.data[0]
            this.city = res.data[0].address
            this.addressList = res.data
        } else { 
          this.addressListOne = {}
            this.city = ""

        }
      });
    }
  },
  created() {
    this.listIndex = this.$route.query.idx;
    this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
    if (this.USER_INFO.sex == "") {
      this.USER_INFO.sex = 2;
    }
     this.getAddress()
   
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
    .order_ul {
      ul {
        background-color: #fff;
        display: flex;
        padding-left: 10px;
        box-sizing: border-box;
        height: 47px;
        li {
          width: 80px;
          text-align: center;
          height: 45px;
          line-height: 45px;
          margin-left: 10px;
          color: #999999;
        }
        .heng {
          border-top: 3px solid #ff61a1;
          width: 40px;
          margin: auto;
        }
      }
    }
    .styleColer {
      color: #ff61a1 !important;
    }
  }
  .box {
    margin-top: 2px;
    background-color: #fff;
    padding: 0px 35px 0px 35px;
    box-sizing: border-box;
    .pon_box {
      border-bottom: 1px solid #eeeeee;
      padding: 20px 0 20px 0;
      box-sizing: border-box;
      .left_box {
        width: 300px;
        font-size: 14px;
        color: #333333;
        display: flex;
        align-items: center;
        p {
          width: 80px;
        }
        .head_img {
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 50%;
        }
      }
    }
  }
  .xugai {
    border: 1px solid #999999;
    border-radius: 8px;
    width: 57px;
    text-align: center;
    font-size: 12px;
    color: #999999;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
  }
  .nobang {
    color: #999999;
    font-size: 14px;
  }
  .noxugai {
    border: 1px solid #ff61a1;
    border-radius: 8px;
    width: 67px;
    text-align: center;
    font-size: 12px;
    color: #ff61a1;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
  }
}
.newly_dialog {
  /deep/.el-dialog__header {
    padding: 0 !important;
  }
  /deep/.el-dialog__body {
    padding: 0 !important;
  }

  .newly_title {
    padding: 0 30px 0 30px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    height: 45px;
    line-height: 45px;
    .kong {
      display: inline-block;
      overflow: hidden;
      width: 4px;
      height: 13px;
      background-color: #ff61a1;
    }
    p {
      display: inline-block;
      color: #333333;
      margin: 0;
      margin-left: 7px;
    }
    .cu_img {
      cursor: pointer;
    }
  }
  .amend_box {
    height: 300px;
    padding: 35px;
    box-sizing: border-box;
    .oldName {
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        color: #333333;
      }
      .p1 {
        margin-right: 20px;
      }
    }
    .newName {
      display: flex;
      align-items: center;
      margin-top: 20px;
      p {
        font-size: 14px;
        color: #333333;
        margin-right: 20px;
      }
      input {
        width: 250px;
        height: 30px;
        outline: none;
        border: 1px solid #eeeeee;
      }
    }
    .btt_box {
      width: 500px;
      margin: auto;
      div {
        width: 120px;
        height: 48px;
        border-radius: 8px;
        font-size: 16px;
        text-align: center;
        line-height: 48px;
        margin-top: 60px;
        cursor: pointer;
      }
      .c1 {
        background-color: #ff61a1;
        color: white;
      }
      .c2 {
        color: #ff61a1;
        border: 1px solid #ff61a1;
      }
    }
  }
}
.headImg{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
// 修改性别
.sex_box {
  width: 150px;
  margin: auto;
  margin-top: 30px;
  /deep/.el-radio__input.is-checked .el-radio__inner {
    border-color: #ff61a1;
    background: #ff61a1;
  }
  /deep/.el-radio__inner:hover {
    border: 1px solid #ff61a1;
  }
  /deep/.el-radio__inner {
    width: 18px;
    height: 18px;
  }
  /deep/.el-radio__input.is-checked + .el-radio__label {
    color: #ff61a1 !important;
  }
  
}
// 新增收货地址弹框样式
.newly_dialog {
  /deep/.el-dialog__header {
    padding: 0 !important;
  }
  /deep/.el-dialog__body {
    padding: 0 !important;
  }
  .newly_title {
    padding: 0 30px 0 30px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    height: 45px;
    line-height: 45px;
    .kong {
      display: inline-block;
      overflow: hidden;
      width: 4px;
      height: 13px;
      background-color: #ff61a1;
    }
    p {
      display: inline-block;
      color: #333333;
      margin: 0;
      margin-left: 7px;
    }
    .cu_img {
      cursor: pointer;
    }
  }
  .input_box {
    padding: 30px;
    box-sizing: border-box;
    .input_set {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      p {
        width: 100px;
        color: #333333;
        font-size: 14px;
        span {
          color: #f10200;
          display: inline-block;
          margin-right: 4px;
        }
      }
      .p1 {
        cursor: pointer;
        color: #ff61a1;
      }
      input {
        padding-left: 10px;
        box-sizing: border-box;
        border: 1px solid #bfbfbf;
        border-radius: 3px;
        outline: none;
        width: 320px;
        height: 40px;
        margin-left: 15px;
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
    }
  }
  .save_consignee {
    height: 80px;
    div {
      width: 200px;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      text-align: center;
      background-color: #ff61a1;
      color: #fff;
      border-radius: 5px;
      margin: auto;
      cursor: pointer;
    }
  }
}
.map_dialog {
  .map_box {
    width: 500px;
    height: 500px;
  }
}
</style>
