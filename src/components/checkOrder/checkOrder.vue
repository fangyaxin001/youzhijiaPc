
<template>
  <div>
    <div class="check_box">
      <p class="title">填写并核对订单信息</p>
      <!-- 填写并核对订单详情 -->
      <div class="check">
        <!-- 收件人信息 -->
        <div class="recipients">
          <div class="flex_sb top_seach">
            <div class="clild_title">收件人信息</div>
            <p @click="newlyCity">+新增收货地址</p>
          </div>
          <!-- 收件人 -->
          <div
            class="flex_sb"
            v-for="(item, index) in addressList"
            :key="index"
            v-show="index == 0 || moreFalg"
            @mouseover="overCkick(index)"
            @mouseleave="LeaveliCkick(index)"
          >
            <div>
              <div class="p_box">
                <p class="p1 ellipsis">
                  收件人：<span>{{ item.name }}</span>
                </p>
                <p class="p2 ellipsis">
                  手机号：<span>{{ item.phone }}</span>
                </p>
                <p class="p3 ellipsis">收货地址：{{ item.address }}</p>
                <p v-show="item.status == 1" class="p4">默认地址</p>
              </div>
            </div>
            <!-- <div class="bj" v-show="index == 0" @click="redact(item)">编辑</div> && index != 0 -->
            <div v-show="index == mouseIndex" class="flex_fe cat_p">
              <p @click="setStatus(item)" v-show="index != 0">设置默认</p>
              <p @click="redact(item)">编辑</p>
              <p @click="deletCity(item)" class="red_p">删除</p>
            </div>
          </div> 
          <div class="flex_sb more_city" v-show="addressList!=0">
            <p @click="moreCity">更多地址</p>
            <div><img src="../../assets/image/xiaxia.png" alt="" /></div>
          </div>
        </div>
        <hr class="h1" />
        <!-- 送货订单 -->
        <div class="delivery">
          <!--  -->
          <p class="clild_title">送货订单</p>
          <div
            class="flex_sb delivery_detial"
            v-for="(item, index) in orderDatial"
            :key="index"
          >
            <div class="flex_sb left_box">
              <div class="left_img">
                <img
                  style="width: 90px; height: 90px; object-fit: unset"
                  :src="url + item.img1_url"
                  alt=""
                />
              </div>
              <div class="left_detial">
                <p class="p1 ellipsis">{{ item.name }}</p>
                <p class="p2">
                  规格：<span>{{ item.note }}</span>
                </p>
              </div>
            </div>
            <div class="money">₱{{ item.xprice }}</div>
            <div class="number">x{{ item.num }}</div>
          </div>
        </div>

        <hr class="h2" />
        <!-- 优惠劵 -->
        <div class="coupon">
          <p class="clild_title">优惠劵</p>
          <div class="man_jian" v-show="couponList.length != 0">
            <div
              @click="ManJian(index, item)"
              v-for="(item, index) in couponList"
              :key="index"
              :class="ManjianIndex == index ? 'borStyle' : ''"
            >
              满{{ item.man }}减{{ item.jian }}
              <img
                v-show="ManjianIndex == index"
                class="abxuan"
                src="../../assets/image/xuan.png"
                alt=""
              />
            </div>
          </div>
          <div class="man_jian" v-show="couponList.length == 0">
            <p>当前暂无可用优惠劵</p>
          </div>
          <div class="jin_e">
            <p>
              金额抵用：<span v-if="couponList.length == 0">₱ 0.00</span>
              <span v-else>₱{{ allDiyong }}</span>
            </p>
          </div>
           <div class="jin_e">
            <p>
              佣金抵用：<span v-if="couponList.length == 0">₱ 0.00</span>
              <span v-else>₱{{ All_obj.coin_pay }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <div class="submit_order">
        <div class="flex_fe submit_title">
          <div>{{ All_obj.total_num }}件商品</div>
          <p>
            总商品金额：<span>₱{{ All_obj.sum }}</span>
          </p>
        </div>
        <div class="c-box">
          <div class="flex_fe submit_center">
            <p v-if="All_obj.cost" class="p1">邮费：<span >₱ {{All_obj.cost}}</span></p>
            <p>
              应付金额：<span>₱{{ All_obj.sum - allDiyong+ All_obj.cost*1 | totle}}</span>
            </p>
          </div>
          <div class="flex_fe submit_bottom">
            <p>
              寄送至：<span>{{ oneAddress.address }}</span>
            </p>
            <p>
              收货人：<span
                >{{ oneAddress.name }} {{ oneAddress.phone }}</span
              >
            </p>
          </div>
        </div>
        <div class="flex_fe">
          <div class="sunmit" @click="sunmit">提交订单</div>
        </div>
      </div>
    </div>
    <!-- 新增收货地址弹框 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="newly_city"
      width="750px"
      :show-close="false"
    >
      <div class="flex_sb newly_title">
        <div>
          <div class="kong"></div>
          <p>新增收货人信息</p>
        </div>
        <div class="cu_img" @click="newly_city = false">
          <img src="../../assets/image/gray_cha.png" alt="" />
        </div>
      </div>
      <div class="input_box">
        <div class="input_set">
          <p><span>*</span>收货人</p>
          <input type="text" maxlength="12" v-model="consignee" />
        </div>

        <div class="input_set">
          <p><span>*</span>手机号码</p>
          <input type="number" maxlength="15" @input="loginLength"  v-model="phone"  />
        </div>
        <div class="input_set">
          <p><span>*</span>详细地址</p>
          <span style="cursor: pointer;" v-if="city" @click="map_city = true">{{ city }}</span>
          <p v-else class="p1" @click="map_city = true">选择地址</p>
        </div>
      </div>
      <div class="save_consignee">
        <div @click="addConsignee">保存收货人信息</div>
      </div>
    </el-dialog>
    <!-- 编辑收货地址弹框 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="redact_city"
      width="750px"
      :show-close="false"
    >
      <div class="flex_sb newly_title">
        <div>
          <div class="kong"></div>
          <p>编辑收货人信息</p>
        </div>
        <div class="cu_img" @click="redact_city = false">
          <img src="../../assets/image/gray_cha.png" alt="" />
        </div>
      </div>
      <div class="input_box">
        <div class="input_set">
          <p><span>*</span>收货人</p>
          <input type="text" maxlength="12" v-model="consignee" />
        </div>
        <div class="input_set">
          <p><span>*</span>手机号码</p>
          <input type="number" maxlength="15"  @input="loginLength" v-model="phone" />
        </div>
        <div class="input_set" style="width: 500px">
          <p><span>*</span>详细地址</p>
          <span class="">{{ bj_city }}</span
          ><span class="bianji" @click="map_city = true">编辑</span>
        </div>
      </div>
      <div class="save_consignee">
        <div @click="compile">保存收货人信息</div>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="delet_city"
      width="750px"
      :show-close="false"
    >
      <div class="delet_box">
        <div class="delet_img">
          <img src="../../assets/image/delet_danger.png" alt="" />
        </div>
        <p class="delet_p">您确定要删除该收货地址吗?</p>
        <div class="flex_sb delet_bottom">
          <div class="delet_true" @click="creadDelCity">确定</div>
          <div class="delet_false" @click="delet_city = false">取消</div>
        </div>
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
import myMap from "@/components/map.vue"; //地图组件

export default {
  components: {
    myMap,
  },
  data() {
    return {
      moreFalg: false,
      man_jianStyle: 0,
      mouseIndex: null, //鼠标进入索引
      newly_city: false, //控制新增收货地址弹框
      redact_city: false, //控制编辑弹框
      delet_city: false, //控制删除弹框
      map_city: false, //控制地图弹框
      All_obj: {}, //订单所有
      consignee: "", //收货人
      city: "", //地址
      phone: "", //手机号
      bj_city: "哈哈哈哈哈哈哈哈哈", //编辑地址
      orderDatial: [], //订单列表
      addressList: [], //收货地址
      mycity: {}, //当前地址
      couponList: [], //可用优惠劵列表
      ManjianIndex: 0, //满减优惠劵索引
      coupnId:'',//优惠卷id
      allDiyong: "", //全额抵用金额
      oneAddress: {}, //当前地址
    };
  },
  filters:{
    totle(value){
      return value.toFixed(2)
    }
  },
  methods: {
    typeValue(e) {
      console.log(e);
      if (e) {
        this.city = e;
        this.bj_city = e;
        this.map_city = false;
      }
    },
         // 限制登录手机号输入长度
      loginLength(e) {
        if (this.phone > 12) {
          this.phone = this.phone.slice(0, 13) 
       
        }
      },
    //  更多地址
    moreCity() {
      this.moreFalg = !this.moreFalg;
    },
    // 新增收货地址
    newlyCity() {
       this.city = ""
       this.phone = ""
       this.consignee = ""
      this.newly_city = true;
    },
    // 编辑
    redact(item) {
      console.log(item);
      this.consignee = item.name;
      this.bj_city = item.address;
      this.phone = item.phone;
      this.mycity = item;
      this.redact_city = true;
    },
    // 删除
    deletCity(item) {
      this.delet_city = true;
      this.mycity = item;
    },
    // 鼠标进入
    overCkick(index) {
      this.mouseIndex = index;
    },
    // 鼠标离开
    LeaveliCkick(index) {
      this.mouseIndex = null;
    },
    // 提交
    sunmit() { 
       this.$require
        .post(this.$inter.common.orderSubmit, {
          gid: this.$route.query.gid,
          size: this.$route.query.size,
          address_id: this.oneAddress.id,
          coupons_id: this.coupnId,
          num:this.All_obj.total_num,
          type:this.$route.query.type
        }) .then((res) => { 
          console.log(res);
          if (res.code == 1) {
            this.$message.success("提交成功"); 
            this.$router.push("/my_order");
            
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 满减 选择优惠劵
    ManJian(index, item) {
      if( this.ManjianIndex == index){
         this.ManjianIndex = -1
         this.allDiyong = ""
         this.coupnId =""

      }else{
       this.ManjianIndex = index;
      this.allDiyong = item.jian;
      this.coupnId =item.coupons_id 
      }
     
    },

    // 编辑收货地址
    compile() {
      this.$require
        .post(this.$inter.common.setAddress, {
          id: this.mycity.id,
          name: this.consignee,
          phone: this.phone,
          address: this.bj_city,
          status: 0,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.redact_city = false;
            this.getAddress();
            this.consignee = "";
            this.bj_city = "";
            this.phone = "";
          } else { 
            this.$message.error(res.msg);
          }
        });
    },
    // 设置默认
    setStatus(item) {
      this.$require
        .post(this.$inter.common.setStatus, {
          id: item.id,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("设置默认成功");
            this.getAddress();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 删除收货地址
    creadDelCity() {
      this.$require
        .post(this.$inter.common.delAddress, {
          id: this.mycity.id,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.getAddress();
            this.$message.success("删除成功");
            this.delet_city = false;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 保存收货人信息
    addConsignee() {
      if (this.consignee == "") return this.$message.error("请填写收货人");
      if (this.phone == "") return this.$message.error("请填写手机号");
      if (this.city == "") return this.$message.error("请填写收货地址");

      var list = {
        consignee: this.consignee,
        phone: this.phone,
        city: this.city,
      };
      console.log(list);
      this.addAddress(list);
    },
    // 获取收货地址列表
    getAddress() {
      this.$require.post(this.$inter.common.getAddress, {}).then((res) => {
        console.log(res);
        if (res.code == 1) {
          this.addressList = res.data;
           this.oneAddress = res.data[0]
        } else {
          this.addressList =[]
        }
      });
    },
    // 添加收货地址
    addAddress(mylist) {
      this.$require
        .post(this.$inter.common.addAddress, {
          name: mylist.consignee,
          phone: mylist.phone,
          address: mylist.city,
          status: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.newly_city = false;
            this.consignee = "";
            this.city = "";
            this.phone = "";
            this.getAddress();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
  },
  created() {
    console.log(this.$route.query);
    this.$require
      .post(this.$inter.common.orderTo, {
        gid: this.$route.query.gid,
        size: this.$route.query.size,
        num: this.$route.query.num,
        type: this.$route.query.type,
      })
      .then((res) => {
        console.log(res);
        if (res.code == 1) {
          this.All_obj = res.data; 
          this.orderDatial = res.data.items.goods; 
          this.$require
            .post(this.$inter.common.couponsNice, {
              money: res.data.sum,
            }) 
            .then((res) => {
              console.log(res);
              if (res.code == 1) {
                this.couponList = res.data;
                if (this.couponList.length != 0) {
                  this.allDiyong = this.couponList[0].jian;
                  this.coupnId = this.couponList[0].coupons_id 
                }
              } else {
                 
              }
            });
        }
      });
    this.getAddress();
  },
};
</script>
<style lang="less">
.check_box {
  width: 1200px;
  margin: auto;
  .title {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
}
.check {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  .clild_title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }
  //   收件人信息
  .recipients {
    .top_seach {
      div {
        font-size: 14px;
        color: #333333;
        font-weight: bold;
      }
      p {
        font-size: 12px;
        color: #ff61a1;
        cursor: pointer;
      }
    }
    .p_box {
      color: #333333;
      font-size: 14px;
      width: 950px;
      max-width: 1000px;
      display: flex;
      cursor: pointer;
      p {
        margin-bottom: 0;
      }
      .p1 {
        width: 150px;
      }
      .p2 {
        width: 200px;
        margin-left: 20px;
      }
      .p3 {
        max-width: 550px;
        min-width: 250px;
        margin-left: 30px;
      }
      .p4 {
        width: 80px;
        text-align: center;
        background-color: #ff61a1;
        color: #fff;
        border-radius: 15px;
        height: 25px;
        line-height: 25px;
        margin-left: 30px;
      }
    }
    .cat_p {
      color: #999999;
      font-size: 14px;
      width: 160px;
      p {
        cursor: pointer;
        margin-bottom: 0;
        margin-right: 15px;
      }
      .red_p {
        color: #f10200;
      }
    }
    .bj {
      color: #999999;
      font-size: 14px;
      cursor: pointer;
    }
    .more_city {
      width: 60px;
      p {
        font-size: 12px;
        color: #999999;
        cursor: pointer;
      }
    }
  }
  .h1 {
    border: 2px dashed #eeeeee;
    border-top: none;
  }
  //   送货地址
  .delivery {
    title {
      font-weight: bold;
      font-size: 14px;
      color: #333333;
      margin-top: 10px;
    }
    .delivery_detial {
      padding: 15px;
      box-sizing: border-box;
      border: 1px solid #ff61a1;
      margin-top: 10px;
      .left_box {
        .left_detial {
          margin-left: 20px;
          font-size: 14px;
          .p1 {
            color: #333333;
            max-width: 400px;
          }
          .p2 {
            color: #999999;
          }
        }
      }
    }
    .money {
      color: #f10200;
      font-size: 18px;
      font-weight: bold;
    }
    .number {
      color: #999999;
      font-size: 14px;
    }
  }
  .h2 {
    border: 1px solid #eeeeee;
    border-top: none;
  }
  //   优惠劵
  .coupon {
    .man_jian {
      display: flex;
      flex-wrap: wrap;
      .borStyle {
        border: 1px solid #ff61a1;
      }
      div {
        position: relative;
        margin-left: 20px;
        width: 140px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: #666666;
        font-size: 14px;
        border: 1px solid #eeeeee;
        cursor: pointer;
        .abxuan {
          position: absolute;
          height: 13px;
          right: -1px;
          bottom: 0;
          z-index: 99;
        }
      }
      p {
        font-size: 14px;
        color: #999999;
        margin-left: 30px;
      }
      div:hover {
        border: 1px solid #ff61a1;
        box-shadow: 0px 0px 2px 0px #ff61a1;
      }
    }

    .jin_e {
      color: #333333;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 97, 161, 0.08);
      padding-left: 15px;
      box-sizing: border-box;
      span {
        color: #f10200;
      }
    }
  }
}
// 提交订单
.submit_order {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 20px;
  .submit_title {
    color: #333333;
    font-size: 14px;
    p {
      margin: 0;
      margin-left: 8px;
    }
  }
  .c-box {
    color: #333333;
    font-size: 14px;
    background-color: rgba(255, 97, 161, 0.08);
    padding-right: 15px;
    box-sizing: border-box;
    margin-top: 15px;
    .submit_center {
      p{
        height: 60px;
        line-height: 60px;
      }
      .p1{
        margin-right: 40px;
        span{
          font-size: 16px;
          color: #999999;
          font-weight:none;
        }
      }
      span {
        font-size: 22px;
        color: #f10200;
        font-weight: bold;
      }
    }
    .submit_bottom {
      p {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
  .sunmit {
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ff61a1;
    color: #fff;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
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
.delet_box {
  .delet_img {
    text-align: center;
    padding-top: 70px;
  }
  .delet_p {
    text-align: center;
    font-size: 18px;
    color: #333333;
  }
  .delet_bottom {
    width: 300px;
    margin: auto;
    height: 200px;
    div {
      width: 120px;
      height: 40px;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .delet_true {
      background-color: #ff61a1;
      color: #fff;
    }
    .delet_false {
      color: #ff61a1;
      border: 1px solid #ff61a1;
    }
  }
}
.map_dialog {
  .map_box {
    width: 500px;
    height: 500px;
  }
}
.bianji {
  width: 50px;
  display: inline-block;
  margin-left: 20px;
  color: #ff61a1;
  cursor: pointer;
}

</style>