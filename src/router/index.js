import Vue from 'vue'
import Router from 'vue-router'
import DisplayHome from '@/components/DisplayHome'
import LogManagement from '@/components/LogManagement'
import ActManagement from '@/components/ActManagement'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DisplayHome',
      component: DisplayHome
    },
    {
      path: '/log',
      name: 'log',
      component: LogManagement
    },
    {
      path: '/account',
      name: 'ActManagement',
      component: ActManagement
    },
  ]
})
