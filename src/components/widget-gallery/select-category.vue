<template>
  <div class="select-category">
    <title-bar :title="$t('widget-catalog.categories')">
      <template #left>
        <div class="navigation-icon" v-focus @sn:enter-up="handleBack">
          <collapse-solid style="transform: rotate(-90deg)" />
        </div>
      </template>

      <template #right>
        <div class="navigation-icon" v-focus>
          <search-solid />
        </div>
      </template>
    </title-bar>

    <div class="spacer" />
    <div class="categories" v-focus-section:select-widget-categories>
      <div
        class="category"
        v-for="category in categories"
        :key="`select-widget-category-${category.id}`"
        v-focus
        @sn:enter-up="handleSelect(category)"
      >
        <div class="fl-aic">
          <font-awesome-icon :icon="['fas', category.icon]" class="mr-2" />
          <p>{{ category.name }}</p>
        </div>

        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </div>
    </div>
    <div class="spacer" />
  </div>
</template>

<script>
import CollapseSolid from "@/components/icons/collapse-solid";
import SearchSolid from "@/components/icons/search-solid";

import TitleBar from "@/components/shared/title-bar";

import WidgetCategories from "@/mock/widget-categories";

export default {
  components: { CollapseSolid, SearchSolid, TitleBar },
  created() {
    this.categories = WidgetCategories;
  },
  props: {
    value: Object
  },
  methods: {
    handleBack() {
      this.$router.push("/");
    },
    handleSelect(category) {
      this.$emit("input", category);
    }
  }
};
</script>

<style lang="scss" scoped>
.spacer {
  display: block;
  height: 4em;
}

.categories {
  position: relative;
  margin: 0 auto;
  max-width: 80%;

  font-size: 1.4em;

  .category {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: $cod;
    border-radius: $border-radius;
    padding: 1.7em;
    margin-bottom: 1em;

    &:focus {
      background-color: $mercury;
      color: $cod;
    }
  }
}
</style>
