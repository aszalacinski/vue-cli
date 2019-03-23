import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";
import globalAxios from "axios";
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    email: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
      state.email = userData.email;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
      state.email = null;
      state.user = null;
    }
  },
  actions: {
    setLogoutTimer({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
        router.replace('/signin');
        // emit a logout event and have a global component handle the redirect
        //this._vm.$emit('logout-event');
      }, expirationTime * 1000);
      
    },
    signup({ commit, dispatch }, authData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/signupNewUser?key=AIzaSyBkrpRnt9-7D3wv9yEe8EIV3IUZfYpeZOY", {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            console.log(res);
            dispatch('setLogoutTimer', res.data.expiresIn);
            commit("authUser", {
              token: res.data.idToken,
              userId: res.data.localId,
              email: authData.email
            });
            
            const now = new Date();
            const expirationDate = new Date(now.getTime() + (res.data.expiresIn * 1000));
            
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expiresIn', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('email', authData.email);
            
            dispatch("storeUser", authData)
            .then(resolve());
          })
          .catch(error => {
            console.log(error)
            reject(error);
          });
      });
    },
    login({ commit, dispatch }, authData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/verifyPassword?key=AIzaSyBkrpRnt9-7D3wv9yEe8EIV3IUZfYpeZOY", {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            console.log(res);
            dispatch('setLogoutTimer', res.data.expiresIn);
            commit("authUser", {
              token: res.data.idToken,
              userId: res.data.localId,
              email: authData.email
            });

            const now = new Date();
            const expirationDate = new Date(now.getTime() + (res.data.expiresIn * 1000));
            
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('email', authData.email);

            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      });
    },
    tryAutoLogin({commit}) {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        if(!token) {
          reject(new Error('No token stored; need to login'));
          return;
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if(now >= expirationDate) {
          reject(new Error('Token is expired; need to login'));
          return;
        }

        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');

        commit('authUser', {
          token: token,
          userId: userId,
          email: email
        });
        resolve();
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('clearAuthData');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        resolve();
      })
    },
    storeUser({ commit, state }, userData) {
      new Promise((resolve, reject) => {
        if (!state.idToken) {
          reject(new Error('Must login'));
          return;
        }
        globalAxios
          .post("/users.json" + '?auth=' + state.idToken, userData)
          .then(res => {
            console.log(res);
            resolve();
          })
          .catch(error => {
            console.log(error)
            reject(new Error('Error with storeUser'));
          });
      });
      
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get("/users.json" + '?auth=' + state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users);
          // get user by email
          const authUser = users.find(user => user.email === state.email);

          commit("storeUser", authUser);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null
    }
  }
});
