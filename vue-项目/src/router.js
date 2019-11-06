import VueRouter from "vue-router"

import HomeContainer from './components/tabbar/HomeContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'


// 创建一个路由对象
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newlist', component: NewsList },
        //:id应为v-for渲染时采用的是item.id是一个变量,所以用:id进行匹配
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
    ],
    //覆盖默认路由高亮的类，默认的类叫做router-link-active
    linkActiveClass: 'mui-active'
})

export default router