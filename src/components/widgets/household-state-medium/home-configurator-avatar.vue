<template>
  <div class="avatar">
    <img v-if="avatar" :src="avatar" alt="" />
  </div>
</template>

<script>
import HomeConfigurator from "@/constants/home-configurator";

export default {
  props: {
    personId: {
      type: String,
      required: false
    },
    householdId: {
      type: String,
      required: false
    }
  },
  mounted() {
    this.$store.dispatch(HomeConfigurator.Actions.Avatars.LOAD, {
      personId: this.personId,
      householdId: this.householdId
    });
  },
  computed: {
    avatar() {
      return this.$store.getters.avatarForPersonId(this.personId);
    }
  }
};
</script>

<style lang="scss" scope>
.avatar {
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: $tundora;
  border-radius: 50%;
  overflow: hidden;

  img {
    position: relative;

    width: 100%;
    object-fit: contain;
  }
}
</style>
