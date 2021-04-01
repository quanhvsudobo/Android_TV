<template>
  <div class="tile widget fl-v" v-focus>
    <h3>{{ $t("title") }}</h3>
    <div class="v-spacer"></div>
    <table>
      <tr>
        <td><img :src="tvIcon" alt="" /></td>
        <td>iMac</td>
        <td>
          <mini-graph :points="points[0]" :width="miniGraph.width" :height="miniGraph.height" />
        </td>
        <td>
          <div class="current-speed">
            <span>{{ getCurrentSpeed(0) }} Mb/s</span>
          </div>
        </td>
      </tr>

      <tr>
        <td><img :src="computerIcon" alt="" /></td>
        <td>Macbook</td>
        <td>
          <mini-graph :points="points[1]" :width="miniGraph.width" :height="miniGraph.height" />
        </td>
        <td>
          <div class="current-speed">
            <span>{{ getCurrentSpeed(1) }} Mb/s</span>
          </div>
        </td>
      </tr>

      <tr>
        <td><img :src="computerIcon" alt="" /></td>
        <td>Macbook Pro 13" 2020</td>
        <td>
          <mini-graph :points="points[2]" :width="miniGraph.width" :height="miniGraph.height" />
        </td>
        <td>
          <div class="current-speed">
            <span>{{ getCurrentSpeed(2) }} Mb/s</span>
          </div>
        </td>
      </tr>

      <tr>
        <td><img :src="tvIcon" alt="" /></td>
        <td>Sony Bravia AC988</td>
        <td>
          <mini-graph :points="points[3]" :width="miniGraph.width" :height="miniGraph.height" />
        </td>
        <td>
          <div class="current-speed">
            <span>{{ getCurrentSpeed(3) }} Mb/s</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import SmartphoneIcon from "@/assets/images/smartphone_graphical.svg";
import TvIcon from "@/assets/images/tv_graphical.svg";
import ComputerIcon from "@/assets/images/computer_graphical.svg";

import MiniGraph from "@/components/shared/mini-graph";

function getRandomizer(bottom, top) {
  return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

export default {
  name: "InternetUsageLarge",
  components: {
    MiniGraph
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      points: [
        [25, 29, 32, 24, 31, 30],
        [54, 52, 56, 64, 61, 59],
        [93, 96, 92, 104, 120],
        [64, 60, 58, 55, 49],
        [32, 42, 31, 43, 42]
      ],
      ranges: [
        { lower: 20, upper: 35 },
        { lower: 40, upper: 80 },
        { lower: 80, upper: 120 },
        { lower: 60, upper: 70 },
        { lower: 2, upper: 50 }
      ],
      updateInterval: null
    };
  },
  mounted() {
    this.updateInterval = setInterval(() => {
      this.points.forEach((list, i) => {
        list.push(getRandomizer(this.ranges[i].lower, this.ranges[i].upper));
        list.shift();
      });
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
  created() {
    this.smartphoneIcon = SmartphoneIcon;
    this.tvIcon = TvIcon;
    this.computerIcon = ComputerIcon;

    this.miniGraph = {
      width: 100,
      height: 30
    };
  },
  methods: {
    getCurrentSpeed(i) {
      return parseInt(this.points[i][this.points[i].length - 1]);
    }
  }
};
</script>

<i18n>
{
  "en":{
    "title":"Internet usage"
  },
  "de":{
    "title":"Internetverbrauch"  
  }
}

</i18n>

<style lang="scss" scoped>
table {
  width: 100%;
  height: 90%;
  vertical-align: center;
  font-size: 1.1em;

  img {
    max-width: 2em;
    margin-right: 0.7em;
  }

  td {
    vertical-align: middle;
  }

  .day {
    color: $mercury;
  }
  .day-icon {
    color: $mercury;
    font-size: 1.2em;
  }

  .day-temperature {
    color: $mercury;
    text-align: right;
  }

  .night-temperature {
    text-align: right;
  }

  tr {
    &:last-child {
      border: 0;
    }
  }

  .current-speed {
    width: 100%;
    border-radius: 2em;
    background-color: $tundora;
    color: white;
    text-align: center;
    padding: 0.5em 0.5em 0.3em 0.5em;

    white-space: nowrap;
    min-width: 120px;
  }
}

.v-spacer {
  display: block;
  height: 40px;
}

.tile {
  width: 100% !important;
}
</style>
