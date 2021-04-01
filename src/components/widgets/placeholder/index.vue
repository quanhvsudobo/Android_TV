<template>
  <div class="tile widget" v-focus>
    <img :src="`./images/mocks/images/${data.image}`" class="placeholder-image" />
  </div>
</template>

<script>
export default {
  name: "DeviceTile",
  props: {
    data: {
      type: Object,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.placeholder-image {
  position: relative;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
