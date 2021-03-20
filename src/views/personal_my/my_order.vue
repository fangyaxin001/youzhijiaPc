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
        @leftIndex="leftIndex"
      ></personalLeft>
      <div class="order_right">
        <div class="order_ul">
          <ul>
            <li
              @click="toIndex(index)"
              :class="listIndex == index ? 'styleColer' : ''"
              v-for="(item, index) in dataList"
              :key="index"
            >
              {{ item }}
              <div v-show="listIndex == index" class="heng"></div>
            </li>
          </ul>
        </div>
        <div class="conent_box" v-show="orderList.length != 0">
          <div class="p_title">
            <p class="p1">订单详情</p>
            <p>收货人</p>
            <p>金额</p>
            <p>订单状态</p>
            <p>操作</p>
          </div>
          <ul class="list_ul">
            <li ref="" class="list_li" v-for="(item, index) in orderList" :key="index">
              <div class="flex_sb list_top">
                <div class="li_title">
                  <p>{{ item.addtime }}</p>
                  <p class="p2">订单号：{{ item.order_num }}</p>
                </div>
                <div @click="delOrder(item,index)">
                  <img src="../../assets/image/pos_del.png" alt="" />
                </div>
              </div>
              <div
                class="list_concent"
                v-for="(item1, index1) in item.goods"
                :key="index1"
              >
                <!-- 订单详情 -->
                <div class="order_datial">
                  <div>
                    <img
                      style="width: 86px; height: 86px; object-fit: unset"
                      :src="url + item1.img1_url"
                      alt=""
                    />
                  </div>
                  <div class="d2">
                    <p class="text-line p1">{{ item1.name }}</p>
                    <div class="flex_sb color_box">
                      <p>
                        规格：<span>{{ item1.size }}</span>
                      </p>
                      <p>x{{ item1.num }}</p>
                    </div>
                  </div>
                </div>
                <div class="shou_name">{{ item.address_user }}</div>
                <div class="shou_name money">₱{{ item1.xprice }}</div>
                <!-- 订单状态 -->
                <div class="shou_name">{{ item.status | setStatus }}</div>
                <!-- 操作 -->
                <div class="cao_zuo">
                  <p
                    class="p1"
                    v-show="item.status == 1"
                    @click="clearOrder(item)"
                  >
                    取消订单
                  </p>
                  <p
                    class="p1"
                    v-show="item.status !=6&&item.status ==4"
                    @click="apply(item)"
                  >
                    申请售后
                  </p>
                    <p
                    class="p1"
                    v-show="item.status == 3 "
                    @click="getGoods(item)"
                  >
                    确认收货
                  </p>
                  <p
                    class="p1"
                    v-show="item.status == 4 "
                    @click="goEvaluate(item)"
                  >
                    去评价
                  </p>
                  <p class="p2" @click="CheckDetial(item)">查看订单详情</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页 -->
        <div class="page_ye" v-show="orderList.length != 0">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currents"
            @prev-click="prevs"
            @next-click="nexts"
            :total="total"
          >
          </el-pagination>
        </div>
        <div v-show="orderList.length == 0" class="zanwei">
          <img src="../../assets/image/zanwushuju.png" alt="" />
          <p>该页面暂无商品订单</p>
        </div>
      </div>
    </div>
    <!-- 底部组件 -->
    <bottombei></bottombei>
    <!-- 申请售后 -->
    <el-dialog
      class="newly_dialog"
      :visible.sync="afterFlag"
      width="950px"
      :show-close="false"
    >
      <div
        class="flex_sb dia_order"
        v-for="(item, index) in orderData.goods"
        :key="index"
      >
        <div class="flex_sb" style="width: 500px">
          <div>
            <img
              style="width: 85px; height: 85px; object-fit: unset"
              :src="url + item.img1_url"
              alt=""
            />
          </div>
          <div class="detail_right">
            <p class="text-line">{{ item.name }}</p>
            <div class="g_tue flex_sb">
              <p class="p1">₱{{ item.xprice }}</p>
              <p>规格：{{ item.size }}</p>
            </div>
          </div>
        </div>
        <div class="dia_topRight">
          <p>实付金额<span>₱{{orderData.paymoney}}</span></p>
          <div class="flex_fe newly_title">
            <div class="cu_img" @click="afterFlag = false">
              <img
                v-show="index == 0"
                src="../../assets/image/gray_cha.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="dia_int">
        <div class="ac_evaluate">
          <div>售后类型</div>
          <div class="inp_cou">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="ac_evaluate">
          <div>原因</div>
          <div class="inp_cou">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="多行输入"
              v-model="couent"
              resize="none"
              maxlength="200"
            >
            </el-input>
          </div>
        </div>
        <div class="ac_evaluate">
          <div>上传凭证</div>
          <div class="inp_cou">
            <div class="up_box">
              <el-upload
              :class="{ hide: hideUploadEdit }"
              :action="upUrl"
              name="image"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="imgSuccess"
              :on-change="handleEditChange"
              :limit="9"
              :file-list="imgFileList"
              accept=".png, .gif, .jpg"
              >
                <i class="el-icon-plus"></i>
                <span class="textImg">上传图片</span>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
            <div class="submit" @click="submit">提交</div>
          </div>
        </div>
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
      dataList: [
        "全部订单",
        "待付款",
        "待发货",
        "待收货",
        "待评价",
        "已完成",
        "退款/售后",
      ],
      listIndex: 0,
      afterFlag: false, //控制申请售后弹框
      couent: "",
      dialogImageUrl: "",
      dialogVisible: false,
      options: [
        {
          value: "1",
          label: "退货",
        },
        {
          value: "2",
          label: "换货",
        },
      ],
      imgList: [],
      imgFileList:[],
      hideUploadEdit: false,//上传9个隐藏
      value: "",
      myPage: 1,
      total: null,
      orderList: [], //订单列表
      orderData: {}, //当前订单
    };
  },
  filters: {
    setStatus(e) {
      console.log(e);
      var arr = [
        "全部",
        "待付款",
        "待发货",
        "待收货", 
        "待评价",
        "已完成", 
       "售后处理中",
        "售后已完成",
      ];
      return arr[e];
    },
  },
  methods: {
    // 接受搜索的结果
    searchName(e) {
      console.log(e);
      this.homeIndex = e.index;
      this.searchVale = e.value;
    },
    toIndex(index) {
      this.listIndex = index;
      this.orderList = [];
       this.$router.push({
        path: "/my_order",
        query: {
          idx : index
        },
      });
      this.orderGet(this.listIndex);
    },
    //  接受子组件传过来的索引
    leftIndex(e) {
      console.log(e);
      if (e < 7) {
        this.listIndex = e;
         this.orderGet(this.listIndex);
      } else {
        return;
      }
    },
    // 上一页
    prevs() {
      this.myPage--;
      if (this.myPage < 1) return (this.myPage = 1);

      this.orderGet(this.listIndex);
    },
    // 下一页
    nexts() {
      this.myPage++;
      if (this.myPage > Math.ceil(this.total / 10))
        return (this.myPage = this.myPage - 1);
      this.orderGet(this.listIndex);
    },
    // 当前页
    currents(index) {
      console.log(index);
      this.myPage = index;
      this.orderGet(this.listIndex);
    },
    // 查看订单详情
    CheckDetial(item) {
      this.$router.push({
        path: "/order_detial",
        query: {
          orderNum: item.order_num,
          orderTime: item.addtime,
        },
      });
    },
    //删除订单
    delOrder(item,index) {
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.orderDel(item, 1,index);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
      

    },
    // 取消订单
    clearOrder(item) {
      this.orderDel(item, 2);
    },
    //删除接口
    orderDel(item, num,index) {
      this.$require
        .post(this.$inter.common.orderDel, {
          order_num: item.order_num,
          type: num,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            if (num == 1) {
              this.$message.success("删除订单成功");
            } else {
              this.$message.success("订单已取消");
            } 
            this.orderList.splice(index,1)
            
          }
        });
    },
    //
    apply(item) {
      console.log(item);
      this.afterFlag = true;
      this.orderData = item;
    },
    // 确认收货
    getGoods(item){
       this.$require
        .post(this.$inter.common.Goods, {
          order_num: item.order_num, 
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("已确认收货"); 
            console.log(this.listIndex);
            this.orderGet(this.listIndex);
          }
        });
        
    },
    // 去评价
    goEvaluate(item) {
      this.$router.push({
        path: "/evaluate",
        query: {
          orderData: JSON.stringify(item),
        },
      });
    },
  // 删除图片的回调函数
            handleRemove(file, fileList) {
                console.log(file);
                for (var i = 0; i < this.imgList.length; i++) {
                    if (this.imgList[i] == file.response.pic) {
                        this.imgList.splice(i, 1)
                    }
                }
                this.hideUploadEdit = fileList.length >= 9; 
            },
            // 图片上传成功
            imgSuccess(res, file, fileList) {
                console.log(res);
                this.imgList.push(res.pic)
                this.imgFileList = fileList
            },
              // 超出
            handleEditChange(file, fileList) {
                this.hideUploadEdit = fileList.length >= 9;
                // console.log(vm.hideUploadEdit);
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
    //提交
    submit() {
      console.log(this.value);
      if (this.couent == "") return this.$message.error("请填写评价内容");
      if (this.value == "") return this.$message.error("请填写评价内容");
      this.imgList = JSON.stringify(this.imgList)
this.$require .post(this.$inter.common.orderBackGet, {
          order_num: this.orderData.order_num,
          content: this.couent,
          img: this.imgList,
          type: this.value,
        })
        .then((res) => {
          console.log(res);
          this.imgList = []
          if (res.code == 1) {
            
           this.$message.success("提交成功");
         this.orderGet(this.listIndex);
        this.afterFlag = false;
         
          }
        });
     
    },
    // 订单接口
    orderGet(staIndex) {
      this.$require
        .post(this.$inter.common.orderGet, {
          status: staIndex,
          page: this.myPage,
        })
        .then((res) => { 
          console.log(res);
          if (res.code == 1) {
        
            this.orderList = res.data.items
            this.total = res.data.total;
          }else{
            this.orderList = []
          }
        });
    },
  },
  created() {
    if (this.$route.query.idx) {
      this.listIndex = this.$route.query.idx;
      this.orderGet(this.listIndex);
    } else {
      this.orderGet(0);
    }
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
          cursor: pointer;
        }
        .heng {
          border-top: 3px solid #ff61a1;
          width: 40px;
          margin: auto;
        }
      }
    }
  }
}
.styleColer {
  color: #ff61a1 !important;
}
.conent_box {
  background-color: #fff;
  margin-top: 3px;
  padding: 15px;
  box-sizing: border-box;
  .p_title {
    display: flex;
    color: #333333;
    font-size: 14px;
    background-color: #f9f9f9;
    border: 1px solid #eeeeee;
    p {
      text-align: center;
      height: 54px;
      line-height: 54px;
      width: 150px;
      margin: 0;
    }
    .p1 {
      width: 320px !important;
    }
  }
  .list_ul {
    .list_li {
      margin-top: 20px;
    }
    .list_top {
      background-color: #f9f9f9;
      padding: 0 20px 0 20px;
      box-sizing: border-box;
      .li_title {
        display: flex;
        font-size: 14px;
        color: #333333;
        .p2 {
          margin-left: 25px;
        }
      }
      img {
        cursor: pointer;
      }
    }
    .list_concent {
      display: flex;
      align-items: center;
      margin-top: 10px;
      border: 1px solid #eeeeee;
      height: 145px;
      .order_datial {
        display: flex;
        align-items: center;
        width: 320px;
        height: 145px;
        border-right: 1px solid #eeeeee;
        padding: 15px;
        box-sizing: border-box;
        .d2 {
          width: 180px;
          margin-left: 20px;
          line-height: 20px;
          p {
            font-size: 14px;
            margin: 0;
          }
          .p1 {
            margin-bottom: 3px;
          }
          .color_box {
            color: #999999;
            font-size: 14px;
            margin-top: 10px;
          }
        }
      }
      .shou_name {
        padding: 15px;
        box-sizing: border-box;
        width: 150px;
        height: 145px;
        line-height: 100px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        border-right: 1px solid #eeeeee;
      }
      .money {
        color: #f10200;
      }
      .cao_zuo {
        font-size: 14px;
        text-align: center;
        width: 150px;
        p {
          cursor: pointer;
        }
        .p1 {
          color: #999999;
        }
        .p2 {
          color: #ff61a1;
        }
      }
    }
  }
}

.page_ye {
  text-align: center;
  margin-top: 50px;
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ff61a1;
  }
  /deep/.el-pagination.is-background .el-pager li:hover {
    color: #ff61a1 !important;
  }
}
.newly_dialog {
  /deep/.el-dialog__header {
    padding: 0 !important;
  }
  /deep/.el-dialog__body {
    padding: 0 !important;
  }
  .dia_order {
    padding: 30px 30px 10px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    .detail_right {
      width: 390px;
      text-align: left !important;
      font-size: 14px;
      color: #333333;
      p {
        margin: 10px;
        font-size: 14px;
        color: #333333;
      }

      .g_tue {
        width: 200px;
        color: #999999 !important;
        .p1 {
          color: #f10200;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .dia_topRight {
      display: flex;
      justify-content: space-between;
      height: 83px;
      width: 250px;
      .cu_img {
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
      p {
        line-height: 73px;
        span {
          color: #f10200;
          display: inline-block;
          margin-left: 20px;
          font-size: 14px;
        }
      }
    }
  }
  .dia_int {
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
    .ac_evaluate {
      display: flex;
      margin-top: 30px;
      /deep/.el-upload--picture-card {
        position: relative;
      }
      .up_box {
        .textImg {
          display: inline-block;
          text-align: center;
          width: 148px;
          color: #999999;
          font-size: 14px;
          height: 45px;
          line-height: 45px;
          position: absolute;
          left: 0;
          bottom: -50px;
        }
      }
      .inp_cou {
        width: 600px;
        margin-left: 20px;
        .submit {
          background-color: #ff61a1;
          width: 170px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          border-radius: 5px;
          margin-top: 50px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
.hide /deep/ .el-upload--picture-card {
        display: none;
    }
</style>
