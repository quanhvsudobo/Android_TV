<template>
  <div class="fl-v-aic" style="overflow: auto; max-height: 100vh">
    <h2>{{ message }}</h2>
    <!-- <div v-focus id="addButton" v-on:click="navigateTo">
      <ic-plus-solid width="100" height="100" />
    </div> -->

    <div class="primary-button" v-on:click="navigateTo">
      <i
        v-bind:class="[activeClass, errorClass]"
        style="width: 50px; height: 50px"
      />
    </div>

    <h2 v-if="home_timelines.length">Home timelines api</h2>
    <table width="90%" class="table table-striped" v-if="home_timelines.length">
      <thead class="thead-light">
        <tr>
          <th scope="col">TweetId</th>
          <th scope="col">User's name</th>
          <th scope="col">Content</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tr :value="index" v-for="(item, index) in home_timelines" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.user.name }}</td>
        <td v-html="item.text"></td>
        <td>{{ item.created_at }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";
import icPlusSolid from "@/components/icons/icPlusSolid.vue";
import ItemApp from "@/components/items/ItemApp.vue";

import router from "@/router/index";
import twitter from "@/auths/twitterauth/twitter";
import store from "@/auths/twitterauth/store";

let axios = require("axios");

@Component({
  components: {
    icPlusSolid,
    ItemApp,
  },
})
export default class AddWidget extends Vue {
  public activeClass = "fa";
  public errorClass = "fa-plus";

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

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f24f;
}

tr:hover {
  background-color: rgba(221, 221, 221, 0.048);
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: white;
}
.item-inner {
  max-width: 100%;
  max-height: 100%;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.082);
}
</style>
