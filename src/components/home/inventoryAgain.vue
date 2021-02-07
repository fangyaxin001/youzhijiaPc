
<template>
  <!-- 常用清单 -->
  <div>
    <div class="recommend_box">
      <!-- 列表 -->
      <div class="felx_wap">
        <div class="rec_box" v-for="(item, index) in 20" :key="index">
            <div class="del_img"><img width="30px" height="30px" src="../../assets/image/delet.png" alt=""></div>
          <div style="text-ag">
            <img class="bind_img" src="../../assets/image/dome.png" alt="" />
          </div>
          <p class="ellipsis">十月稻田 黑米1kg五谷杂粮</p>
          <p><s>￥228</s></p>
          <div class="flex_sb">
            <p class="rec_money">￥156</p>
            <p class="rec_good">55个好评</p>
          </div>
        </div>
      </div>
    </div>
     <!-- 分页 -->
    <div class="page_ye">
      <el-pagination background layout="prev, pager, next" :total="20">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>
<style lang="less" >
.rec_box{
    position: relative;
    .del_img {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      overflow: hidden;
      img{
          width: 30px;
      height: 30px;
      object-fit: unset;
      }
    }
}

</style>