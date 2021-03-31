<template>
  <v-container fluid grid-list-lg>
    <div class="fl-v-aic">
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
          class="elevation-1"
        >
          <template v-slot:item.home_timelines="{ item }">
            <v-chip dark>
              {{home_timelines.map(function(x) {return x.id; }).indexOf(item.id)}}
            </v-chip>
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
    { text: "ID", value: 'id' },
    { text: "User's name", value: 'name' },
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ddd;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f24f;}

tr:hover {background-color: rgba(221, 221, 221, 0.048);}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;  
  color: white;
}

.text-center {
  text-align: center;
}
</style>
