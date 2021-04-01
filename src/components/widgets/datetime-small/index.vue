<template>
  <tile class="widget" v-focus>
    <div class="fl-v">
      <h2>{{ time }}</h2>

      <div>
        <p>{{ dateStr.split(",")[0] }}</p>
        <p>{{ dateStr.split(",")[1] }}</p>
      </div>
    </div>
  </tile>
</template>

<script>
import Tile from "@/components/shared/tile";

export default {
  name: "DateTimeWidget",
  components: {
    Tile
  },
  data() {
    return {
      date: new Date(),
      interval: null
    };
  },
  mounted() {
    this.internval = setInterval(() => {
      this.date = new Date();
    }, 1000 * 15);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    dateStr() {
      return new Intl.DateTimeFormat("de", { dateStyle: "full" }).format(this.date);
    },
    time() {
      return new Intl.DateTimeFormat("de", { timeStyle: "short" }).format(this.date);
    }
  },
  methods: {}
};
</script>

<style></style>
