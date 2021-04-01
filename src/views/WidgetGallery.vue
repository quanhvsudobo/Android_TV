<template>
  <div v-focus-section:widgetdashboard class="widget-gallery">
    <div v-focus-section>
      <main-header />
      <div style="display:flex">
        <div class="main-navigation">
          <navigation />
        </div>
        <div id="maincontentwindow" class="main-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation";
import MainHeader from "./main-header.vue";
export default {
  name: "MainDashboard",
  components: { Navigation, MainHeader },
  props: {}
};
</script>

<style lang="scss" scoped>
.widget-gallery {
  width: $app-width !important;
  max-width: $app-width !important;
  height: $app-height !important;
  max-height: $app-height !important;
  margin: $app-margin !important;
  padding: $app-padding !important;
}

.main-content {
  overflow: auto;
  height: $router-content-height;
  width: $content-width;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.main-content::-webkit-scrollbar {
  display: none;
}

.main-navigation {
  margin-right: $nav-bar-margin-right;
  width: $nav-bar-width;
}
</style>
