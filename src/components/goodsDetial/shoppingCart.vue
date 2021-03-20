<template>
  <div>
    <div class="cart_box">
      <!-- 顶部标题 -->
      <div class="order_ul">
        <ul>
          <li class="styleColer">
            全部商品<span v-show="cart_num">({{ cart_num }})</span>
            <div class="heng"></div>
          </li>
        </ul>
      </div>
      <div class="cart_table" v-show="cartList.length!=0">
        <el-table
        id="resultScroll"
        max-height="600px"
        
          ref="multipleTable"
          :data="cartList"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
            header-align="left"
            label="全选"
            width="65"
          >
          </el-table-column>
          <el-table-column label="商品信息" align="center">
            <template slot-scope="scope">
              <div class="flex_sa">
                <div>
                  <img
                    style="width: 85px; height: 85px; object-fit: unset"
                    :src="url + scope.row.img1_url"
                    alt=""
                  />
                </div>
                <div class="detail_right">
                  <p class="text-line">{{ scope.row.name }}</p>
                  <div class="g_tue flex_sb">
                    <p>规格：{{ scope.row.note }}</p>
                    <p>x{{ scope.row.num }}</p>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="170" align="center">
            <template slot-scope="scope">
              <p style="color: #f10200">₱{{ scope.row.xprice }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            width="170"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                v-model="scope.row.num"
                @change="handleChange(scope.$index, cartList[scope.$index])"
                 :precision="0"
                :min="1"
                :max="scope.row.total"
                label="描述文字"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="address" 
            label="小计" 
            width="170" 
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <p>₱{{ scope.row.xiaoji }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="170"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <p
                style="color: #f10200; cursor: pointer"
                @click="deletTrolly(scope.$index, cartList[scope.$index])" 
              >
                删除
              </p>
            </template>
          </el-table-column>
        </el-table>
        <div class="cart_bto flex_sb">
          <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
          <div>
            <el-checkbox v-model="checked" @change="toggleSelection" v-show="cartList.length!=0"
              >全选</el-checkbox
            >
          </div>
          <div style="color: #f10200;cursor: pointer;" @click="delAllGoods">删除选中的商品</div>
        </div>
        <div class="total">已选择{{this.tyopeNum.length}}件商品，总价：<span v-show="totalPrice">₱{{totalPrice}}</span><span v-show="!totalPrice">₱ 0</span></div>
        <div class="flex_fe">
          <div class="jiesuan" @click="subOrder">去结算</div>
        </div>
      </div>
       <div v-show="cartList.length == 0" class="zanwei">
            <img src="../../assets/image/zanwushuju.png" alt="" />
            <p>暂无订单</p>
          </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cart_num: 5,
      num: 1,

      tyopeNum: [],
      checked: false, //控制全选
      myPage: 1, //当前页
      cartList: [], //购物车列表
      cart_num: null, //购物车数量
      totalPrice:'',//总价
    };
  },
  methods: {

    toggleSelection() {
      //  this.cartList.forEach((row) => {
      //   console.log(row);
      //   row
        
      // });
       if(this.tyopeNum.length!=this.cartList.length) {//点击全选后数据所有选择的数据存到这个数组里边
                    this.tyopeNum.forEach(row => {
//                         this.$refs.multipleTable.toggleRowSelection(row,false);
                        this.$refs.multipleTable.clearSelection();//调用这个方法
                    });
                } 
      this.cartList.forEach((row) => {
        console.log(row);
        this.$refs.multipleTable.toggleRowSelection(row);
        
      });
    },
    // 这是全选
    handleSelectionChange(val) {
      this.tyopeNum = val
      console.log(val);
       this.totalPrice=null
       for(var i=0;i<val.length;i++){
            this.totalPrice = this.totalPrice*1+val[i].xiaoji*1   
       }
       console.log(this.totalPrice);
       if(this.totalPrice){
           this.totalPrice =  this.totalPrice.toFixed(2)
       }
      if(this.tyopeNum.length!=this.cartList.length){
        this.checked = false
      }else{
          this.checked =true
      }
    },
    subOrder() {
      
      if (this.tyopeNum.length ==0) return this.$message.error("请选择商品")
      var gid = []
      var size = []
      for(var i=0;i<this.tyopeNum.length;i++){
            gid.push(this.tyopeNum[i].gid)
            size.push(this.tyopeNum[i].size_id)
       }
       gid = JSON.stringify(gid)
       size = JSON.stringify(size)
       this.$router.push({
         path:"/check_order",
         query:{
             gid:gid,
           size:size,
           num:1,
           type:1
         }
       });
 
    },
    // 计数器数量
    handleChange(value,item) {
       this.totalPrice=""
      console.log(this.tyopeNum);
      if (this.tyopeNum.length>0) {
        for (var i = 0; i < this.tyopeNum.length; i++) {
        if (this.tyopeNum[i].id == item.id) {
          this.tyopeNum[i].xiaoji =  this.tyopeNum[i].num*this.tyopeNum[i].xprice
        }
        
      } 
       for(var i=0;i<this.tyopeNum.length;i++){
            this.totalPrice = this.totalPrice*1+this.tyopeNum[i].xiaoji*1
       }
       console.log(this.totalPrice);
           this.totalPrice =  this.totalPrice.toFixed(2)
      }
       item.xiaoji = item.num*item.xprice
      item.xiaoji =   item.xiaoji.toFixed(2) 
      console.log(item);
       this.$require
        .post(this.$inter.common.setNum, {
          id: item.id,
          num:item.num
        })
        .then((res) => {
          console.log(res); 
        });
      
    },
    // 删除购物车商品
    deletTrolly(index, item) {
      console.log(item);
     
         this.$confirm('此操作将删除购物车商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.$require
        .post(this.$inter.common.delTrolley, {
          id: item.id,
        })
        .then((res) => {
          console.log(res);
         if (res.code==1) {
             this.$message.success("删除成功") 
             this.$store.commit("Trolley",this.cart_num-1) 
             this.cartList.splice(index,1)
         }
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 删除勾选的商品
    delAllGoods(){
      if(this.tyopeNum.length==0) return this.$message.error("请先勾选商品") 
       
         this.$confirm('此操作将删除购物车商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
               var idList = []
      for (let i = 0; i < this.tyopeNum.length; i++) {
        idList.push(this.tyopeNum[i].id)
      }
      idList =  idList.join(",")
      console.log(idList);
      this.cartList= []
       this.delTrolley(idList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 删除购物车商品接口
    delTrolley(myid) {
      this.$require
        .post(this.$inter.common.delTrolley, {
          id: myid,
        })
        .then((res) => {
          console.log(res);
         if (res.code==1) {
             this.$message.success("删除成功") 
             var arr =  myid.split(",")
             console.log(arr); 
             this.$store.commit("Trolley",this.cart_num-arr.length) 
             this.getTrolley()
         }
        });
    },
    // 购物车列表
    getTrolley() {
      this.$require
        .post(this.$inter.common.getTrolley, {
          page: this.myPage,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 1) {
            this.cartList = [...this.cartList, ...res.data.items];
            this.cart_num = res.data.total;
            for (var i = 0; i < this.cartList.length; i++) {
              this.cartList[i].xiaoji = this.cartList[i].num * this.cartList[i].xprice;
               this.cartList[i].xiaoji =  this.cartList[i].xiaoji.toFixed(2) 
             
            }
          }else{
            this.cartList = []
            this.cart_num = 0
          }
        });
    },
  },
  mounted(){
     // 获取需要绑定的table
        this.dom = this.$refs.multipleTable.bodyWrapper
       
        this.dom.addEventListener('scroll', () => {
            // 滚动距离
            let scrollTop = this.dom.scrollTop
            // 变量windowHeight是可视区的高度
            let windowHeight = this.dom.clientHeight || this.dom.clientHeight
            // 变量scrollHeight是滚动条的总高度
            let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
            if (scrollTop + windowHeight === scrollHeight) {
                // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
           
                   this.myPage++;
                   if (this.myPage <=Math.ceil(this.cart_num/10) ) {
                    this.getTrolley()
                     } 
            }
        })

  },
  created() {
    this.getTrolley()
  },
};
</script>
<style lang="less" scoped>
.cart_box {
  width: 1200px;
  margin: auto;

  .order_ul {
    margin-top: 20px;
    ul {
      background-color: #fff;
      display: flex;
      padding-left: 10px;
      box-sizing: border-box;
      height: 47px;
      li {
        width: 130px;
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
    .styleColer {
      color: #ff61a1 !important;
    }
  }
  .cart_table {
    margin-top: 2px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;

    /deep/ .el-table__header-wrapper .el-checkbox__input::after {
      content: "全选";
      position: absolute;
      margin-left: 5px;
    }
    .detail_right {
      width: 250px;
      text-align: left !important;
      font-size: 14px;
      color: #333333;
      p {
        margin: 3px;
      }
      .g_tue {
        color: #999999 !important;
      }
    }
    .cart_bto {
      background-color: #f9f9f9;
      margin-top: 20px;
      height: 50px;
      font-size: 14px;
      padding: 0 25px 0 25px;
      box-sizing: border-box;
    }
    .total {
      text-align: right;
      padding: 25px;
      box-sizing: border-box;
      color: #333333;
      font-size: 14px;
      span {
        color: #f10200;
        font-size: 22px;
      }
    }
    .flex_fe {
      padding: 0 25px 0 25px;
      box-sizing: border-box;
      .jiesuan {
        width: 140px;
        height: 40px;
        background-color: #ff61a1;
        color: white;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
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
</style>