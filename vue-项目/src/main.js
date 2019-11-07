//入口文件
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入时间格式化插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root="https://www.easy-mock.com/mock/5dc2c979678bf1201817c79e/vue.studyit.io"
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlenconded
Vue.http.options.emulateJSON=true;

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//按需导入组件，注册组件
// import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import router from './router.js'
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})