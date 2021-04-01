<template>
  <div class="tile widget fl-h" v-focus>
    <!-- left col -->
    <template v-if="household">
      <template v-if="weather">
        <div class="fl-v">
          <h2 style="margin-bottom: 0.2em; font-size: 5em;">
            {{ Math.round(this.weather.main.temp - 273.15) }}&#xb0;
          </h2>

          <font-awesome-icon
            :icon="['fas', this.icons[this.weatherIcon]]"
            class="main-weather-icon"
          />
          <div>
            <p class="description">
              {{ this.weather.weather.map(w => w.description).join(", ") }}
            </p>
            <p>{{ weather.name }}</p>
          </div>
        </div>

        <table class="weather-table">
          <tr v-for="i in 4" :key="`weather-medium-day-row-${i}`">
            <td class="day">{{ getDayFromNow(i) }}</td>
            <td style="text-align: center;">
              <font-awesome-icon :icon="['fas', getRandomIcon()]" class="day-icon" />
            </td>
            <td class="day-temperature mr-1">{{ getRandomTemperature(i) }}</td>
            <td class="night-temperature">{{ getRandomTemperature(i) - 5 }}</td>
          </tr>
        </table>
      </template>
    </template>
  </div>
</template>

<script>
import get from "lodash/get";
import HomeConfigurator from "@/constants/home-configurator";

export default {
  created() {
    this.icons = {
      "-1": "question",
      "01d": "sun",
      "01n": "moon",
      "02d": "cloud-sun",
      "02n": "cloud-moon",
      "03d": "cloud",
      "03n": "cloud",
      "04d": "cloud",
      "04n": "cloud",
      "09d": "cloud-showers-heavy",
      "09n": "cloud-showers-heavy",
      "10d": "cloud-sun-rain",
      "10n": "cloud-moon-rain",
      "11d": "bolt",
      "11n": "bolt",
      "13d": "snowflake",
      "13n": "snowflake",
      "50d": "smog",
      "50n": "smog"
    };
  },
  mounted() {
    this.$store.dispatch(
      HomeConfigurator.Actions.Households.LOAD,
      process.env.VUE_APP_DEMO_HOUSEHOLD_ID
    );
  },
  watch: {
    household(n, p) {
      /* maybe only ask to update weather when the location of the household changed */
      if (
        (n != null && p == null) ||
        (p != null && n?.location?.address?.city !== p?.location?.address?.city)
      )
        this.$store.dispatch("load-weather", n?.location?.address?.city);
    }
  },
  computed: {
    household() {
      return this.$store.getters.householdForId(process.env.VUE_APP_DEMO_HOUSEHOLD_ID);
    },
    weather() {
      return this.$store.getters.weatherConditions;
    },
    weatherIcon() {
      const result = get(this.weather, "weather[0].icon");
      if (result) return result;
      return "-1";
    }
  },
  methods: {
    getRandomIcon() {
      let result = Object.values(this.icons)[
        parseInt(Object.values(this.icons).length * Math.random())
      ];
      if (result === "question") result = "sun";
      return result;
    },
    getRandomTemperature(i) {
      let toAdd = parseInt(Math.random() * 5);
      if (i % 2 === 0) return Math.round(this.weather.main.temp - 273.15) - toAdd;
      else return Math.round(this.weather.main.temp - 273.15) + toAdd;
    },
    getDayFromNow(i) {
      const result = new Date();
      result.setDate(result.getDate() + i);

      return new Intl.DateTimeFormat("de", { dateStyle: "full" }).format(result).split(",")[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.main-weather-icon {
  color: $mercury;
  font-size: 1.8em;
}

.description {
  margin-top: 0.2em;
}

.weather-table {
  width: 50%;
  height: 100%;
  vertical-align: center;
  font-size: 1.1em;

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
    border-bottom: 1px solid #222;

    &:last-child {
      border: 0;
    }
  }
}

.tile {
  width: 100% !important;
}
</style>
