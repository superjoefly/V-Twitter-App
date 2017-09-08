<template>
  <div class="w3-container">

    <div class="w3-card-4 w3-animate-bottom" id="id02">
        <header class="w3-container w3-teal">
          <span class="w3-padding w3-xlarge w3-display-topright" style="cursor:pointer" @click="cancelPost">&times;</span>

          <h2 class="myFont">Post to Twitter</h2>

          <img src="../assets/twitter-icon2.png" alt="Twitter Logo" style="height: 50px; width: 50px;" />
        </header>

        <textarea class="w3-margin w3-card-4 w3-round" rows="8" cols="50" style="width: 85%;" autofocus v-model="postText" @keydown="clearMessage"></textarea>

        <!-- <input type="file" @change="encodeImageFileAsURL" accept="image/*"/> -->

        <p :class="messageClass">{{ message }}</p>

        <footer class="w3-container w3-teal">
        <button class="w3-button w3-pale-green w3-margin" @click="post" v-if="!tweetSent">Post</button>
        <button class="w3-button w3-pale-green w3-margin" @click="cancelPost" v-else>Back</button>
          <br />
        </footer>
        <!-- <img src="" /> -->
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {

  computed: {
    ...mapGetters([
      'message',
      'messageClass',
      'selectedImage',
      'tweetSent'
    ]),

    postText: {
      get() {
        return this.$store.state.postText;
      },
      set(value) {
        this.$store.commit('setPost', value);
      }
    }
  },

  methods: {
    ...mapActions([
      'post'
    ]),
    cancelPost() {
      this.$router.go(-1);
      this.$store.state.message = '';
      this.messageClass.isActive = true;
      this.$store.state.tweetSent = false;
    },
    clearMessage() {
      this.$store.state.message="";
    }
  //   encodeImageFileAsURL(e) {
  //     let input = event.target;
  //     if (input.files && input.files[0]) {
  //       let file = input.files[0];
  //       let reader = new FileReader()
  //       reader.onloadend = function() {
  //         window.store.state.selectedImage = reader.result.substr(reader.result.indexOf(',') + 1);
  //       }
  //       reader.readAsDataURL(file);
  //     }
  //  }
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
</style>
