
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
            v-for="(item, index) in 5"
            :key="index"
            v-show="index == 0 || moreFalg"
            @mouseover="overCkick(index)"
            @mouseleave="LeaveliCkick(index)"
          >
            <div>
              <div class="p_box">
                <p class="p1 ellipsis">收件人：<span>方亚鑫</span></p>
                <p class="p2 ellipsis">手机号：<span>13733996420</span></p>
                <p class="p3 ellipsis">收货地址：asdakld aoasjdajkl</p>
                <p v-show="index == 0" class="p4">默认地址</p>
              </div>
            </div>
            <div class="bj" v-show="index == 0" @click="redact">编辑</div>
            <div
              v-show="index == mouseIndex && index != 0"
              class="flex_sb cat_p"
            >
              <p>设置默认</p>
              <p @click="redact">编辑</p>
              <p @click="deletCity" class="red_p">删除</p>
            </div>
          </div>
          <div class="flex_sb more_city">
            <p @click="moreCity">更多地址</p>
            <div><img src="../../assets/image/xiaxia.png" alt="" /></div>
          </div>
        </div>
        <hr class="h1" />
        <!-- 送货订单 -->
        <div class="delivery">
          <p class="clild_title">送货订单</p>
          <div class="flex_sb delivery_detial">
            <div class="flex_sb left_box">
              <div class="left_img">
                <img
                  style="width: 90px; height: 90px; object-fit: unset"
                  src="../../assets/image/dome.png"
                  alt=""
                />
              </div>
              <div class="left_detial">
                <p class="p1 ellipsis">精品胡萝卜500g 新鲜蔬菜 萝卜 生鲜</p>
                <p class="p2">颜色：<span>红色</span></p>
              </div>
            </div>
            <div class="money">￥155</div>
            <div class="number">x1</div>
          </div>
        </div>
        <hr class="h2" />
        <!-- 优惠劵 -->
        <div class="coupon">
          <p class="clild_title">优惠劵</p>
          <div class="man_jian">
            <div @click="ManJian()">
              <!-- <img
                v-show="man_jianStyle == 0"
                class="man_jian_pos"
                src="../../assets/image/color_border.png"
                alt=""
              /> -->
              满99减10
            </div>
            <div>满99减20</div>
          </div>
          <div class="jin_e">
            <p>金额抵用：<span>￥0.00</span></p>
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <div class="submit_order">
        <div class="flex_fe submit_title">
          <div>1件商品</div>
          <p>总商品金额：<span>￥190.00</span></p>
        </div>
        <div class="c-box">
          <div class="flex_fe submit_center">
            <p>应付金额：<span>￥190.00</span></p>
          </div>
          <div class="flex_fe submit_bottom">
            <p>
              寄送至：<span>
                广东 深圳市 龙岗区 坂田街道 杨马小区布龙路508号后一栋101室</span
              >
            </p>
            <p>收货人：<span>九凌少子 15421421412</span></p>
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
          <p><span>*</span>详细地址</p>
          <input type="text" maxlength="60" v-model="city" />
        </div>
        <div class="input_set">
          <p><span>*</span>手机号码</p>
          <input type="text" maxlength="15" v-model="phone" />
        </div>
      </div>
      <div class="save_consignee">
        <div @click="newly_city = false">保存收货人信息</div>
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
          <p><span>*</span>详细地址</p>
          <input type="text" maxlength="60" v-model="city" />
        </div>
        <div class="input_set">
          <p><span>*</span>手机号码</p>
          <input type="text" maxlength="15" v-model="phone" />
        </div>
      </div>
      <div class="save_consignee">
        <div @click="redact_city = false">保存收货人信息</div>
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
          <div class="delet_true" @click="redact_city=false">确定</div>
          <div class="delet_false" @click="redact_city=false">取消</div>
        </div>
      </div>
      
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moreFalg: false,
      man_jianStyle: 0,
      mouseIndex: null, //鼠标进入索引
      newly_city: false, //控制新增收货地址弹框
      redact_city: false, //控制编辑弹框
      delet_city: false, //控制删除弹框
      consignee: "", //收货人
      city: "", //地址
      phone: "", //手机号
    };
  },
  methods: {
    //  更多地址
    moreCity() {
      this.moreFalg = !this.moreFalg;
    },
    // 新增收货地址
    newlyCity() {
      this.newly_city = true;
    },
    // 编辑
    redact() {
      this.redact_city = true;
    },
    // 删除
    deletCity() {
      this.delet_city = true;
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
    sunmit(){
           this.$router.push("/my_order")
    },
    // 满减
    ManJian() {},
  },
  created() {},
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
      width: 800px;
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
        width: 150px;
        margin-left: 20px;
      }
      .p3 {
        max-width: 400px;
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
        .man_jian_pos {
          position: absolute;
        }
      }
      div:hover {
        border: 1px solid #ff61a1;
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
      span {
        font-size: 22px;
        color: #f10200;
        font-weight: bold;
      }
    }
    .submit_bottom {
      p {
        margin-top: 0;
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
      width: 350px;
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
      input {
        border: 1px solid #bfbfbf;
        border-radius: 3px;
        outline: none;
        width: 320px;
        height: 40px;
        margin-left: 15px;
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
  .delet_bottom{
    width: 300px;
    margin: auto;
    height: 200px;
    div{
      width: 120px;
      height: 40px;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .delet_true{
        background-color: #FF61A1;
        color: #fff;
    }
    .delet_false{
        color: #FF61A1;
        border: 1px solid #FF61A1;
    }
  }
}
</style>