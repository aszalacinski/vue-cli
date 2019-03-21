import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-http-57a0f.firebaseio.com/data.json';
// set default headers here for all requests, etc

Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if(request.method == 'POST') {
    request.method = 'PUT';
  }

  next();
})

new Vue({
  el: '#app',
  render: h => h(App)
})
