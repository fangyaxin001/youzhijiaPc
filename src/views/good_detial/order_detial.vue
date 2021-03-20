
<template>
  <div>
          <!-- 顶部组件 -->
    <homeTop></homeTop>
    <!-- 搜索组件 -->
    <loginHead @searchName="searchName" :seatch="true"></loginHead>
    <!-- 导航组件 -->
    <navpage  @searchName="searchName"></navpage>
    <!-- 悬浮组件 -->
    <fielxRight></fielxRight>
    <!-- 订单详情 -->
    <orderDetial></orderDetial> 
    <!-- 底部组件 -->
    <bottombei></bottombei>
  </div>
</template>
<script>
import homeTop from "@/components/homeTop/homeTop.vue"; //顶部组件
import loginHead from "@/components/loginHead/loginHead.vue"; //搜索组件
import bottombei from "@/components/bottomTitle/bottomBei.vue"; //底部组件
import navpage from "@/components/homeTop/navpage.vue"; //导航组件
import fielxRight from "@/components/homeTop/fielxRight.vue"; //悬浮组件
import home from "@/components/home/home.vue"; //首页
import searchResult from "@/components/home/searchResult.vue"; //搜索结果
import goodSelection from "@/components/home/GoodSelection.vue"; //顶部组件
import inventoryAgain from "@/components/home/inventoryAgain.vue"; //顶部组件
import orderDetial from "@/components/goodsDetial/orderDetial.vue"; //商品详情

export default {
  data() {
    return {};
  },
  components: {
    homeTop,
    loginHead,
    bottombei,
    navpage,
    fielxRight,
    home,
    searchResult,
    goodSelection,
    inventoryAgain,
    orderDetial
  },
  methods: {
      searchName(e){
          console.log(e);
          this.$router.push({
              path:"/",
              query:{
                  index :e.index,
                  value:e.value
              }
          })
        //   this.$router.query.index
      }
  },
  created() {},
};
</script>
<style lang="less">
</style>