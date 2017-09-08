<template>
  <div style="margin-top: -10px;">

      <div class="w3-container card-container" style="margin: 20px auto;">
        <transition
          name="zoomIn"
          enter-active-class="animated zoomIn"
        >
          <div class="w3-card-4 w3-teal w3-round" v-if="show">

            <span class="leftArrow" title="Back" @click="goBack">&#8249;</span>

            <!--  Follow Button -->
            <label class="switch" :title="title">
              <input type="checkbox" id="follow" v-model="following" @click="follow" />
              <span class="slider round"></span>
            </label>

            <header class="w3-container">
              <h3 class="myFont" style="margin-top: -30px;">{{selectedTweet | selectedTweetNameFilter}}</h3>
            </header>
            <div class="w3-container">
              <img :src="selectedTweet | selectedTweetImageFilter" class="w3-circle" />


              <p>{{timeResult}} ago</p>

              <img
                v-if="selectedTweet.extended_entities"
                :src="selectedTweet | selectedTweetMediaFilter"
                style="width: 100%" />

              <p>{{selectedTweet | selectedTweetTextFilter}}</p>
            </div>

            <div class="w3-center">
              <div class="w3-bar">
                <i class="fa fa-reply" aria-hidden="true" @click="goReply"></i>
                <i class="fa fa-paper-plane" aria-hidden="true" @click="goRetweet"></i>
                <i class="fa fa-thumbs-up" aria-hidden="true" @click="goFavorite"></i>
              </div>

              <span class="w3-text-white unPost" title="Unpost" @click="unPost" v-if="remove">Remove?</span>
            </div>
          </div>
        </transition>
      </div>
  </div>

</template>

<script>

// Import mapGetter Helper
import filters from '../filters.js';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {

  data() {
    return {
      show: false
    }
  },

  filters: filters,

  computed: {
    ...mapGetters([
      'placeholder', // working
      'selectedTweet', // working
      'tweets', // working
      'searching', // working
      'message', // working
      'messageClass',
      'timeResult',
      'tweetSent',
      'remove',
      'following',
      'title'
    ])
  },

  methods: {
    ...mapActions([
      'showAnimation', // not sure
      'removePlaceholder', // working
      'showPlaceholder', // working
      'search', // not sure
      'showTweet',
      'unPost',
      'follow'
    ]),

    goBack() {
        this.$router.go(-1);
        this.$store.state.remove = false;
        this.$store.state.message="";
    },
    goReply() {
      this.$router.push({name: 'Reply'});
    },
    goRetweet() {
      this.$router.push({name: 'Retweet'});
      if (this.selectedTweet.retweeted) {
        this.$store.state.message = 'You already retweeted this tweet!';
        this.$store.state.tweetSent = true;
      }
    },
    goFavorite() {
      this.$router.push({name: 'Favorite'});
      if (this.selectedTweet.favorited) {
        this.$store.state.message = 'You already favorited this tweet!';
        this.$store.state.tweetSent = true;
      }
    }
  },
  mounted() {
    this.show = true;
  },
  beforeRouteLeave(to, from, next) {
    this.following = false;
    next();
  }
}

</script>

<style scoped>
.myFont {
  font-family: 'Gloria Hallelujah', cursive;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

@media all and (min-width: 600px) {
  .card-container {
    width: 75%;
  }
}


@media all and (min-width: 800px) {
  .card-container {
    width: 50%;
  }
 }

.leftArrow {
 font-size: 60px;
 color: white;
 cursor: pointer;
 float: left;
 position: relative;
 top: -30px;
 left: 10px;
}

.leftArrow:hover {
 color: orange;
}

.unPost {
  position: relative;
  bottom: 15px;
}

.unPost:hover {
  color: lime !important;
  cursor: pointer;
}

/*Slider Button*/

.switch {
  float: right;
  margin: 10px;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 0;
  bottom: 0;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translate(20px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.fa {
  padding: 20px;
}


</style>
