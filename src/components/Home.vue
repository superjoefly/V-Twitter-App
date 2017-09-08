<template>
  <div class="w3-container" v-if="showHome">

    <button class="w3-button w3-center w3-text-teal refresh" title="Refresh" @click="refresh"><i class="fa fa-refresh" v-if="`${tweets}`"></i></button>

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

        <h2 class="myFont w3-text-teal">{{tweet | nameFilter }}</h2>

        <img :src="tweet | imageFilter" class="thumb w3-circle" />
            <span class="clearfix"></span>

        <h4 class="w3-text-teal">{{tweet | screenNameFilter}}</h4>
        <p>{{tweet | textFilter}}</p>
            <span class="clearfix"></span>

        <p class="w3-left">{{tweet | createdAtFilter}}</p>

        <span class="clearfix"></span>
        <span class="rightArrow" title="View Tweet">&#8250;</span>
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
        'selectedTweet', // working
        'tweets', // working
        'searching', // working
        'message', // working
        'messageClass', // working
        'showHome',
        'postDate',
        'favorited'
      ])
    },

    // Mapped Actions
    methods: {
      ...mapActions([
        'showAnimation', // not sure
        'getTweet',
        'loginCheck'
      ]),

      refresh() {
        this.tweets.splice(0, this.tweets.length);
        this.loginCheck();
      },

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
    },

}


</script>

<style scoped>

ul h2 {
  text-align: center;
  position: relative;
}

.myFont {
  font-family: 'Gloria Hallelujah', cursive;
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

.refresh:hover {
  background-color: transparent !important;
  color: orange !important;
}
</style>
