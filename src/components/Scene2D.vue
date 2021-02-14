<template>
  <div class="scene">
    <component
      class="background"
      :is="backgroundType"
      :background="background"
      @update="background => $emit('update-background', background)"
    />
    <component class="layout" :is="layoutType" :layout="layout" @update="layout => $emit('update-layout', layout)" />
    <div class="scene-container"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import BackgroundColor from './Backgrounds/BackgroundColor.vue'
import LayoutFlex from './Layouts/LayoutFlex.vue'
import LayoutMultiple from './Layouts/LayoutMultiple.vue'
import LayoutIsometric from './Layouts/LayoutIsometric.vue'

export default defineComponent({
  components: {
    // Backgrounds
    BackgroundColor,

    // Layouts
    LayoutFlex,
    LayoutMultiple,
    LayoutIsometric,
  },

  props: {
    background: {
      type: Object,
      default: () => ({}),
    },

    layout: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props: any) {
    // Getters
    const getters = {
      backgroundType: computed((): string | undefined => props.background?.type ?? undefined),
      layoutType: computed((): string | undefined => props.layout?.type ?? undefined),
    }

    return {
      ...getters,
    }
  },
})
</script>

<style lang="scss" scoped>
.scene {
  position: relative;
  min-width: 300px;
  height: calc(300px / 9 * 16);
  // overflow: hidden;
  transform: translate3d(0, 0, 0);
  filter: brightness(1);

  .background {
    // z-index: -1;
  }
  .layout {
  }
}
</style>
