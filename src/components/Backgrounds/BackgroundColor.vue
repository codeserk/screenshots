<template>
  <div class="background background-color" :style="{ background: gradient }" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    background: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props: any) {
    // Getters
    const getters = {
      gradient: computed(() => {
        const colors = props.background?.colors ?? []
        if (colors.length > 1) {
          return `linear-gradient(45deg, ${colors.join(',')})`
        }

        return colors[0]
      }),
    }

    return {
      ...getters,
    }
  },
})
</script>

<style lang="scss" scoped>
.background-color {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
