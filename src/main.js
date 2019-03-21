import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-http-57a0f.firebaseio.com/';
// set default headers here for all requests, etc

Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if(request.method == 'POST') {
    request.method = 'PUT';
  }
  next(response => {
    // override json method - BE CAREFUL - contrived example
    response.json = () => { return { messages: response.body } }
  });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
