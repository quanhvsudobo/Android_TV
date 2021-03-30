<template>
  <div class="fl-v-aic">
    <h2>{{ message }}</h2>
    <div
      v-focus
      id="addButton"
      v-on:click="navigateTo"
    >
      <ic-plus-solid width="100" height="100" />
    </div>

    <h2>Home timelines api</h2>
    <table width="90%" class="table table-striped ">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">User's name</th>
          <th scope="col">Content</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tr :value="index" v-for="(item, index) in home_timelines" :key="index">
        <td>{{index + 1}}</td>
        <td>User's name</td>
        <td v-html='item.text'></td>
        <td>{{item.created_at}}</td>
      </tr>
    </table>
  </div>
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
  data () {
    return {
      home_timelines: [],
    }
  }

  async mounted() {
    twitter.home_timeline();
    this.home_timelines = store.tweets;
    console.log(store.tweets);
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
  color: #42b983;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2;}

tr:hover {background-color: #ddd;}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
