<template>
  <div>
    <!-- 顶部组件 -->
    <homeTop></homeTop>
    <!-- 搜索组件 -->
    <loginHead @searchName="searchName" :seatch="true" :clear="homeIndex"></loginHead>
    <!-- 导航组件 -->
    <navpage  @searchName="searchName" ></navpage>
    <!-- 悬浮组件 -->
    <fielxRight></fielxRight>
    <!-- 搜索结果 -->
    <searchResult v-if="homeIndex == 0" :searchValue="searchVale" ></searchResult>
    <!-- 首页 -->
    <home v-if="homeIndex == 1" @looks="looks" @mySevenClass="mySevenClass"></home>
    <!-- 好货精选 -->
    <goodSelection v-if="homeIndex ==2" :myCalss="myCalss"></goodSelection>
    <!-- 常用清单 -->
    <inventoryAgain v-if="homeIndex ==3"></inventoryAgain> 
    <!-- 底部组件 -->
    <bottombei></bottombei>
  </div>
</template>

<script>
// @ is an alias to /src
import homeTop from "@/components/homeTop/homeTop.vue"; //顶部组件
import loginHead from "@/components/loginHead/loginHead.vue"; //搜索组件
import bottombei from "@/components/bottomTitle/bottomBei.vue"; //底部组件
import navpage from "@/components/homeTop/navpage.vue"; //导航组件
import fielxRight from "@/components/homeTop/fielxRight.vue"; //悬浮组件
import home from "@/components/home/home.vue"; //首页
import searchResult from "@/components/home/searchResult.vue"; //搜索结果
import goodSelection from "@/components/home/GoodSelection.vue"; //顶部组件
import inventoryAgain from "@/components/home/inventoryAgain.vue"; //顶部组件

export default {
  name: "Home",
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
  },
  data() {
    return {
      searchVale: "", //接收的搜索值
      homeIndex: 1, //控制组件
      myCalss:"",
      clearval:"",
    };
  },
  methods: {
    // 接受搜索的结果
    searchName(e) {
      console.log(e);
      this.homeIndex = e.index;
      this.searchVale = e.value;
     
    },
    // 查看全部跳到好货精选
   looks(e){
         this.homeIndex = e
   },
   mySevenClass(e){
         this.homeIndex = 2
         console.log(e);
         this.myCalss = e
   }
  },
  created() {
    console.log(this.$route.query.index);
    if(this.$route.query.index){
       this.homeIndex = this.$route.query.index;
       this.searchVale = this.$route.query.value;
    }
    this.USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
    // if (this.USER_INFO == null) {
    //   console.log(22);
    //   return this.$router.push({
    //     path: "/login",
    //   });
    // }
  },
};
</script>
<style lang="less">

</style>
