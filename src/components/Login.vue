<template>
  <div class="w3-container">

    <div class="w3-modal w3-animate-opacity" id="id01">
      <form class="w3-modal-content w3-card-4" action="#">
        <header class="w3-container w3-teal">
          <span class="w3-button w3-large w3-display-topright" @click="cancel">&times;</span>
          <h2>Twitter Login</h2>
          <img src="../assets/twitter-icon.png" alt="Twitter Logo" class="twitter-icon" />
        </header>

        <div class="w3-container w3-center">
          <p>Sign in to Twitter?</p>
        </div>

        <footer class="w3-container w3-teal">
        <button class="w3-button w3-pale-green w3-margin" @click="signIn">Sign In</button>
          <br />
          <a href="javascript:void(0)" @click="cancel">Cancel</a>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  export default {

    computed: {
      ...mapGetters([
        'modal'
      ])
    },

    methods: {
      ...mapActions([
        // 'login',
        'cancel',
        'signIn'
      ])
    }

  }
</script>


<style>

  .w3-button {
    border-radius: 5px;
  }

  .twitter-icon {
    width: 25%;
    height: 25%;
  }

  a {
    text-decoration: none;
  }
</style>
