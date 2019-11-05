<template>
  <div>
      <h3>新闻详情</h3>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //将url地址中传递过来的id值挂载到data上,方标以后调用
            id:this.$route.parame.id//获取路由地址中的ID
        }
    },
}
</script>

<style>

</style>