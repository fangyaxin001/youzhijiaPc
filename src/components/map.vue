<template>
  <div class="map_box">
    <div id="Gmaps"></div>
    <remote-js
      jsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0esO7yEqzgv1hhZj8jwrrLXmq09lFhDM&libraries=places"
      :js-load-call-back="loadRongJs"
    ></remote-js>
    <div>
      <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon" />
        <span id="place-name" class="title"></span><br />
        <span id="place-address"></span>
      </div>
      <div class="inp_cc">
        <input
          ref="evalue"
          class="myinput"
          id="pac-input"
          type="text"
          placeholder="Start typing here"
          @change="myinput"
          v-model="mapValue"
        />
      </div>
    </div>
    <div class="conent" @click="goMap">确认</div>
  </div>
</template>
<script>
import RemoteJs from "./remote";
export default {
  components: {
    RemoteJs,
  },
  data() {
    return {
      mapData: {},
      mapValue: "",
    };
  },
  props: {
    // mapData: {
    //   type: Object,
    //   required: true
    // }
  },
  methods: {
    goMap() {
      if (this.mapValue == "") return this.$message.error("请填写地址");
      this.$emit("typeValue", this.mapValue);
    },
    myinput(e) {
        var _this = this;
      setTimeout(function(){
          _this.mapValue= _this.$refs["evalue"].value
      },500)
    },
    loadRongJs() {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(JSON.stringify(position));
          console.log(JSON.stringify(position.coords));
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // map.setCenter(pos);
          // const geocoder = new google.maps.Geocoder();
          // geocoder.geocode({ location: pos }, (results, status) => {
          //     if (status === "OK") {
          //         if (results[0]) {
          //             map.setZoom(17);
          //             const marker = new google.maps.Marker({
          //                 position: pos,
          //                 map: map,
          //             });
          //             console.log(JSON.stringify(results));
          //             console.log(results[0].formatted_address);
          //             document.getElementById('pac-input').value = results[0].formatted_address
          //         } else {
          //             window.alert("No results found");
          //         }
          //     } else {
          //         window.alert("Geocoder failed due to: " + status);
          //     }
          // });
        },
        function (err) {
          console.log(err);
        },
        {
          enableHighAcuracy: true, //位置是否精确获取
          timeout: 5000, //获取位置允许的最长时间
          maximumAge: 1000, //多久更新获取一次位置
        }
      );

      var options = {
        zoom: 15,
        // 1：世界
        // 5：大陆/大陆
        // 10：城市
        // 15：街道
        // 20：建筑物
        center: { lat: 22.631243, lng: 114.221854 },
        // 动态从调用组件传递经纬度
        disableDefaultUI: false,
        zoomControl: true,
      };
      var map = new google.maps.Map(document.getElementById("Gmaps"), options);
      //   let marker = new google.maps.Marker({
      //     position: { lat: 22.631243, lng: 114.221854 },
      //     map: map,
      //     title: "Google Map", // 鼠标悬浮显示
      //     // 此处的icon为标记的自定义图标
      //     // icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      //     // animation:  google.maps.Animation.DROP,
      //     width: "20px",
      //     height: "20px",
      //   });
      //   marker.setMap(map);
      //    加油! 创建搜索框
      var input = document.getElementById("pac-input");
      var options = {
        types: ["establishment"],
      };
      // 将map的bounds (viewport)属性绑定到autocomplete对象，以便自动完成请求使用请求中的bounds选项的当前映射边界。
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo("bounds", map);
      // 设置当用户选择位置时返回的数据字段
      autocomplete.setFields([
        "address_components",
        "geometry",
        "icon",
        "name",
      ]);
      var marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, 0),
      });
      autocomplete.addListener("place_changed", function () {
        // infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.log("No details available for input: '" + place.name + "'");
          return;
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        if (place.adress_components) {
          address = [
            (place.address_components[0] &&
              place.address_components[0].short_name) ||
              "",
            (place.address_components[1] &&
              place.address_components[1].short_name) ||
              "",
            (place.address_components[2] &&
              place.address_components[2].short_name) ||
              "",
          ].join(" ");
        }
      });
    },
  },
  created() {},
};
</script>
<style>
.pac-container {
  z-index: 99999;
}
</style>
<style  lang="less" scoped>
.map_box {
  width: 600px !important;
  margin-left: 50px;
  outline: none !important;
  position: relative;
  #Gmaps {
    width: 100%;
    height: 28rem;
    border-radius: 5px;
  }
  .inp_cc {
    position: absolute;
    top: 10px;
    width: 300px;
    left: 200px;
    z-index: 9999;
  }
  .myinput {
    background-color: #cccccc;
    margin: auto;
    width: 100%;
    height: 30px;
    border-radius: 10px;
    outline: none;
    border: 0;
    padding-left: 12px;
  }

  #infowindow-content .title {
    font-weight: bold;
  }

  #infowindow-content {
    display: none;
  }

  #map #infowindow-content {
    display: inline;
  }

  #title {
    color: #fff;
    background-color: #4d90fe;
    font-size: 25px;
    font-weight: 500;
    padding: 6px 12px;
  }
}
/deep/.pac-container {
  z-index: 9999 !important;
}

.conent {
  width: 120px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #ff61a1;
  color: white;
  margin: auto;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>