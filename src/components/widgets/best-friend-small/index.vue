<template>
  <div class="tile widget" v-focus @sn:enter-up="handleEnter">
    <div class="fl-v">
      <div class="fl-h">
        <div>
          <h4 class="best-friend-title">Jackies</h4>
          <span>bester Freund</span>
        </div>
        <img class="pet-picture" src="@/assets/images/household/jackie.jpg" alt="picture of pet" />
      </div>
      <div class="bar-container">
        <div
          v-for="(n, index) in 3"
          :key="index"
          :class="[
            'bar',
            index === 0 ? 'first-place' : index === 1 ? 'second-place' : 'third-place'
          ]"
        >
          <img
            class="household-bar-picture"
            :src="fetchImgUrl(membersWithHours[index].image)"
            alt="image of householdmember"
          />
          <div class="trophy-container gold-container" v-if="index === 0">
            <img
              class="trophy-icon"
              src="@/assets/images/best-friend/icon-trophy-gold.svg"
              alt="silver trophy"
            />
          </div>
          <div class="trophy-container" v-else-if="index === 1">
            <img
              class="trophy-icon"
              src="@/assets/images/best-friend/icon-trophy-silver.svg"
              alt="silver trophy"
            />
          </div>
          <div class="trophy-container" v-else-if="index === 2">
            <img
              class="trophy-icon"
              src="@/assets/images/best-friend/icon-trophy-bronze.svg"
              alt="bronze trophy"
            />
          </div>
          <h4>{{ membersWithHours[index].hours }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { BestFriendWidgetData } from "@/mock/best-friend.js";
const HOUSEHOLD_ID = process.env.VUE_APP_DEMO_HOUSEHOLD_ID;

export default {
  name: "BestFriendSmall",
  computed: {
    membersWithHours() {
      let members = this.$store.getters["get-widget-data"];
      let householdMembers = this.$store.getters.personsForHouseholdId(HOUSEHOLD_ID);
      members.sort((a, b) => b.hours - a.hours);
      if (householdMembers && householdMembers.length > 0)
        members = members.filter(m => householdMembers.find(hm => hm.name === m.name));
      return members;
    }
  },
  methods: {
    handleEnter() {
      this.$store.commit("open-modal", {
        component: "BestFriend",
        header: "BestFriendHeader",
        fullscreen: true
      });
    },
    fetchImgUrl(member) {
      return require(`@/assets/images/household/${member}.jpg`);
    }
  }
};
</script>

<style lang="scss" scoped>
.pet-picture {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.subtitle {
  font-size: 15px;
}
.bar-container {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  height: 100%;
  div {
    align-self: flex-end;
    margin-right: 25px;
  }
}

.bar {
  display: flex;
  width: 42px;
  margin: 0 1px 1px 0;
  border-radius: 24.5px;
  justify-content: center;
  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    position: absolute;
    bottom: 8%;
  }
  h4 {
    position: absolute;
    top: 70%;
    font-size: 18px;
  }

  .trophy-container {
    background: #ffff;
    width: 20px;
    height: 20px;
    padding: 15px;
    border-radius: 50%;
    position: relative;
    top: -80%;
    left: 75%;
    img {
      height: 20px;
      width: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-left: 4%;
    }
  }
  .gold-container {
    top: -85%;
  }
}

.first-place {
  height: 95%;
  background-color: #f5a623;
}

.second-place {
  height: 70%;
  background-color: #a6a6a6;
}

.third-place {
  height: 55%;
  background-color: #ae4f0a;
}

.best-friend-title {
  font-size: 24px;

  span {
    color: $dove;
  }
}
</style>
