<template>
  <div class="tile widget fl-v" v-focus>
    <div class="household-grid" v-if="persons && household">
      <div class="fl-aic" v-for="(person, i) in persons" :key="`household-status-item-${i}`">
        <home-configurator-avatar
          :person-id="person.personId"
          :household-id="household.householdId"
          class="mr-2"
        />
        <div>
          <h3>{{ person.name }}</h3>
          <p>{{ person.nickName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeConfigurator from "@/constants/home-configurator";
import HomeConfiguratorAvatar from "./home-configurator-avatar";

const HOUSEHOLD_ID = process.env.VUE_APP_DEMO_HOUSEHOLD_ID;

export default {
  name: "HouseholdStateMedium",
  components: {
    HomeConfiguratorAvatar
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.$store.dispatch(
      HomeConfigurator.Actions.Households.LOAD,
      process.env.VUE_APP_DEMO_HOUSEHOLD_ID
    );
    this.$store.dispatch(
      HomeConfigurator.Actions.Persons.LOAD_ALL,
      process.env.VUE_APP_DEMO_HOUSEHOLD_ID
    );
  },
  computed: {
    household() {
      return this.$store.getters.householdForId(HOUSEHOLD_ID);
    },
    persons() {
      return this.$store.getters.personsForHouseholdId(HOUSEHOLD_ID);
    }
  }
};
</script>

<style lang="scss" scoped>
.household-grid {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  height: 100%;
  width: 100%;

  h3 {
    font-size: 1.2em;
  }
}

.tile {
  width: 100% !important;
}
</style>
