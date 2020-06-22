import Vue from "vue";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from "./App.vue";
import router from "./router/index.js";
import * as firebase from "firebase";
import store from "./store";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDwCA3caBbSHFnMBEBo9shb-7nvI4X8EGw",
  authDomain: "otoklaus.firebaseapp.com",
  databaseURL: "https://otoklaus.firebaseio.com",
  projectId: "otoklaus",
  storageBucket: "otoklaus.appspot.com",
  messagingSenderId: "1073949109038",
  appId: "1:1073949109038:web:c37872294260264e2d28bf"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");