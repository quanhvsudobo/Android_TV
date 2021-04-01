<template>
  <div class="tile widget" v-focus @keyup.74="handleNextState" @sn:enter-up="handleEnter">
    <div class="fl-v">
      <div class="fl-h">
        <img src="@/assets/images/pet-tracker/pet.svg" alt="pet" />
        <img
          v-if="!data.gpsSignal"
          src="@/assets/images/pet-tracker/exclamation.svg"
          alt="exclamation"
        />
        <img
          v-else-if="!data.deviceIsOn"
          src="@/assets/images/shared/icon-battery-0.svg"
          alt="empty battery"
        />
        <img v-else :src="fetchImgUrl()" alt="battery level" />
      </div>

      <div>
        <h3>{{ data.petName }}</h3>
        <p class="label active error" v-if="!data.gpsSignal">Kein GPS-Signal</p>
        <p class="label active error" v-else-if="!data.deviceIsOn || data.batteryLevel === 0">
          Gerät ist ausgeschaltet
        </p>
        <p v-else-if="!data.securityZoneSet">Keine Sicherheitszone</p>
        <p class="no-wrap-text" v-else-if="!data.inSecurityZone">
          Außerhalb der Sicherheitszone
        </p>
        <p class="no-wrap-text" v-else-if="data.inSecurityZone">
          Innerhalb der Sicherheitszone
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import PetTracker from "@/constants/pet-tracker";

export default {
  name: "PetTrackerSmall",
  data() {
    return {
      isActive: true
    };
  },
  computed: {
    ...mapGetters({
      data: PetTracker.Getters.States.CURRENT
    })
  },
  methods: {
    ...mapActions({
      handleNextState: PetTracker.Actions.States.NEXTSTATE,
      setWidgetToCustomState: PetTracker.Actions.States.CUSTOMSTATE
    }),
    handleEnter() {
      this.$store.commit("open-modal", {
        component: "PetTracker",
        header: "PetTrackerHeader",
        fullscreen: true
      });
    },
    fetchImgUrl() {
      return require(`@/assets/images/shared/icon-battery-${this.data.batteryLevel}.svg`);
    }
  },
  created() {
    this.setWidgetToCustomState({ key: "batteryLevel", value: 3 });
  }
};
</script>

<style lang="scss" scoped>
.error {
  color: #ec334d;
  background-color: inherit;
}
.no-wrap-text {
  white-space: nowrap;
}
</style>
