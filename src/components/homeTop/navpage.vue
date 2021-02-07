
<template>
    <div class="nav_box">
         <div class="nav_cen">
               <ul class="flex_sa nav_box">
                   <li v-for="(item,index) in navtitle" :key="index" :class="myIndex==index ? 'showC':''"  @click="topTitle(index)">{{item}}</li> 
               </ul>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            navtitle:["首页","好货精选","常用清单"],
            myIndex:0,
        }
    },
    methods:{
        // 点击头部当行
         topTitle(index){
           this.myIndex = index
           console.log(index);
          this.$emit('searchName', {index:1+index})

         }
    },
    created(){

    },
}
</script>
<style lang="less">
    .nav_box{
        background-color: #FF61A1;
        .nav_cen{
            width: 1200px;
            margin: auto;
            
            .nav_box{
                height: 30px;
                width: 300px;
                color: white;
                li{
                    cursor: pointer;
                }
                .showC{
                    font-weight: Bold;
                }
            }
        }
    }
</style>