<template>
  <div>
    <h2 style="justify-content: center; display:flex; color:white;">Scan QR Code to authenticate via Twitter</h2>
    <div style=" justify-content: center; display:flex; flex-wrap: wrap;">
    <div style="justify-content: center; display:flex; padding:50px; background-color:#FFFFFF" id="goqrcode" />
    </div>
    <h3 style="justify-content: center; display:flex;">http://localhost:8080/twitter/auth</h3>
  </div>
</template>

<script lang="ts">
import VTSApi from "@/api/VTSApi";
import { Component, Vue } from "vue-property-decorator";
const GoQrcode = require("go-qrcode");

@Component
export default class TwitterLandPage extends Vue {
  public api =  new VTSApi();
  public polling : number = 0 ;

  public pollData () {
      this.polling = setInterval(() => {
       // this.$store.dispatch('RETRIEVE_DATA_FROM_BACKEND')
      }, 3000)
    }

  beforeDestroy () {
    clearInterval(this.polling)
  }

  created () {
    this.pollData()
  }
  mounted() {
    var host = window.location.host; 
    console.log("Route", host)
    let options = {
      text: "http://localhost:8080/twitter/auth",
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#FFFFFF",
      correctLevel: GoQrcode.CorrectLevel.H, // L, M, Q, H
      version: 5,
    };

    let domel = document.getElementById("goqrcode");

    // Create new QRCode Object
    new GoQrcode(domel, options);

    //this.api.login("email", "password");
    //setInterval(function(){ alert("Hello world"); }, 3000);
  }
}
</script>