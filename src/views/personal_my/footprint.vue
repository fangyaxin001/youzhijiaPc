<template>
  <div>
    <!-- 顶部组件 -->
    <homeTop></homeTop>
    <!-- 搜索组件 -->
    <loginHead @searchName="searchName" :seatch="true"></loginHead>
    <!-- 悬浮组件 -->
    <fielxRight @newValue="newValue"></fielxRight>
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
      <!-- 我的评价 -->
      <div class="order_right" v-show="listIndex == 9">
        <div class="order_ul">
          <ul>
            <li :class="listIndex == 9 ? 'styleColer' : ''">
              我的评价
              <div v-show="listIndex == 9" class="heng"></div>
            </li>
          </ul>
        </div>
        <!-- 评价 -->
        <div
          class="evaluate"
          v-for="(item, index) in commentList"
          :key="index"
          v-show="commentList.length != 0"
          
        >
         <div   v-for="(items, indexs) in item.goods"
              :key="indexs">
          <div class="orderTop_box">
            <div
              class="flex_sb"
           
            >
              <div class="left_box flex_sb">
                <div>
                  <img
                    style="width: 86px; height: 86px; object-fit: unset"
                    :src="url + items.img1_url_goods"
                    alt=""
                  />
                </div>
                <div class="p_box">
                  <p class="p1 ellipsis">{{ items.name }}</p>
                  <p class="p2">规格：{{ item.note }}</p>
                </div>
              </div>
              <div class="right_box">
                <p class="p1">
                  下单时间：<span>{{ item.addtime }}</span>
                </p>
                <p class="p2">
                  订单号：<span>{{ item.order_num }}</span>
                </p>
                <p class="p3">
                  实付款：<span>₱{{ item.paymoney }}</span>
                </p>
              </div> 
            </div>
                <div class="comment">
            <div class="comment_box">
              <div>
                <div class="flex_sb comment_left">
                  <div><img :src="url + item.headimg_url" alt="" /></div>
                  <div class="com_name_box">
                    <p class="ellipsis">{{ item.nick }}</p>
                    <p class="p1">{{ item.datetime  }}</p>
                  </div>
                </div>
              </div>
              <div class="comment_right">
                <!-- 五星评分 -->
                <div class="good_ping">
                  <el-rate v-model="items.nice" disabled text-color="#ff9900">
                  </el-rate>
                </div>
                <p>{{ items.content }}</p>
                <div class="img_box">
                  <div v-for="(item1,index1) in items.img_url" :key="index1">
                    <img
                      style="width: 83px; height: 83px; object-fit: unset"
                      :src="url+item1 "
                      alt=""
                    />
                  </div> 
                </div>
                <p class="delet_eva" @click="delPingjia(item)">删除此评价</p>
              </div>
            </div>
          </div>
          </div>
         </div>
        </div> 
        <!-- 分页 -->
        <div class="page_ye" v-show="commentList.length != 0">
          <el-pagination background layout="prev, pager, next" :total="evenTotal"  @current-change="evealeCurrents"
              @prev-click="evealePrevs"
              @next-click="evealeNexts">
          </el-pagination>
        </div>
        <div v-show="commentList.length == 0" class="zanwei">
          <img src="../../assets/image/zanwushuju.png" alt="" />
          <p>您当前暂无评价</p>
        </div>
      </div>
      <!-- 我的足迹 -->
      <div class="order_right" v-show="listIndex == 10">
        <div class="order_ul">
          <ul>
            <li :class="listIndex == 10 ? 'styleColer' : ''">
              我的足迹
              <div v-show="listIndex == 10" class="heng"></div>
            </li>
          </ul>
        </div>
        <div>
          <div class="recommend_box">
            <!-- 列表 -->
            <div class="felx_wap" v-show="footListL.length != 0">
              <div
                class="rec_box"
                v-for="(item, index) in footListL"
                :key="index"
                @click="lookDetial(item)"
              >
                <div class="del_img" @click="delFootprint(item,index)">
                  <img
                    width="30px"
                    height="30px"
                    src="../../assets/image/delet.png"
                    alt=""
                  />
                </div>
                <div style="text-ag">
                  <img class="bind_img" v-lazy="url + item.img1_url" alt="" />
                </div>
                <p class="ellipsis">{{ item.name }}</p>
                <p>
                  <s>₱{{ item.yprice }}</s>
                </p>
                <div class="flex_sb">
                  <p class="rec_money">₱{{ item.xprice }}</p>
                  <p class="rec_good">{{ item.nice }}个好评</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="page_ye" v-show="footListL.length != 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="currents"
              @prev-click="prevs"
              @next-click="nexts"
            >
            </el-pagination>
          </div>
          <div v-show="footListL.length == 0" class="zanwei">
            <img src="../../assets/image/zanwushuju.png" alt="" />
            <p>暂无浏览足迹</p>
          </div>
        </div>
      </div>
      <!-- 新品需求 -->
      <div class="order_right" v-show="listIndex == 11">
        <div class="order_ul">
          <ul>
            <li :class="listIndex == 11 ? 'styleColer' : ''">
              新品需求
              <div v-show="listIndex == 10" class="heng"></div>
            </li>
          </ul>
        </div>
        <div class="newget">
          <el-input
            style="width: 750px"
            type="textarea"
            :rows="14"
            placeholder="多行输入"
            v-model="newtext"
            maxlength="250"
            resize="none"
          >
          </el-input>
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
              :limit="3"
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
          <div class="submit" @click="needSubmit">提交</div>
        </div>
        <div></div>
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
      listIndex: 9,
      newtext: "", //新品需求输入框
      xingValue: 4, //评论星级评分
      dialogImageUrl: "",
      dialogVisible: false,
      hideUploadEdit: false, //上传9个隐藏
      imgs: [],
      imgFileList: [], //图片列表
      footListL: [], //我的足迹列表
      commentList: [], //我的评价列表
      total: null,
      mypage: 1,
      evenTotal:null,
       evenMypage: 1,
      pingfoot:false,//判断评价和足迹
    };
  },
  filters: {
    endData(value) {
      value = value.substring(0, 10);
      return value;
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
      if (e > 8 && e < 12) {
        this.listIndex = e;
        if (this.listIndex == 10) {
      this.pingfoot = true
          this.myHistory();
        } else if (this.listIndex == 9) {
      this.pingfoot = false
          this.myComment();
        }
      } else {
        return;
      }
    },
    // 我的需求提交
    needSubmit() {
      if (this.newtext == "") return this.$message.error("请输入需求");
      this.imgs = this.imgs.join(",");
      this.$require
        .post(this.$inter.common.myNeed, {
          content: this.newtext,
          img: this.imgs,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("提交成功");
            this.newtext = "";
            this.imgs = [];
            this.imgFileList = [];
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    //悬浮组件传的值
    newValue(e) {
      console.log(e);
      this.listIndex = e;
      if (this.listIndex == 9) {
        this.myHistory();
        var a = [[1],[2],[3]]
      }
    },
    //删除足迹
    delFootprint(item,index) {
      event.stopPropagation();
      this.footListL.splice(index,1)
    },
    lookDetial(item) {
      console.log(item.id);
      this.$router.push({
        path: "/good_detial",
        query: {
          id: item.gid,
        },
      });
    },
    // 删除足迹
    delHistory(myid) {
      this.$require
        .post(this.$inter.common.delHistory, {
          id: myid,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("删除成功")
            this.myHistory();
          }
        });
    },
    // 我的足迹
    myHistory() {
      this.$require
        .post(this.$inter.common.myHistory, {
          page: this.mypage,
        })
        .then((res) => {
          console.log(res);
          this.total = res.data.total;
          if (res.code == 1) {
            this.footListL = res.data.items;
          }
        });
    },
            // 上一页
    prevs() {
      this.mypage--;
      if (this.mypage < 1) return (this.mypage = 1);
      if(this.pingfoot){
       this.myHistory();
      }else{
        this.myComment();
      }
    }, 
    // 下一页
    nexts() {
      this.mypage++; 
      if (this.mypage >Math.ceil(this.total / 10))  
        return (this.mypage = this.total / 10);
       if(this.pingfoot){
       this.myHistory();
      }else{
        this.myComment();
      }
    },
    // 当前页
    currents(index) {
      this.mypage = index;
      if(this.pingfoot){
       this.myHistory();
      }else{
        this.myComment();
      }
      
    },
     // 我的评论上一页
    evealePrevs(){
       this.evenMypage--;
      if (this.evenMypage < 1) return (this.evenMypage = 1);
      this.myComment() 
    },
     // 我的评论下一页
    evealeNexts(){
   this.evenMypage++; 
      if (this.mypage >Math.ceil(this.evenTotal / 10))  
        return (this.evenMypage = this.evenTotal / 10);
        this.myComment() 
    },
     // 我的评论当前页
    evealeCurrents(index){
         console.log(index);
this.evenMypage = index;
       this.myComment() 
    },
    //删除评价
    delPingjia(item){
      console.log(item);
        this.$require
        .post(this.$inter.common.commentDel, {
          id: item.id,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.$message.success("评价删除成功")
            this.myComment()
          }
        });
    },
    // 我的评价
    myComment() {
      this.$require
        .post(this.$inter.common.myCommentAll, {
          page: this.evenMypage,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.evenTotal = res.data.total
            this.commentList = res.data.items;
          }
        });
    },
    // 删除图片的回调函数
    handleRemove(file, fileList) {
      console.log(file);
      for (var i = 0; i < this.imgs.length; i++) {
        if (this.imgs[i] == file.response.pic) {
          this.imgs.splice(i, 1);
        }
      }
      this.hideUploadEdit = fileList.length >= 3;
    },
    // 图片上传成功
    imgSuccess(res, file, fileList) {
      console.log(res);
      this.imgs.push(res.pic);
      this.imgFileList = fileList;
    },
    // 超出
    handleEditChange(file, fileList) {
      this.hideUploadEdit = fileList.length >= 3;
      // console.log(vm.hideUploadEdit);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  created() {
    if (this.$route.query.idx) {
      console.log(this.$route.query.idx);
      this.listIndex = this.$route.query.idx;
    }
    if (this.listIndex == 10) {
      this.pingfoot = true
      this.myHistory();
    } else if (this.listIndex == 9) {
      this.pingfoot = false
      this.myComment();
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
  // 我的足迹
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
    .styleColer {
      color: #ff61a1 !important;
    }
    .recommend_box {
      width: 970px;
      margin: auto;
      margin-top: 20px;
      .title {
        font-size: 24px;
        font-weight: bold;
        p {
          margin: 0 20px 5px 20px;
        }
      }
      .rec_box {
        width: 220px;
        height: 320px;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 10px;
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        .del_img {
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px;
          overflow: hidden;
          img {
            width: 30px;
            height: 30px;
            object-fit: unset;
          }
        }
        img {
          width: 170px;
          height: 170px;
          object-fit: unset;
        }
        .ellipsis {
          font-size: 14px;
          color: #333333;
        }
        s {
          font-size: 14px;
          color: #999999;
        }
        .rec_money {
          color: #f10200;
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        .rec_good {
          font-size: 14px;
          color: #bfbfbf;
          margin: 0;
        }
      }
      .rec_box:hover {
        box-shadow: 0px 0px 2px 0px #ff61a1;
      }
    }
  }
  //新品需求
  .newget {
    background-color: #fff;
    margin-top: 2px;
    padding: 40px;
    box-sizing: border-box;
    /deep/.el-upload--picture-card {
      position: relative;
    }
    .up_box {
      margin-top: 30px;
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
    .submit {
      color: white;
      background-color: #ff61a1;
      border-radius: 5px;
      width: 170px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin: 100px 0 20px 0;
    }
  }
  //我的评价
  .evaluate {
    background-color: #fff;
    margin-top: 2px;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;

    .orderTop_box {
      padding: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 5px 0 #eeeeee;
      cursor: pointer;
      .left_box {
        margin-left: 20px;
        width: 300px;
        .p_box {
          font-size: 14px;

          .p1 {
            color: #333333;
            margin-top: 15px;
            width: 200px;
          }
          .p2 {
            color: #999999;
            margin-top: 25px;
          }
        }
      }
      .right_box {
        font-size: 14px;
        p {
          margin: 15px;
        }
        .p1 {
          color: #666666;
        }
        .p2 {
          color: #666666;
        }
        .p3 {
          color: #333333;
          span {
            font-size: 22px;
            font-weight: bold;
            color: #f10200;
          }
        }
      }
    }
    .comment {
      background-color: #fff;
      margin-top: 10px;
      .comment_box {
        padding: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .comment_left {
          width: 220px;
          img {
            width: 55px;
            height: 55px;
            border-radius: 50px;
            overflow: hidden;
            object-fit: unset;
          }
          .com_name_box {
            margin-left: 10px;
            width: 150px;
            color: #333333;
            p {
              margin: 9px 0px 9 px 0px;
            }
            .p1 {
              color: #bfbfbf;
              font-size: 14px;
            }
          }
        }
        // 评价
        .comment_right {
          width: 580px;
          padding: 10px;
          box-sizing: border-box;
          margin-right: 40px;
          .good_ping {
            margin-top: 10px;
            /deep/.el-rate__icon {
              font-size: 30px;
            }
          }
          .img_box {
            display: flex;
            flex-wrap: wrap;
            div {
              margin: 10px;
              cursor: pointer;
            }
          }
          .delet_eva {
            text-align: right;
            color: #f10200;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
/deep/.el-pagination.is-background .el-pager li {
  background-color: none;
}

.hide /deep/ .el-upload--picture-card {
  display: none;
}
</style>
