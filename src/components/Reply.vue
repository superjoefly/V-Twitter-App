<template>
  <div class="w3-container">

    <div class="w3-card-4 w3-animate-right" id="id03">
        <header class="w3-container w3-teal">
          <span class="w3-padding w3-xlarge w3-display-topright" style="cursor:pointer" @click="cancelReply">&times;</span>
          <p>Reply to {{selectedTweet | selectedTweetNameFilter}}</p>

          <img src="../assets/twitter-icon2.png" alt="Reply" style="height: 50px; width: 50px;" />
        </header>

        <textarea class="w3-margin w3-card-4 w3-round" rows="5" cols="50" style="width: 75%;" autofocus v-model="replyText"></textarea>

        <p :class="messageClass">{{ message }}</p>

        <footer class="w3-container w3-teal">
        <button class="w3-button w3-pale-green w3-margin" @click="reply" v-if="!tweetSent">Reply</button>
        <!-- <button class="w3-button w3-pale-green w3-margin" @click="cancelReply" v-if="!tweetSent">Cancel</button> -->
        <button class="w3-button w3-pale-green w3-margin" @click="cancelReply" v-if="tweetSent">Back</button>
          <br />
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
    ]),

    replyText: {
      get() {
        return this.$store.state.replyText;
      },
      set(value) {
        this.$store.commit('setReply', value);
      }
    }
  },

  methods: {
    ...mapActions([
      'reply'
    ]),
    cancelReply() {
      this.$router.go(-1);
      this.$store.state.message = '';
      this.messageClass.isActive = true;
      this.$store.state.tweetSent = false;
      this.replyText = '';
    }
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

@media all and (min-width: 800px) {
  .w3-card-4 {
    width: 75%;
    margin: auto;
  }
}
</style>
