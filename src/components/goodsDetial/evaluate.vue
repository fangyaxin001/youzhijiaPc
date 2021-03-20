<template>
  <div class="evaluate">
    <div class="flex_sb ev_title">
      <div class="ev_order">评价订单</div>
      <div class="flex_sb right_order">
        <div>{{ orderData.addtime }}</div>
        <div>订单号：{{ orderData.order_num }}</div>
      </div>
    </div>
    <div
      class="order_list"
      v-for="(item, index) in orderData.goods"
      :key="index"
    >
      <div class="flex_sb" style="width: 500px">
        <div>
          <img
            style="width: 85px; height: 85px; object-fit: unset"
            :src="item.img1_url"
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
       <!-- 商品评价 -->
    <div class="evaluate_box">
      <div class="ac_evaluate">
        <div>商品评分</div>
        <el-rate
          style="margin-left: 20px"
          v-model="item.evaluateValue"
          show-text
        ></el-rate>
      </div>
      <div class="ac_evaluate">
        <div>评价内容</div>
        <div class="inp_cou">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="多行输入"
            v-model="item.couent"
            resize="none"
            maxlength="200"
          >
          </el-input>
        </div>
      </div>
      <div class="ac_evaluate">
        <div>拍照晒图</div>
        <div class="inp_cou">
          <div class="up_box" @click="myload(index)">
             <!-- :class="{ hide: item.hideUploadEdit }" -->
            <el-upload  
              :action="upUrl"
              name="image"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="imgSuccess"
              :on-change="handleEditChange"
              :limit="3"  
              :file-list="item.imgFileList"
               :on-progress="covergress"
               :before-upload="beforeUpload"
              accept=".png, .gif, .jpg"
              v-show="!item.flag"
            >
              <i class="el-icon-plus"></i>
              <span class="textImg">上传图片</span>
            </el-upload> 
            <el-progress class="avatar" :width="160" v-show="item.flag" type="circle" :percentage="item.percentage">
                    </el-progress>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
          <div class="ni_eval">
            <el-checkbox v-model="item.checked">匿名评价</el-checkbox>
          </div> 
        </div> 
      </div>
    </div>
       
    </div>
      <div class="mysub">
        <div class="submit" @click="submit">提交</div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      evaluateValue: 0,
      couent: "",
      checked: false,
      dialogImageUrl: "",
      dialogVisible: false,
      orderData: {},
      imgList: [],
      imgFileList:[],
      hideUploadEdit: false,//上传9个隐藏
      setIndex:null
    };
  },
  methods: {
         // 删除图片的回调函数
            handleRemove(file, fileList) {
                console.log(file);
                for (var i = 0; i <  this.orderData.goods[this.setIndex].imgList.length; i++) {
                    if ( this.orderData.goods[this.setIndex].imgList[i] == file.response.pic) {
                        this.orderData.goods[this.setIndex].imgList.splice(i, 1)
                    }
                }
              this.orderData.goods[this.setIndex].hideUploadEdit = fileList.length >=3; 
            },
            myload(index){
              console.log(index);
           this.setIndex = index
           console.log(this.setIndex); 
          if (!this.orderData.goods[this.setIndex].imgList) {
            this.orderData.goods[this.setIndex].imgList = []
          }
            },
            // 图片上传前
            beforeUpload(){
          this.orderData.goods[this.setIndex].percentage = 0;
           this.orderData.goods[this.setIndex].item =true ; 
           
            },
            //图片上传时
            covergress(event) {
                console.log(event);
                 this.orderData.goods[this.setIndex].percentage = event.percent;
                 console.log(this.orderData.goods[this.setIndex].percentage);
            },
            // 图片上传成功
            imgSuccess(res, file, fileList) { 
                console.log(res);  
                  this.orderData.goods[this.setIndex].item =false ; 
                console.log(this.setIndex); 
                this.orderData.goods[this.setIndex].imgList.push(res.pic)
                 this.orderData.goods[this.setIndex].imgFileList = fileList
            },
              // 超出
            handleEditChange(file, fileList) {
               this.orderData.goods[this.setIndex].hideUploadEdit = fileList.length >= 3; 
            },
            // 点击文件列表中已上传的文件时的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            
    //提交
    submit() {
    var couent  = []
    var evlue  = []
    var checked  = []
    var img  = []
    var goodId = []
    for (let i = 0; i < this.orderData.goods.length; i++) {
      if (this.orderData.goods[i].couent) {
        goodId.push(this.orderData.goods[i].id)
       couent.push(this.orderData.goods[i].couent)
       evlue.push(this.orderData.goods[i].evaluateValue)
       img.push(this.orderData.goods[i].imgList)
         
      if (this.orderData.goods[i].checked) {
        this.orderData.goods[i].checked = 1
        checked.push(this.orderData.goods[i].checked)
      }else{
         this.orderData.goods[i].checked = -1
         checked.push(this.orderData.goods[i].checked)
      }
      
      }else{
        this.orderData.goods[i].imgList = []
         img.push(this.orderData.goods[i].imgList)
      }
    
      
      
    }
     
      img = JSON.stringify(img)
      couent = JSON.stringify(couent) 
      evlue = JSON.stringify(evlue)
      checked = JSON.stringify(checked)
      goodId = JSON.stringify(goodId)
      //  couent = couent.join(",")
      //   evlue = evlue.join(",")
      //    checked = checked.join(",")
      //     goodId = goodId.join(",")
      console.log(this.orderData.order_num); 
      console.log(this.orderData.goods);
      console.log(couent); 
      console.log(evlue); 
      console.log(checked); 
      console.log(img);  
      
      // 商品分别评价，要给商品id
      this.$require 
        .post(this.$inter.common.orderFeedbackGetAll, {
          goods_id:goodId,
          order_num: this.orderData.order_num,  
          content: couent,
          img: img,
          nice: evlue,
          is_niming: checked,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) { 
            this.$message.success("评价成功");
            setTimeout(() => {
              this.$router.push("/my_order");
            }, 1000);
          }
        });
    },
  },
  created() {
    this.orderData = JSON.parse(this.$route.query.orderData);
  },
};
</script>
<style lang="less" scoped>
.evaluate {
  width: 1200px;
  margin: auto;
  margin-top: 40px;
  .ev_title {
    padding: 0 30px 0 30px;
    box-sizing: border-box;
    height: 50px;
    background-color: #fff;
    .ev_order {
      color: #333333;
      font-weight: bold;
    }
    .right_order {
      width: 420px;
      font-size: 14px;
      color: #333333;
    }
  }
  .order_list {
    background-color: #fff;
    padding: 20px 35px 20px 35px;
    box-sizing: border-box;
    margin-top: 2px;
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
  }
  .evaluate_box {
    background-color: #fff;
    margin-top: 20px;
    padding: 35px;
    box-sizing: border-box;
    /deep/.el-rate__icon {
      font-size: 22px;
    }
    .ac_evaluate {
      display: flex;
      margin-top: 20px;
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
    }
    .inp_cou {
      width: 600px;
      margin-left: 20px;
      .ni_eval {
        margin-top: 70px;
      }
      /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #ff61a1;
        border: 1px solid #ff61a1;
      }
      /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #ff61a1;
        border: 1px solid #ff61a1;
      }
      /deep/.el-checkbox__inner:hover {
        border: 1px solid #ff61a1;
      }
      /deep/.el-checkbox__input.is-focus .el-checkbox__inner {
        border: 1px solid #ff61a1;
      }
      /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
        color: #606266;
      }
     
    }
  }
}
.mysub{
  background-color: #fff;
  height: 100px;
  .submit {
    margin: auto;
        background-color: #ff61a1;
        width: 170px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
      }
}
 
.hide /deep/ .el-upload--picture-card {
        display: none;
    }
   
</style>