import Vue from 'vue'
import App from './App.vue'

// global filter
Vue.filter('to-lowercase');

new Vue({
  el: '#app',
  render: h => h(App)
})
