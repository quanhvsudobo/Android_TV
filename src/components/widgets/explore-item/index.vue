<template>
  <div class="tile" v-focus>
    <img :src="data.image" />
    <div class="p-4">
      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

h3 {
  font-size: 1.8em;
  margin-bottom: 0.5em;
}
</style>
