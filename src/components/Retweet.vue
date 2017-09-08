<template>
  <div class="w3-container">

    <div class="w3-card-4 w3-animate-right" id="id03">
        <header class="w3-container w3-teal">

          <span class="w3-padding w3-xlarge w3-display-topright" style="cursor:pointer" @click="cancelRetweet">&times;</span>

          <img src="../assets/twitter-icon2.png" alt="Reply" style="height: 50px; width: 50px;" />
        </header>

        <p>Retweet post by {{selectedTweet | selectedTweetNameFilter}} ?</p>

        <div class="w3-bar w3-center">
          <button class="w3-bar-item w3-btn w3-yellow w3-margin" title="Retweet" @click="retweet" v-if="!tweetSent">Retweet</button>
          <button class="w3-bar-item w3-btn w3-margin" style="background-color: #c3c3c3;" title="Cancel" @click="cancelRetweet" v-if="!tweetSent">Cancel</button>
          <button class="w3-bar-item w3-btn w3-orange" title="Back" @click="cancelRetweet" v-if="tweetSent">Back</button>
        </div>

        <p :class="messageClass">{{ message }}</p>

        <footer class="w3-container w3-teal">
          <span class="w3-text-white unRetweet" style="position: relative; top: 10px;" title="Unretweet" @click="unRetweet" v-if="tweetSent">Undo Retweet?</span>
          <br /><br />
        </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import filters from '../filters.js';

export default {
  filters: filters,
  computed: {
    ...mapGetters([
      'message',
      'messageClass',
      'selectedTweet',
      'tweetSent'
    ])
  },

  methods: {
    ...mapActions([
      'retweet',
      'unRetweet'
    ]),
    cancelRetweet() {
      this.$router.go(-1);
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.state.message = '';
    this.$store.state.tweetSent = false;
    next();
  }
}
</script>

<style>
.myFont {
  font-family: 'Gloria Hallelujah', cursive;
}

.isError {
  color: red;
}

.isActive {
  color: orange;
}

.unRetweet:hover {
  color: lime !important;
  cursor: pointer;
}

@media all and (min-width: 800px) {
  .w3-card-4 {
    width: 75%;
    margin: auto;
  }
}
</style>
