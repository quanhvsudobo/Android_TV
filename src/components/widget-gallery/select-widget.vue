<template>
  <div class="select-widget">
    <title-bar :title="selectedCategory.name">
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

    <div class="gallery">
      <div class="widgets" v-focus-section:select-widget-options>
        <div
          class="widget"
          v-for="widget in widgets"
          :key="`select-widget-option-${widget.component.id}`"
          v-focus
          @focus="handleWidgetFocus(widget)"
          @sn:enter-up="handleAddWidget(widget)"
        >
          <p>{{ widget.name }}</p>
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </div>
      </div>
      <div class="widget-demo">
        <template v-if="highlightedWidget">
          <component
            :is="highlightedWidget.component.name"
            :data="highlightedWidget.data"
            :key="`highlighted-widget-${highlightedWidget.component.id}`"
            :style="getWidgetStyle(highlightedWidget)"
            class="demo-widget"
          />

          <p class="description">
            {{ highlightedWidget.description }}
          </p>
          <p class="sub-description">
            {{ highlightedWidget.subDescription }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CollapseSolid from "@/components/icons/collapse-solid";
import SearchSolid from "@/components/icons/search-solid";

import TitleBar from "@/components/shared/title-bar";
import Widgets from "@/mock/widgets";

export default {
  components: {
    TitleBar,
    CollapseSolid,
    SearchSolid
  },
  props: {
    selectedCategory: {
      type: Object,
      required: true
    }
  },
  created() {
    for (let i = 0; i < this.widgets.length; i++) {
      let componentName = this.widgets[i].component.name;
      this.$options.components[componentName] = () => import("../widgets/" + componentName);
    }
  },
  data() {
    return {
      highlightedWidget: null
    };
  },

  computed: {
    widgets() {
      let result = [];

      Object.values(Widgets).forEach(widgetType => {
        Object.values(widgetType).forEach(widget => {
          if (widget.category.id === this.selectedCategory.id) {
            result.push(widget);
          }
        });
      });

      return result;
    }
  },
  methods: {
    handleBack() {
      this.$emit("clear");
    },
    handleWidgetFocus(widget) {
      this.highlightedWidget = widget;
    },
    getWidgetStyle(widget) {
      return `
        width: ${widget.w * 300}px;
        height: ${widget.h * 300}px;
        margin: 0 auto;
      `;
    },
    handleAddWidget(widget) {
      this.$store.commit("add-widget", widget);
    }
  }
};
</script>

<style lang="scss">
.select-widget {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.gallery {
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  flex: 1 1 auto;
}

.widget-demo {
  position: relative;
  width: 50%;
  padding: 5%;

  .description {
    text-align: center;
    color: $mercury;
    margin-top: 3em;
    max-width: 60%;
    margin: 3em auto 1em auto;
  }

  .sub-description {
    text-align: center;
    max-width: 60%;
    margin: 0 auto;
  }
}

.demo-widget {
  margin: 0 auto;
}

.widgets {
  position: relative;
  width: 50%;
  height: 100%;

  overflow-y: hidden;

  .widget {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #000;
    padding: 1.2em;
    margin-bottom: 1em;
    border-radius: $border-radius;

    font-size: 1.2em;

    &:focus {
      background-color: $mercury;
      color: $cod;
    }
  }
}
</style>
