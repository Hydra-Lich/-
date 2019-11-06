<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | dataFormat}}</span>
      <span>点击:{{newsinfo.click}}</span>
      </p>
      <hr>
      <div class="content" v-html="newsinfo.content">
      </div>

      <!-- 评论子组件 -->
      <div>评论组件</div>
      <comment-box id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue"
export default {
  data() {
    return {
      //将url地址中传递过来的id值挂载到data上,方标以后调用
      id: this.$route.parame.id, //获取路由地址中的ID
      newsinfo:{}
    };
  },
  created(){
      this.getNewsInfo()
  },
  methods:{
      getNewsInfo(){
          this.$http.get('api/getnew/'+this.id).then(result=>{
              if(result.body.status===0){
                  this.newsinfo=result.body.message[0]
              }else{
                  Toast("获取新闻失败");
              }
          })
      }
  },
  components:{
      'comment-box':comment
  }
};
</script>

<style lang="scss">
.newsinfo-container{
    padding: 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px,0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>