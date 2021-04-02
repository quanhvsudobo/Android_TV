<template>
  <div class="fl-v-aic" style="overflow: auto; max-height: 100vh">
    <h2>{{ message }}</h2>
    <!-- <div v-focus id="addButton" v-on:click="navigateTo">
      <ic-plus-solid width="100" height="100" />
    </div> -->

    <div class="edit-add">
      <div class="operation-buttons">
        <div class="addBtn oval" v-focus v-on:click="navigateTo"></div>
      </div>
    </div>

    <h2 class="mb-4" v-if="home_timelines.length">Twitter Timelines</h2>
    <v-container class="twitter-content mt-4">
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
                <v-list-item-title class="tweets-title">
                  <b>{{item.user.name}}</b> 
                  <span class="screen_name">@{{item.user.screen_name}}</span> 
                  <span>&#183;</span>
                  <span class="time">{{passedTime()}}</span>
                </v-list-item-title>
                <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-row class="mt-2">
<!--                     <v-col col='4'>
                      <span d-flex align="start" justify="start" class="subheading mr-2">Expand</span>
                    </v-col> -->
                    <v-col col='3' d-flex align="start" justify="start" class="tweets-actions">
                      <span class="twitter-reply">
                        <i class="mr-1 fas fa-comment"></i>
                        <span class="subheading mr-2">0</span>
                      </span>
                    </v-col>
                    <v-col col='3' d-flex align="start" justify="start" class="tweets-actions">
                      <span class="twitter-retweet">
                        <i class="mr-1 fas fa-retweet"></i>
                        <span class="subheading mr-2">{{ item.retweet_count }}</span>
                      </span>
                    </v-col>
                    <v-col col='3' d-flex align="start" justify="start" class="tweets-actions">
                      <span class="twitter-favorite">
                        <i class="mr-1 fas fa-heart"></i>
                        <span class="subheading mr-2">{{item.favorite_count}}</span>
                      </span>
                    </v-col>
                    <v-col col='3' d-flex align="start" justify="start" class="tweets-actions">
                      <span class="twitter-ellipsis">
                      <!-- <span class="mr-1">·</span> -->
                        <i class="mr-1 fas fa fa-upload"></i>
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

  passedTime() {
    // TODO get time form twitter
    return '6h';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.fl-v-aic::-webkit-scrollbar {
  display: none;
}

.main-navigation {
  margin-right: $nav-bar-margin-right;
  width: $nav-bar-width;
}

.twitter-content .v-list {
  font-size: 1.4em;
  background-color: unset !important;
}

.twitter-content .tweets-actions {
  color: #b7b2b2;
}

.twitter-content .screen_name {
  color: rgb(91, 112, 131);
}

.twitter-content .time {
  color: rgb(91, 112, 131);;
}

.twitter-content .tweet-item-list {
  border-radius: $border-radius;
  background-color: #fff;
  padding: 2em 2em 1em 2em;
  margin-bottom: 2em;
}

.twitter-content .tweet-item-list:hover {
  background-color: #f7f9fa;
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

.tweets-actions span {
  width: 25%;
}

.twitter-content .tweets-title span {
  color: #0b1bf5;
  margin-left: 5px;
}

.addBtn {
  background-image: url("/images/icon-action-add-default.svg");
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 35px;
  margin-top: 35px;
}

.addBtn:hover {
  cursor: copy;
  background-color: rgba(255, 255, 255, 0.3);
}

.oval {
  width: 83px;
  height: 83px;
  padding: 0 0.2px 0.2px 0;
  object-fit: contain;
  border-radius: 50%;
  border: solid 1.8px #ffffff;
  &:focus {
    border: solid 1.8px $magenta-color;
    background-color: $magenta-color;
  }
}


</style>
