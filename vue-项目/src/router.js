import VueRouter from "vue-router"


// 创建一个路由对象
var router = new VueRouter({
    routes:[
    ],
     //覆盖默认路由高亮的类，默认的类叫做router-link-active
    linkActiveClass: 'mui-active'
})

export default router