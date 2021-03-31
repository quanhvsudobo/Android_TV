<template>
  <div class="item-wrap" v-bind:class="{ 'no-style': noStyle }">
    <div class="item-inner">
      <div class="clickme" :style="{ color }" v-wave>
          <div style="display: flex; justify-content: space-between; font-size:40px; padding-top:10px;">
            <i v-bind:class="[activeClass, errorClass]" aria-hidden="true" style="align-items: flex-start;"></i>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div class="clickme-text">
              <p style="margin-top: 15px; margin-bottom: 20px;">{{ label }}</p>
            </div>
            <div>
              <p style="margin-top: 15px;  margin-bottom: 20px;"><i class="fa fa-angle-right"></i></p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "vue-property-decorator";

@Component
export default class ItemApp extends Vue {
  @Prop()
  center!: boolean;

  @Prop()
  noStyle!: boolean;

  @Prop()
  color!: string;

  @Prop()
  label!: string;

  @Prop()
  rippleClass!: string;

  @Prop()
  icon!: string;
  
  public activeClass = this.icon == "dog" || this.icon == "envelope"  ? "fa" : 'fab'
  public errorClass = 'fa-' + this.icon
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}
.new-row {
  grid-column-start: 1;
}
.hash {
  color: currentColor;
  opacity: 0.3;
}
.red--text {
  color: green;
}
.item-wrap {
  padding: 0 30px;
  box-sizing: border-box;
}
.item-inner {
  max-width: 100%;
  width: 200px;
  position: relative;
}
.clickme {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.274);
  font-weight: bold;
  max-width: 100%;

  font-size: 1.2em;
  border-radius: 5px;
  margin: 20px auto;
  padding-left:10px;
  padding-right: 10px;
  cursor: pointer;
  user-select: none;
  position: relative !important;
}
.no-style .clickme {
  box-shadow: none;
  background-color: transparent;
  transition: background-color 0.2s ease-in;
}
.no-style .clickme:hover {
  background-color: #f7f7f7;
}

.no-style .clickme::before {
  display: none !important;
}
.clickme-text {
  color: inherit;
  line-height: normal;
  z-index: 200;
  /* color: white; */
}
.clickme::before {
  border-radius: inherit;
  bottom: 0;
  color: inherit;
  content: "";
  left: 0;
  opacity: 0.05;
  pointer-events: none;
  right: 0;
  top: 0;
  background-color: #777;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}
.clickme:hover {
  /* opacity: 0.09; */
  /* background-color: white; */
  background-color: rgba(255, 255, 255, 0.521);
  transition: 0.9s;
}
.clickme:active:before {
  opacity: 0;
}
</style>
