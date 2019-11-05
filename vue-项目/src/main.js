//入口文件
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//按需导入组件，注册组件
import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import router from './router.js'
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})