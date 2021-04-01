<template>
  <div
    class="tile  widget"
    v-focus
    @sn:enter-up="handleEnter"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <div class="fl-v">
      <div class="widget-icon">
        <img :src="iconImage" />
      </div>

      <div class="widget-description">
        <p class="widget-title">{{ $t("title") }}</p>
        <img :src="backgroundImage" class="status-icon" />
        <p class="widget-sub-title">
          {{ isActive ? "Aktiv" : "Deaktiv" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import hyperid from "hyperid";
import NotificationComponents from "@/mock/notification-components";
import DashboardInfo from "@/constants/dashboard-info";

export default {
  name: "DeviceTile",
  data() {
    return {
      isActive: false,
      isFocused: false
    };
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  computed: {
    backgroundImage() {
      if (this.isActive) {
        return require("@/assets/images/icon_active_small.svg");
      } else return require("@/assets/images/icon_inactive_small.svg");
    },
    iconImage() {
      return require("@/assets/images/icon-home-wifi-default.svg");
    }
  },
  methods: {
    handleEnter() {
      this.isActive = !this.isActive;
      this.$store.commit("add-notification", {
        id: hyperid()(),
        component: NotificationComponents.Information,
        data: {
          title: `Gestnetzwerk ${this.isActive ? "aktiviert" : "deaktiviert"}`,
          timestamp: new Date(),
          icon: "home-wifi_graphical.svg",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
          actions: ["Ok", "Cancel"]
        },
        isSeen: false,
        isCollapsable: true,
        isCollapsed: false
      });
    }
  },
  watch: {
    isFocused: function(val) {
      this.isFocused = val;
      if (this.isFocused) {
        //TODO switch out with correct text
        this.$store.commit(DashboardInfo.Mutations.WidgetDescription.SET, {
          text: "This is the Guest Wifi widget",
          icon: require("@/assets/images/icon-home-wifi-default.svg")
        });
      } else {
        this.$store.commit(DashboardInfo.Mutations.WidgetDescription.RESET);
      }
    }
  }
};
</script>

<i18n>
{
  "en":{
    "title":"Guestnetwork"
  },
  "de":{
    "title":"Gastnetzwerk"
  }
}

</i18n>

<style lang="scss" scoped>
/deep/ .device-icon {
  position: relative;

  width: 3em;

  .icon {
    fill: $mercury;
  }
}

.widget {
  padding-top: 0em;
  padding-bottom: 0em;
}

.status-icon {
  display: inline;
  width: 12px;
  height: 12px;
  margin-bottom: 4px;
}
</style>
