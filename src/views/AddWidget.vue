<template>
  <div class="fl-v-aic" style="overflow: auto; max-height: 100vh">
    <h2>{{ message }}</h2>
    <!-- <div v-focus id="addButton" v-on:click="navigateTo">
      <ic-plus-solid width="100" height="100" />
    </div> -->

    <v-btn class="mx-4" fab dark color="indigo" v-on:click="navigateTo">
      <i
        v-bind:class="[activeClass, errorClass]"
        style="width: 50px; height: 50px"
      />
    </v-btn>

    <v-btn
      depressed
      color="error"
    >
      Error
    </v-btn>

    <h2 v-if="home_timelines.length">Home timelines api</h2>
    <v-container class="twitter-content">
      <v-row>
        <v-list three-line>
          <template v-for="(item, index) in home_timelines">
            <v-list-item
              :key="item.id"
            >
              <v-list-item-avatar size='50' rounded="false">
                <v-img :src="item.user.profile_image_url"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col col='10'>
                      <b>{{item.user.name}}</b> <span class="screen_name">@{{item.user.screen_name}}</span>
                    </v-col>
                    <v-col col='2' d-flex align="end" justify="end" ><span class="time">6h</span></v-col>
                  </v-row>
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-row class="mt-2">
                    <v-col col='4'>
                      <span d-flex align="start" justify="start" class="subheading mr-2">Expand</span>
                    </v-col>
                    <v-col col='8' d-flex align="end" justify="end" class="tweets-actions">
                      <i class="mr-1 fas fa-reply"></i>
                      <span class="subheading mr-2">Reply</span>

                      <i class="mr-1 fas fa-retweet"></i>
                      <span class="subheading mr-2">Retweet</span>

                      <i class="mr-1 fas fa-star"></i>
                      <span class="subheading mr-2">Favorite</span>

                      <span class="mr-1">·</span>
                      <i class="mr-1 fas fa-ellipsis-h"></i>
                      <span class="subheading">More</span>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-row>
    </v-container>
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
    console.log(this.home_timelines);
  }

  navigateTo() {
    router.push("appslist");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-sheet.v-card {
  border-radius: unset !important;
}

.v-avatar {
  border-radius: unset !important;
}

.twitter-content {
  max-width: 50%;
  display: flex;
  justify-content: center;
}

.twitter-content .tweets-actions {
  color: #b7b2b2;
}

.twitter-content .screen_name {
  color: #b7b2b2;
}

.twitter-content .time {
  color: #b7b2b2;
}

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
