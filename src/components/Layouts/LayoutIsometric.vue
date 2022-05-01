<template>
  <div class="layout layout-isometric">
    <h1
      v-if="false"
      class="text"
      contenteditable="true"
      v-html="layout.text"
      @input="$emit('update', { ...layout, text: $event.target.innerHTML })"
    />

    <device
      v-for="(device, index) in layout.devices"
      :key="index"
      :id="device.type"
      :style="{
        transform: getTransform(device),
        'transform-origin': device.origin,
      }"
      :screenshot="device.screenshot"
      @screenshot-changed="screenshot => updateDevice(index, { ...device, screenshot })"
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

  setup(props: any, { emit }) {
    // Getters
    const getters = {
      deviceId: computed(() => props.layout?.device?.id),
      screenshot: computed(() => props.layout?.screenshot),
    }

    // Methods
    const methods = {
      getTranslate(deviceInfo: any) {
        if (!deviceInfo?.position) {
          return
        }

        return `translate3d(${deviceInfo.position.x ?? 0}, ${deviceInfo.position.y ?? 0}, 0)`
      },

      getScale(deviceInfo: any) {
        if (!deviceInfo.scale) {
          return
        }

        return `scale3d(${deviceInfo.scale}, ${deviceInfo.scale}, ${deviceInfo.scale})`
      },

      getTransform(deviceInfo: any) {
        const rotate = 'rotateX(45deg) rotateZ(-45deg)'
        return [this.getTranslate(deviceInfo), rotate, this.getScale(deviceInfo)].filter(Boolean).join(' ')
      },

      updateDevice(index: number, deviceInfo: any) {
        const layout = {
          ...props.layout,
          devices: [...props.layout.devices],
        }
        layout.devices[index] = deviceInfo

        emit('update', layout)
      },
    }

    return {
      ...getters,
      ...methods,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout-isometric {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .device {
    position: absolute;
    top: 0;
    left: 0;
    // filter: drop-shadow(-4px 4px 5px #444) drop-shadow(-6px 4px 0 #262626) drop-shadow(-6px 4px 0 #262626)
    //   drop-shadow(-6px 4px 0 #202020) drop-shadow(-6px 4px 0 #202020) drop-shadow(-6px 4px 0 #333)
    //   drop-shadow(-6px 4px 0 #333) drop-shadow(-6px 4px 0 #262626) drop-shadow(0 0 0 #333) drop-shadow(0 0 0 #ddd);
    filter: drop-shadow(-4px 4px 5px #444);
  }
}
</style>
