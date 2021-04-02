<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QueryString from "@/auths/twitterauth/querystring";
import router from "@/router";
import twitter from "@/auths/twitterauth/twitter";
@Component
export default class TwitterCallback extends Vue {
  //Sample CallbackURl:
  //http://localhost:8080/twitter/callback?
  //oauth_token=P_xoCgAAAAABNlweAAABeF1NSfs
  //&oauth_verifier=YhI1H4qIy4Tu9e3SNCOSGZixXl7G6uOR

  async mounted() {
    if (QueryString) {
      var queryObj = QueryString as any;
      if (queryObj.oauth_token && queryObj.oauth_verifier) {
        await localStorage.setItem('oauth_token', queryObj.oauth_token);
        await localStorage.setItem('oauth_verifier', queryObj.oauth_verifier);
      }
    }

    window.location.href = '/';
  }
}
</script>