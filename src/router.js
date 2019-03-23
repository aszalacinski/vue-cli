import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store';

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard', 
    name: 'dash',
    component: DashboardPage, 
    beforeEnter (to, from, next) {
      if(store.state.idToken) {
        next();
      } else {
        next('/signin');
      }
    }
    
  }
]

const router = new VueRouter({ mode: 'history', routes });


export default router;