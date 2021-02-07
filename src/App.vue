<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {};
  },
  created() {
 
    }
};
</script>
<style lang="less">
@import "./css/css.less";
.fe{
  display: flex;
}
body{
  margin: 0;
  padding: 0;
  font-family: "微软雅黑",Arial;
  background-color: #F7F7F7;
}
ul,li{
  list-style: none;
     margin: 0;
    padding: 0;
}
</style>
