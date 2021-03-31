<template>
  <v-container fluid grid-list-lg class="add-widget">
    <div class="fl-v-aic overflow-y-auto">
      <h2>{{ message }}</h2>
      <div
        id="addButton"
        v-on:click="navigateTo"
      >
        <ic-plus-solid width="100" height="100" />
      </div>

      <div v-if="home_timelines.length">
        <h2 class="text-center">Home timelines api</h2>

        <v-data-table
          :headers="headers"
          :items="home_timelines"
          :items-per-page="10"
          class="home_timelines overflow-y-auto"
        >
          <template v-slot:item.sn="{ index }">
            {{ index + 1 }}
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";
import icPlusSolid from "@/components/icons/icPlusSolid.vue";
import router from "@/router/index";
import twitter from "@/auths/twitterauth/twitter";
import store from "@/auths/twitterauth/store";

let axios = require('axios');

@Component({
  components: {
    icPlusSolid,
  },
})
export default class AddWidget extends Vue {
  @Prop() message!: string;

  private home_timelines: any = [];
  private headers: any = [
    { text: "No.", value: 'sn' },
    { text: "User's name", value: 'user.name' },
    { text: 'Content', value: 'text' },
    { text: 'Created', value: 'created_at' },
  ];

  async mounted() {
    twitter.home_timeline();
    this.home_timelines = store.tweets;
  }

  navigateTo() {
    router.push("appslist");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.add-widget .overflow-y-auto {
  height: 100vh;
  overflow-y: scroll;
}

.home_timelines {
  margin: 10px;
}

.text-center {
  text-align: center;
}
</style>
