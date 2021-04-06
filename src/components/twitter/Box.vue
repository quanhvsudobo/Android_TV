<template>
  <v-card v-focus-section:userinfo class="mx-auto mb-4 box-user-information" max-width="300px" tile v-if="user">
    <v-row v-focus>
      <v-col class="avatar" cols="4" md="4" sm="4">
        <v-avatar color="" size="60" tile>
          <v-img :src="user.profile_image_url"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="" cols="8" md="8" sm="8">
        <v-list-item color="rgba(0, 0, 0, .4)" dark>
          <v-list-item-content>
            <v-list-item-title class="title">{{user.name}} <span class="screen_name"></span></v-list-item-title>
            <v-list-item-subtitle>@{{user.screen_name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-col>
      <v-col class="" cols="12" md="12" sm="12">
        <v-divider
          :key="'index'"
        ></v-divider>
        <div class="twitter-content" v-for="(item, index) in items" :key="index" >
          <v-list-item class='tweet-item-list' v-if="index < 2">
            <v-list-item-avatar size='25' rounded="false">
              <v-img :src="item.user.profile_image_url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="tweets-title">
                <b>{{item.user.name}}</b> 
                <span class="screen_name">@{{item.user.screen_name}}</span> 
                <span>&#183;</span>
                <span class="time">6h</span>
              </v-list-item-title>
              <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import { Component, Vue } from "vue-property-decorator";

  import router from "@/router/index";
  import twitter from "@/auths/twitterauth/twitter";
  import twiter_store from "@/auths/twitterauth/store";

  export default {
    name: 'TwitterBox',
    data() {
      return {
      }
    },
    components: {
      // icPlusSolid,
      // ItemApp
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      user: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
    },
    async mounted() {
      
    },
    methods: {
      twiterLogout() {
        this.user = null;
        this.$emit('onLogout');
      }
    }
  };
</script>
<style type="text/css" lang="scss" scoped="">
  .box-user-information {
    background-color: unset !important;
    box-shadow: unset !important;
  }

  .box-user-information .row {
    border-radius: 0.8em !important;
    border: 1px solid #f2f2f9;
    height: 300px;
    padding: 20px;
    &:focus {
      border: solid 5.8px $magenta-color !important;
      // background-color: $magenta-color !important;
    }
  }

  .box-user-information .avatar .v-image {
    border-radius: 50%;
  }

  .box-user-information .screen_name {
    color: rgba(255, 255, 255, 0.7);
  }

  .box-user-information .twitter-content .v-list {
    font-size: 1.4em;
    background-color: unset !important;
  }

  .box-user-information .twitter-content .tweets-actions {
    color: #b7b2b2;
  }

  .box-user-information .twitter-content .screen_name {
    color: rgb(91, 112, 131);
  }

  .box-user-information .twitter-content .time {
    color: rgb(91, 112, 131);;
  }

  .box-user-information .twitter-content .tweet-item-list {
    border-radius: $border-radius;
    background-color: #fff;
    padding: 0.5em 0.5em 0.3em 0.5em;
    margin-bottom: 0.5em;
    &:focus {
      border: solid 5.8px $magenta-color;
      // background-color: $magenta-color;
    }
  }

  .box-user-information .twitter-content .tweet-item-list:hover {
    background-color: #f7f9fa;
  }

  .logout-button {
    position: absolute;
    right: 16px;
    bottom: 14px;
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
</style>