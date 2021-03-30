<template>
  <div class="fl-v-aic">
    <h2>{{ message }}</h2>

    <div class="flex-grid">
      <ItemApp
        class="col"
        label="Dog Tracker"
        icon="dog"
        v-on:click.native="navigateTo('Dog Tracker', 0)"
      />

      <ItemApp
        class="col"
        label="Facebook"
        icon="facebook"
        v-on:click.native="navigateTo('Facebook', 1)"
      />
      <ItemApp
        class="col"
        label="Twitter"
        icon="twitter"
        v-on:click.native="navigateTo('Twitter', 2)"
      />
      <ItemApp
        class="col"
        label="Google"
        icon="google"
        v-on:click.native="navigateTo('Google', 3)"
      />
      <ItemApp
        class="col"
        label="Email"
        icon="envelope"
        v-on:click.native="navigateTo('Email', 4)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";
import ItemApp from "@/components/items/ItemApp.vue";
import router from "@/router/index";
@Component({
  components: {
    ItemApp,
  },
})
export default class AppsList extends Vue {
  @Prop() message!: string;

  navigateTo(message: string, type: number) {
    console.log("navigateTo called", type);

    switch (type) {
      case 0: //DogTracker
        break;
      case 1: //Facebook
        break;
      case 2: //Twitter
        router.push("/twitter");
        break;
      case 3: //Google
        break;
      case 4: //Email
        break;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nowrap {
  margin: 0 auto;
  max-width: 100%;
  width: 600px;
  display: flex;
  background-color: #141414;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  border-radius: 0.8em;
}
.fl-wrap {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 33.3333%;
  flex-basis: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-grid {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
}

.flex-grid .col {
  flex: 1;
  text-align: center;
  background-color: #141414;
}
</style>
