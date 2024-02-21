<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="dashboard">
      <!-- Place your elements here -->
    </div>
  </transition>
</template>

<style lang="scss" scope>
@import "./styles/Dashboard.scss";
</style>
