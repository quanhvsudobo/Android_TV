<template>
  <div
    class="interactive-tile  widget"
    v-focus
    @sn:enter-up="handleEnter"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <template v-if="currentView === views.START">
      <div class="fl-v">
        <div class="widget-icon">
          <img :src="iconImage" />
        </div>

        <div class="widget-description">
          <p class="widget-title">{{ $t("title") }}</p>
          <p class="widget-sub-title">
            {{ $t("subtitle") }}
          </p>
        </div>
      </div>
    </template>

    <template v-if="currentView === views.DOWNLOADING">
      <div class="gauge">
        <gauge
          :start-angle="-130"
          :end-angle="130"
          :min-value="0"
          :max-value="100"
          :value="downloadSpeed"
          :progress-value="downloadProgress"
        />
        <div class="speed">
          <p class="value">{{ downloadSpeed }}</p>
          <p class="label">Mb/s</p>
        </div>
        <p class="type-label">Download</p>
      </div>
    </template>

    <template v-if="currentView === views.UPLOADING">
      <div class="gauge">
        <gauge
          :start-angle="-130"
          :end-angle="130"
          :min-value="0"
          :max-value="100"
          :value="uploadSpeed"
          :progress-value="uploadProgress"
        />
        <div class="speed">
          <p class="value">{{ uploadSpeed }}</p>
          <p class="label">Mb/s</p>
        </div>
        <p class="type-label">Upload</p>
      </div>
    </template>

    <template v-if="currentView === views.SUMMARY">
      <div class="summary">
        <div class="fl-aic speed-item">
          <font-awesome-icon :icon="['fas', 'arrow-down']" class="arrow cerise" />
          <p class="summary-speed">{{ downloadSpeed }}</p>
          <p style="font-size: 0.7em;">Mb/sec</p>
        </div>
        <div class="fl-aic speed-item">
          <font-awesome-icon :icon="['fas', 'arrow-up']" class="arrow shakespeare" />
          <p class="summary-speed">{{ uploadSpeed }}</p>
          <p style="font-size: 0.7em;">Mb/sec</p>
        </div>
        <p>Zurück</p>
      </div>
    </template>
  </div>
</template>

<script>
import UsageGraphical from "@/assets/images/usage_graphical.svg";
import DashboardInfo from "@/constants/dashboard-info";

import get from "lodash/get";
import Speedtest from "@/utils/speedtest";
import Gauge from "@/components/shared/gauge";

const VIEWS = {
  START: "speedtest-small-start",
  DOWNLOADING: "speedtest-small-downloading",
  UPLOADING: "speedtest-small-uploading",
  SUMMARY: "speedtest-small-summary"
};

const createSpeedtestData = () => {
  return {
    dlStatus: 0.0,
    dlProgress: 0,
    ulStatus: 0,
    ulProgress: 0,
    pingStatus: 0
  };
};

/* states:

  1 downloading
  2 downloading
  3 uploading
  4 summary

*/

export default {
  name: "SpeedtestSmall",
  components: {
    Gauge
  },
  created() {
    this.usageIcon = UsageGraphical;
    this.speedtestWorker = null;
    this.views = VIEWS;
  },
  mounted() {
    this.speedtestWorker = new Speedtest();
    this.speedtestState = 0;

    this.speedtestWorker.onupdate = data => {
      this.speedtest.data = data;

      if (data.dlProgress > 0 && this.speedtestState < 2) {
        this.speedtestState = 2;
      }
      if (data.ulProgress > 0 && this.speedtestState < 3) {
        this.speedtestState = 3;
      }
    };
    this.speedtestWorker.onend = () => {
      if (this.speedtestState < 4) this.speedtestState = 4;
    };
  },
  data() {
    return {
      isFocused: false,
      currentView: VIEWS.START,
      isUploading: false,
      speedtestState: -1,
      speedtest: {
        data: createSpeedtestData()
      }
    };
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  watch: {
    /*     uploadProgress(next) {
      if (next > 0) this.currentView = this.views.UPLOADING;
    } */
    speedtestState(next) {
      switch (next) {
        case 1:
          this.currentView = this.views.START;
          break;
        case 2:
          this.currentView = this.views.DOWNLOADING;
          break;
        case 3:
          this.currentView = this.views.UPLOADING;
          break;
        case 4:
          this.currentView = this.views.SUMMARY;
          break;
      }
    },
    isFocused: function(val) {
      this.isFocused = val;
      if (this.isFocused) {
        //TODO switch out with correct text
        this.$store.commit(DashboardInfo.Mutations.WidgetDescription.SET, {
          text: "This is the Speedtest widget",
          icon: require("@/assets/images/icon-speedtest-default.svg")
        });
      } else {
        this.$store.commit(DashboardInfo.Mutations.WidgetDescription.RESET);
      }
    }
  },
  methods: {
    handleEnter() {
      switch (this.currentView) {
        case this.views.START:
          this.start();
          break;

        case this.views.DOWNLOADING:
          break;

        case this.views.UPLOADING:
          break;

        case this.views.SUMMARY:
          this.currentView = this.views.START;
          break;
      }
    },
    initialize(v) {
      if (v == null || v === "" || isNaN(v)) {
        return 0;
      } else return parseFloat(v);
    },
    start() {
      if (this.speedtestState !== 1) {
        this.speedtestWorker.start();
        this.currentView = this.views.DOWNLOADING;
      } else {
        this.speedtestWorker.abort();
        this.speedtestWorker.start();
      }
    }
  },
  computed: {
    downloadSpeed() {
      return this.initialize(get(this.speedtest, "data.dlStatus"));
    },
    uploadSpeed() {
      return this.initialize(get(this.speedtest, "data.ulStatus"));
    },
    downloadProgress() {
      return this.initialize(get(this.speedtest, "data.dlProgress"));
    },
    uploadProgress() {
      return this.initialize(get(this.speedtest, "data.ulProgress"));
    },
    ping() {
      return this.initialize(get(this.speedtest, "data.pingStatus"));
    },
    iconImage() {
      return require("@/assets/images/icon-speedtest-default.svg");
    }
  }
};
</script>

<i18n>
{
  "en":{
    "title":"Speedtest",
    "subtitle": "Start"

  },
  "de":{
    "title":"Speedtest",
    "subtitle": "Starten"
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

.interactive-tile {
  &:focus {
    .gauge {
      .value {
        color: $cod;
      }
    }
  }
}

.gauge {
  position: relative;
  .speed {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 55%;
    text-align: center;
    .value {
      color: $mercury;
      font-size: 2em;
      font-family: $teleneo-bold;
      margin-bottom: 0.2em;
    }
  }
  .type-label {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 2%;
    text-align: center;
  }
}

.summary {
  .speed-item {
    font-size: 1.8em;
    justify-content: space-between;
    margin-bottom: 0.5em;

    .arrow {
      font-size: 0.8em;
    }

    .summary-speed {
      color: white;
      mix-blend-mode: difference;
      font-size: 1.2em;
      font-family: $teleneo-bold;
    }
  }
}

.widget {
  padding-top: 0em;
  padding-bottom: 0em;
}
</style>
