<template lang="html">
  <div>

    <!-- Navbar -->
    <div class="w3-bar w3-teal" style="width: 100%;">
      <router-link
        @click.native="refresh"
        :to="{name:'Home'}"
        class="w3-bar-item"
        title="Home"
        ><i class="fa fa-home"></i>
      </router-link>

      <router-link
        :to="{name: 'Post'}"
        class="w3-bar-item w3-left"
        title="Post"
        @click.native="goPost($router)"
      >
      <i class="fa fa-pencil"></i>
      </router-link>

      <span class="loggedInUser">{{loggedInUser}}</span>

      <i class="fa fa-sign-out w3-right w3-bar-item" style="cursor:pointer" title="Logout" @click="logOut"></i>

      <router-link
        :to="{name: 'Search'}"
        class="w3-bar-item w3-right"
        title="Search"
        @click.native="goSearch"
        ><i class="fa fa-search"></i>
      </router-link>
    </div>

    <!-- Login Message -->
    <p :class="messageClass">{{loginMessage}}</p>

    <!-- Login Button -->
    <button v-if="needLogin" class="w3-button w3-center w3-green" @click="login">Login</button>

    <!-- Render Login Component -->
    <app-login></app-login>




    <!-- Render Home, Search and Tweet Components -->
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import Login from './Login.vue';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {

  components: {
    'app-login': Login
  },

  computed: {
    ...mapGetters([
      'loginMessage',
      'messageClass',
      'message',
      'needLogin',
      'tweets',
      'isResults',
      'loggedInUser',
      'showHome'
    ])
  },

  methods: {
    ...mapActions([
      'loginCheck',
      'login',
      'clearResults',
      'logOut',
      'goPost'
    ]),
    refresh() {
      window.store.commit('loginCheck');
    },

    // Pass router as part of action payload?
    goSearch() {
      this.$router.push({name: 'Search'});
      this.clearResults();
      this.$store.state.message = '';
    }
  }
}

// Commit 'loginCheck' using window.onload
window.onload = function() {
  window.store.commit('loginCheck')
}
</script>

<style lang="css">
.router-link-exact-active {
  background-color: rgb(0, 121, 110);
}

.w3-bar-item {
  border-radius: 0px !important;
}

.fa {
  font-size: 24px;
}

@media all and (max-width: 400px) {
  .fa {
    font-size: 20px;
  }
}

.fa:hover {
  color: orange;
}

div.w3-bar {
  margin-bottom: 10px;
}

.isError {
  color: red;
}

.isActive {
  color: orange;
}

.loggedInUser {
  font-size: 20px;
  position: relative;
  top: 5px;
}

/*Fade Transition*/

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/*active state for enter*/
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}

/*active state for leave*/
.fade-leave-active {
  opacity: 0;
  transition: all 0.5s;
}
</style>
