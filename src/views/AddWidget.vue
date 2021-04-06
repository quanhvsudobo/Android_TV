<template>
  <div v-focus-section:addwidget class="fl-v-aic" style="overflow: auto; max-height: 100vh">
    <h2>{{ message }}</h2>

    <div v-focus-section:addbutton class="edit-add">
      <div class="operation-buttons">
        <div class="addBtn oval" v-focus @sn:enter-up="navigateTo"></div>
      </div>
    </div>

    <user-info @onLogout="twiterLogout" :user="current_user" ></user-info>

    <h2 class="home_timeline_title" v-if="home_timelines.length">Boxes</h2>

    <div class="d-flex box-wraper">
      <twitter-box v-if="current_user" :user="current_user" class="box" :items="home_timelines"></twitter-box>
      <twitter-box v-if="current_user" :user="current_user" class="box" :items="home_timelines"></twitter-box>
      <twitter-box v-if="current_user" :user="current_user" class="box" :items="home_timelines"></twitter-box>
    </div>

    <h2 class="home_timeline_title" v-if="home_timelines.length">Twitter Timelines</h2>

    <time-lines :items="home_timelines"></time-lines>
  </div>
</template>

<script>
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";
import userInfo from "@/components/twitter/userInfo.vue";
import TwitterBox from "@/components/twitter/Box.vue";
import TimeLines from "@/components/twitter/TimeLines.vue";

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
    TimeLines,
    userInfo,
    TwitterBox
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
    }
  },
  methods: {
    navigateTo() {
      router.push("appslist");
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

.box-wraper .box {
  padding: 10px;
  margin-top: 30px;
}

.main-navigation {
  margin-right: $nav-bar-margin-right;
  width: $nav-bar-width;
}

.home_timeline_title {
  margin: 30px;
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
