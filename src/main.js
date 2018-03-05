// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
Vue.prototype.zhiHuVersion = "0.1";
Vue.prototype.requestUrl = "http://localhost/api";
//Vue.prototype.requestUrl = "http://m.stormpass.cn/zhihu/php/api";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{
    hasNewVersion:function(){
       $.get("http://m.stormpass.cn/zhihu/php/version?localversion="+this.zhiHuVersion,(data,status)=>{
          try{
            data=JSON.parse(data);
            this.multiStoryDataList.push(data);
            this.btnInfo="加载更多";
          }catch(e){
            this.btnInfo="加载失败";
          }
        });
    }
  }
})
