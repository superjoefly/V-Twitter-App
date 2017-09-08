import Vue from 'vue';
import App from './App.vue';


import Router from 'vue-router';
Vue.use(Router);

// Import 'routes' which holds routes
import {routes} from './routes.js';

const router = new Router({
  mode: 'history',
  routes
});

router.replace({path: '/home', redirect: '/'});


// Import 'store' const which holds Vuex.Store
import {store} from './store/store.js';


// Register store as property on root instance
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
