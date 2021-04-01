<template>
  <div
    class="interactive-tile  widget"
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
          Aktiv
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
      return require("@/assets/images/icon_active_small.svg");
    },
    iconImage() {
      return require("@/assets/images/icon-home-wifi-default.svg");
    }
  },
  methods: {
    handleEnter() {
      this.$store.commit("open-modal", {
        component: "ShareWifi"
      });
    }
  },
  watch: {
    isFocused: function(val) {
      this.isFocused = val;
      if (this.isFocused) {
        //TODO switch out with correct text
        this.$store.commit(DashboardInfo.Mutations.WidgetDescription.SET, {
          text: "This is the WLAN Teilen widget",
          icon: require("@/assets/images/icon-home-wifi-default.svg")
        });
      } else {
        this.$store.commit(DashboardInfo.Mutations.WidgetDescription.RESET);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .device-icon {
  position: relative;

  width: 3em;

  .icon {
    fill: $mercury;
  }
}

.tile {
  &:focus {
    background-color: $cod;
  }
}

.label {
  &.is-active {
    color: $persian-green;
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

<i18n>
{
  "en":{
    "title":"Share WLAN"
  },
  "de":{
    "title":"WLAN Teilen"
  }
}

</i18n>
