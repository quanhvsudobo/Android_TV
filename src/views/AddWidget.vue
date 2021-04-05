<template>
  <div v-focus-section:addwidget class="fl-v-aic" style="overflow: auto; max-height: 100vh">
    <h2>{{ message }}</h2>
    <!-- <div v-focus id="addButton" v-on:click="navigateTo">
      <ic-plus-solid width="100" height="100" />
    </div> -->

    <div v-focus-section:addbutton class="edit-add">
      <div class="operation-buttons">
        <div class="addBtn oval" v-focus @sn:enter-up="navigateTo"></div>
      </div>
    </div>

    <v-card v-focus-section:userinfo class="mx-auto mb-4 user-information" max-width="60%" tile v-if="current_user">
      <v-row v-focus align="end" class="p-1">
        <v-col align-self="start" class="pa-0 avatar" cols="2" md="2" sm="4">
          <v-avatar color="" size="60" tile>
            <v-img :src="current_user.profile_image_url"></v-img>
          </v-avatar>
        </v-col>
        <v-col align-self="start" class="pa-0" cols="10" md="10" sm="8">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">{{current_user.name}} <span class="screen_name">(@{{current_user.screen_name}})</span></v-list-item-title>
              <v-list-item-subtitle>TwiterID: {{current_user.id}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <div @sn:enter-up="twiterLogout" v-focus class="radius rounded pa-4 text-center logout-button text-no-wrap" v-if="home_timelines.length" >
            <font-awesome-icon :icon="['fa', 'sign-out-alt']" style="font-size: 30px; cursor: pointer;" />
          </div>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <!-- <v-list-item-title class="title">{{current_user.name}}</v-list-item-title> -->
              <!-- <v-list-item-title>TwiterID: {{current_user.id}}</v-list-item-title> -->
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>

    <h2 class="mb-2" v-if="home_timelines.length">Twitter Timelines</h2>

    <v-container v-focus-section:hometweets class="twitter-content mt-4">
      <v-row>
        <v-list three-line>
          <template v-for="(item, index) in home_timelines">
            <v-list-item
              :key="item.id"
              class='tweet-item-list'
              v-focus
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
      <v-row class="footer">
        <!-- Footer here -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";
// import icPlusSolid from "@/components/icons/icPlusSolid.vue";
// import ItemApp from "@/components/items/ItemApp.vue";

import router from "@/router/index";
import twitter from "@/auths/twitterauth/twitter";
import twiter_store from "@/auths/twitterauth/store";

let axios = require("axios");

export default {
  data() {
    return {
      home_timelines: [],
      current_user: null
    }
  },
  components: {
    // icPlusSolid,
    // ItemApp
  },
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    feed() {
      return this.$store.getters.feed;
    }
  },
  async mounted() {
    let oauth_verifier = await localStorage.getItem('oauth_verifier');
    if(oauth_verifier) {
      await twitter.home_timeline();
      this.home_timelines = twiter_store.tweets;
      
      await twitter.account_verify_credentials();
      this.current_user = twiter_store.account_verify_credentials;
      console.log('this.current_user', this.current_user);
    }
  },
  methods: {
    navigateTo() {
      router.push("appslist");
    },

    passedTime() {
      // TODO get time form twitter
      return '6h';
    },

    async twiterLogout() {
      await twitter.logout();
      this.home_timelines = [];
      this.current_user = null;
    }
  }
};

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

.user-information {
  background-color: unset !important;
  box-shadow: unset !important;
}

.user-information .row {
  border-radius: 0.8em !important;
  border: 1px solid #f2f2f9;
  &:focus {
    border: solid 5.8px $magenta-color !important;
    // background-color: $magenta-color !important;
  }
}

.user-information .v-list-item__content div {
  margin-right: 100px;
  width: 50%;
}

.user-information .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-information .avatar .v-image {
  border-radius: 50%;
}

.user-information .screen_name {
  color: rgba(255, 255, 255, 0.7);
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
  &:focus {
    border: solid 5.8px $magenta-color;
    // background-color: $magenta-color;
  }
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

.logout-button {
  position: absolute;
  right: 10px;
  bottom: 7px;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  &:focus {
    border: solid 1.8px $magenta-color;
    background-color: $magenta-color;
  }
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.footer {
  position: relative;
  min-height: 100px;
}

</style>
