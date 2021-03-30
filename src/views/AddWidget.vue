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
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";
import icPlusSolid from "@/components/icons/icPlusSolid.vue";
import router from "@/router/index";
let axios = require('axios');

@Component({
  components: {
    icPlusSolid,
  },
})
export default class AddWidget extends Vue {
  @Prop() message!: string;
  message: string = "";

  async mounted() {
    var oauth_token = localStorage.getItem('oauth_token');
    var oauth_verifier = localStorage.getItem('oauth_verifier');
    console.log(oauth_token);
    console.log(oauth_verifier);
    var request_params = {
        method: 'get',
        url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
        headers: {
            'Authorization': 'OAuth oauth_consumer_key="XpIvxPsGknYOk8N8RZnKxq7hc", oauth_nonce="768766333454385152-0W0QrTgxLHCw1OqhXiFSJACM7fulAsD", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="'+ (Date.now() - 6000) +'", oauth_token="768766333454385152-0W0QrTgxLHCw1OqhXiFSJACM7fulAsD", oauth_version="1.0"'
        }
    };
    var res = await axios(request_params);
    console.log(res);
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
</style>
