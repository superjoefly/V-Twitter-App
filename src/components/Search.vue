<template>
  <div class="w3-container w3-center">
    <h1 class="myFont">Twitter Search</h1>
    <input
      class="w3-input w3-animate-input"
      style="width: 75%; margin: auto;"
      type="text"
      v-model="term"
      @keyup.enter="search"
      @focus="removePlaceholder"
      @blur="showPlaceholder"
      :placeholder="placeholder"
      >
    <br />
    <button class="search-button" @click="search">Search</button>
    <br />
    <button class="clear-button" v-if="isResults" @click="clearResults">Clear</button>

    <div id="loader" v-show="searching"></div>
    <p :class="messageClass">{{message}}</p>


    <transition-group
      tag="ul"
      @before-enter="beforeEnter"
      @enter="enter"
      :css="false"
    >
      <li
        v-for="(tweet, index) in tweets"
        key="item"
        v-bind:data-index="index"
        @click="getTweet(tweet); viewTweet()"
      >
        <h2>{{tweet | nameFilter }}</h2>

        <img :src="tweet | imageFilter" class="thumb w3-circle" />
            <span class="clearfix"></span>

        <h4>{{tweet | screenNameFilter}}</h4>
        <p>{{tweet | textFilter}}</p>
        <span class="clearfix"></span>

        <p class="w3-left">{{tweet | createdAtFilter}}</p>

        <span class="rightArrow">&#8250;</span>
        <span class="clearfix"></span>
      </li>
    </transition-group>

  </div>
</template>



<script>


// Import mapGetter Helper
import filters from '../filters.js';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {

  // Map Filters
  filters: filters,

  // Mapped Getters
  computed: {
    ...mapGetters([
      'placeholder', // working
      'selectedTweet', // working
      'tweets', // working
      'isResults',
      'searching', // working
      'message', // working
      'messageClass' // working
    ]),
    // So we can use v-model on the 'term' property
    term: {
      get() {
        return this.$store.state.term;
      },
      set(value) {
        this.$store.commit('updateTerm', value);
      }
    }
  },

  // Mapped Actions
  methods: {
    ...mapActions([
      'showAnimation', // working
      'removePlaceholder', // working
      'showPlaceholder', // working
      'search', // working
      'getTweet',
      'clearResults'
    ]),

    // Push to Router
    viewTweet() {
      this.$router.push({name: 'Tweet',
      params: {
        username: this.$options.filters.selectedTweetNameFilter(this.selectedTweet)
      }
    });
    },

    // Transition-Velocity Animations
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el,done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, 'transition.bounceIn');
      }, delay)
    }
  }
}
</script>



<style scoped>

.myFont {
  font-family: 'Gloria Hallelujah', cursive;
}

.search-button {
  background-color: #47a39e;
  color: beige;
  text-align: center;
  font-size: 20px;
  transition: all 0.2s ease;
  width: 50%;
  margin: auto;
  border: none;
  border-radius: 5px;
}

.search-button:hover {
  background-color: #375653;
  color: white;
}

.clear-button {
  margin: 20px;
  color: white;
  background-color: orange;
  border: 0;
  font-size: 20px;
  border-radius: 5px;
}

.clear-button:hover {
  background-color: #d36804;
}

.w3-input {
  background-image: url(../assets/search-icon.png);
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 5px;
  text-align: center;
}

ul h2 {
  text-align: center;
  position: relative;
}

ul {
  padding: 0;
  width: 75%;
  text-align: left;
  margin: auto;
}

@media all and (max-width: 600px) {
  ul {
    width: 100%;
  }
  .search-button {
    width: 100%;
  }
}

ul li {
  list-style-type: none;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
}

.thumb {
  display: block;
  margin: auto;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

h4 {
  color: #47A39E;
}

#loader {
  position: absolute;
  top: 70%;
  left: 50%;
  margin-left: -35px;
  z-index: 1;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border-top: 10px solid blue;
  border-bottom: 10px solid orange;

  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

.isError {
  color: red;
}

.isActive {
  color: orange;
}

.rightArrow {
  float: right;
  font-size: 50px;
  color: #47A39E;
}

.rightArrow:hover {
  color: orange;
}
</style>
