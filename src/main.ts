import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import VWave from "v-wave";
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import vuetify from '@/plugins/vuetify' 

Vue.use(VWave, VueAxios, axios);

const spatialCfg = {
  scrollOptions: { behavior: "smooth", block: "center" },
};

Vue.config.productionTip = false;

//VueRouter Instance
const myRouter: VueRouter = router;

//App Instance
const app = new Vue({
  router: myRouter,
  vuetify: vuetify,
  render: (h) => h(App),
}).$mount("#app");
