// Import Vue and Vuex
import Vue from 'vue';
import Vuex from 'vuex';

// Import QueryString
import QueryString from '../scripts/querystring.js';

// Import Getters, Mutations and Actions
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

// Tell Vue to use Vuex
Vue.use(Vuex);

// State holds data state
export const store = new Vuex.Store({
  state: {
    term: '',
    placeholder: 'Enter a topic...',

    tweets: [],
    selectedTweet: undefined,

    isResults: false,

    needLogin: false,
    loginMessage: '',

    showHome: false,

    searching: false,
    message: '',
    messageClass: {
      'isActive': true,
      'isError': false
    },
    selectedTweetDate: null,
    timeResult: '',

    modal() {
      return document.getElementById("id01");
    },

    key: '**********',
    secret: '****************'

    oauth_token : QueryString.oauth_token,
    oauth_verifier : QueryString.oauth_verifier,

    saveTokens(oauth_token, oauth_token_secret) {
      localStorage.setItem('oauth_token', oauth_token);
      localStorage.setItem('oauth_token_secret', oauth_token_secret);
      console.log('tokens saved!');
    },

    clearTokens() {
      localStorage.clear();
      console.log("Tokens cleared!");
    },

    saveUserName(screen_name) {
      localStorage.setItem('screen_name', screen_name);
      console.log("user name saved!");
    },
    loggedInUser: null,

    postText: '',
    replyText: '',
    screenName: '',

    tweetSent: false,
    remove: false,
    following: false,
    title: 'Follow',
    selectedImage: null
  },

  // Register Getters, Mutations and Actions
  getters,
  mutations,
  actions
});

// Make 'store' accessible from window object
window.store = store;
