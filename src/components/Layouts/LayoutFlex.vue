<template>
  <div class="layout layout-flex">
    <h1
      class="text"
      contenteditable="true"
      v-html="layout.text"
      @input="$emit('update', { ...layout, text: $event.target.innerHTML })"
    />

    <device
      :id="layout.device"
      :screenshot="screenshot"
      @screenshot-changed="screenshot => $emit('update', { ...layout, screenshot })"
      simple
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import Device from '@/components/Device.vue'

export default defineComponent({
  components: {
    Device,
  },

  props: {
    layout: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props: any) {
    // Getters
    const getters = {
      deviceId: computed(() => props.layout?.device?.id),
      screenshot: computed(() => props.layout?.screenshot),
    }

    return {
      ...getters,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 100%;

  .text {
    margin: 1em;
  }

  .device {
    width: 70%;
  }
}
</style>
