import Vue from 'vue'
import Router from 'vue-router'

import StoryView from '@/views/StoryView'
import HomeView from '@/views/HomeView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',//router-link 是跟根据name来找相应模块的
      component: HomeView
    },
    {
      path:'/story',
      name:'StoryView',
      component:StoryView
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
