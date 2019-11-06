<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <!-- maxlength设置最多输入120个字符 -->
    <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-tiem" v-for="(item,i) in comments" :key="item.add_time">
        <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户名：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}</div>
        <div class="cmt-body">{{item.content==='undefined'?'此用户很懒，什么也没留下':item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页数据
      comments:[]//所有的评论数据
    };
  },
  props: ["id"],
  created(){
      this.getComment()
  },
  methods: {
    getComment() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            //   this.comments=result.body.message
            //获取新数据后，将老数据拼接上新请求的数据
              this.comments=this.comments.concat(result.body.message)
          } else {
            Toast("获取新闻评论失败");
          }
        });
    },
    getMore(){
        this.pageIndex++;
        this.getComment()
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px, 0;
    .cmt-tiem {
      font-size: 13px;
      .cmt-title {
        background-color: #ccc;
        line-height: 35px;
      }
      .cmt-body {
        text-indent: 2em;
      }
    }
  }
}
</style>