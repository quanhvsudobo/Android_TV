<template>
  <div class="tile widget" v-focus>
    <img :src="wave" alt="" class="wave" />
    <div class="fl-v">
      <div>
        <h4>Mia</h4>
        <p>Schläft</p>
      </div>
      <div>
        <h3>{{ $t("title") }}</h3>
        <p class="cerise">Sehr Ruhig</p>
      </div>
    </div>
  </div>
</template>

<script>
import Wave from "@/assets/images/wave-1.gif";

export default {
  name: "BabyMonitorSmall",
  created() {
    this.wave = Wave;
  },
  components: {},
  props: {
    data: {
      type: Object,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.device-icon {
  position: relative;

  width: 3em;
}

.household-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  h3 {
    font-size: 2em;
  }
}

/deep/ .icon-container {
  position: relative;
  display: block;
  border-radius: 50%;
  background-color: #262626;
  width: 3em;
  height: 3em;

  .dt-icon {
    position: relative;
    width: 1.6em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: $dove;
  }
}

.wave {
  position: absolute;
  top: 0px;
  left: -11%;
  z-index: 0;
  width: 122%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.4;
  height: 20%;
}
</style>

<i18n>
{
  "en":{
    "title":"Babymonitor"
  },
  "de":{
    "title":"Babymonitor"
  }
}

</i18n>
