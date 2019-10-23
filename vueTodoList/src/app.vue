<template>
  <div id="app">
      <Header></Header>
      <Todo></Todo>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from "./assets/todo/header.vue"
import Footer from "./assets/todo/footer.vue"
import Todo from "./assets/todo/todo.vue"
export default {
    components:{
        Header,
        Footer,
        Todo
    }
}
</script>