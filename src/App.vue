<template>

  <div class="w3-center">

      <!-- Render Header Component -->
    <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
    </transition>

  </div>

</template>

<style>
/*starting state for enter*/
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
