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
              class='tweet-item-list'
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
                    <v-col col='2' d-flex align="end" justify="end" ><span class="time">{{passedTime(item.created_at)}}</span></v-col>
                  </v-row>
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-row class="mt-2">
                    <v-col col='4'>
                      <span d-flex align="start" justify="start" class="subheading mr-2">Expand</span>
                    </v-col>
                    <v-col col='8' d-flex align="end" justify="end" class="tweets-actions">
                      <span class="twitter-reply">
                        <i class="mr-1 fas fa-reply"></i>
                        <span class="subheading mr-2">Reply</span>
                      </span>

                      <span class="twitter-retweet">
                        <i class="mr-1 fas fa-retweet"></i>
                        <span class="subheading mr-2">Retweet</span>
                      </span>

                      <span class="twitter-favorite">
                        <i class="mr-1 fas fa-star"></i>
                        <span class="subheading mr-2">Favorite</span>
                      </span>

                      <span class="twitter-ellipsis">
                      <!-- <span class="mr-1">·</span> -->
                        <i class="mr-1 fas fa-ellipsis-h"></i>
                        <span class="subheading">More</span>
                      </span>
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

  passedTime(time) {
    // TODO get time form twitter
    return '6h';
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

.twitter-content .tweets-actions {
  color: #b7b2b2;
}

.twitter-content .screen_name {
  color: #b7b2b2;
}

.twitter-content .time {
  color: #b7b2b2;
}

.twitter-content .tweet-item-list:hover {
  background-color: rgba(0,0,0,0.03);
}

.tweets-actions .twitter-retweet:hover {
  color: rgb(244, 36, 94);
}

.tweets-actions .twitter-reply:hover {
  color: #0b1bf5;
}

.tweets-actions .twitter-favorite:hover {
  color: #f3ae2c;
}

.tweets-actions .twitter-ellipsis:hover {
  color: #0b1bf5;
}
</style>
