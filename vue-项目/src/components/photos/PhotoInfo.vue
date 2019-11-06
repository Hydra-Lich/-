<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
//1、导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list:[//缩略图的数组

      ]
    };
  },
  created() {
    this.getPhototInfo();
  },
  methods: {
    getPhototInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs(){
        this.$http.get('api/getthumimages/'+this.id).then(result=>{
            if(result.body.status===0){
                //循环每个图片数据，为数据补全组件渲染需要的数据
                result.body.message.forEach(item=>{
                    item.w=600;
                    item.h=400;
                })
                //把完整的数组保存到list
            }
        })
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 14px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
.thumbs{
    margin: 10px;
    box-shadow: 0 0 9px #999;
}
</style>