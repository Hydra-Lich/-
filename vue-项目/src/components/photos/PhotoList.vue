<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <!-- 顶部滑动条区域 -->
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in actes"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
          <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo'+item.id" tag="li">
            <img v-lazy="item.img_url" />
            <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <div class="info-body">{{item.zhaiyao}}</div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//1、只要与用户操作相关的都是JS组件，需要进行组件初始化操作
//导入mui的js文件
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当组件中的DOM结构渲染到页面时，就会执行这个元素
    //初始化滑动空间，必须渲染完之后才进行初始化，不然还没有元素无法初始化
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      //获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //手动拼接出一个最完整的分类列表
          result.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      //根据分类id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style  lang="scss" scoped>
/* 使滑动组件的时候提高流畅度，且不报错 */
* {
  touch-action: pan-x;
}
.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
  li {
    background-color: #ccc;
    text-align: center;
    margin: 10px;
    margin-bottom: 0;
    box-shadow: 0 0 6px #999;
    position: relative; 
    img{
        width: 100%;
        vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        max-height: 84px;
        .info-title{
            font-size: 14px
        }
        .info-body{
            font-size: 13px
        }
    }
  }
}
</style>