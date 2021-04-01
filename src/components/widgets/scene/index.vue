<template>
  <div class="tile widget" v-focus>
    <div class="fl" style="height: 100%">
      <img :src="data.image" class="device-icon mr-3" />
      <div>
        <h3 style="margin-bottom: 5px">{{ data.name }}</h3>
        <p>{{ data.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scene",
  props: {
    data: {
      type: Object,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.device-icon {
  position: relative;

  width: 4em;
}

.label {
  //color: $cerise;
}

.tile {
  width: 100% !important;
  height: 100% !important;
}
</style>
