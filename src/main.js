import Vue from 'vue'
import App from './App.vue'

// global filter
Vue.filter('toLowercase', function(value) {
  return value.toLowerCase();
});

// global mixin - gets added to ALL components - use rarely (or if making third party plugin for Vue.js)
Vue.mixin({
  created() {
    console.log('Global mixin - created hook');
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
