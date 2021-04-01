<template>
  <v-app id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </v-app>
</template>

<style lang="scss">
  @import "@/assets/styles/_variables";
  @import "@/assets/styles/index";

  .theme--light.v-application {
    background-color: unset !important;
    color: unset !important;
  }
</style>
