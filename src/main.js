// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App'
import router from './router'
import IView from 'iview'
import echarts from 'echarts'
import 'iview/dist/styles/iview.css'

Vue.use(VueRouter);
Vue.use(IView);

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
  console.log(index)
}
Date.prototype.format = function() {
  var year = "" + this.getFullYear();
  var month = "" + (this.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  var day = "" + this.getDate(); if (day.length == 1) { day = "0" + day; }
  var hour = "" + this.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  var minute = "" + this.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  var second = "" + this.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
