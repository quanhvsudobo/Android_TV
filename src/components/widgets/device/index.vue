<template>
  <div class="interactive-tile widget" v-focus @sn:enter-up="isActive = !isActive">
    <div class="fl-v">
      <div class="fl-h">
        <img :src="`./images/${data.image}`" class="device-icon" :class="{ active: isActive }" />
        <img v-if="data.batteryLevel && isActive" :src="fetchImgUrl()" alt="battery level" />
      </div>
      <div>
        <h3>{{ data.name }}</h3>
        <p class="label active" v-if="isActive">{{ data.label }}</p>
        <p class="label" v-else>{{ $t("state-inactive") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceTile",
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  data() {
    return { isActive: true };
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    fetchImgUrl() {
      return require(`@/assets/images/shared/icon-battery-${this.data.batteryLevel}.svg`);
    }
  }
};
</script>

<style lang="scss" scoped>
.device-icon {
  position: relative;
  mix-blend-mode: luminosity;
  opacity: 0.4;
  width: 3em;

  &.active {
    mix-blend-mode: normal;
    opacity: 1;
  }
}

.label {
  //color: $cerise;
  &.active {
    color: $cerise;
  }
}
</style>

<i18n>
{
  "en":{
    "state-inactive":"Inactive"
  },
  "de":{
    "state-inactive":"Deaktiv"
  }
}

</i18n>
