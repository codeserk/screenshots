<template>
  <div class="layout layout-multiple">
    <h1
      class="text"
      contenteditable="true"
      v-html="layout.text"
      @input="$emit('update', { ...layout, text: $event.target.innerHTML })"
    />

    <div class="device-wrapper">
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

      getRotate(deviceInfo: any) {
        if (!deviceInfo.rotate) {
          return
        }

        return `rotate(${deviceInfo.rotate})`
      },

      getTransform(deviceInfo: any) {
        return [this.getScale(deviceInfo), this.getRotate(deviceInfo), this.getTranslate(deviceInfo)]
          .filter(Boolean)
          .join(' ')
      },

      updateDevice(index: number, deviceInfo: any) {
        const layout = {
          ...props.layout,
          devices: [...props.layout.devices],
        }
        layout.devices[index] = deviceInfo

        console.log('new layout', layout)

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
.layout-multiple {
  min-height: 100%;

  .text {
    margin: 1em;
  }

  .device-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
  }
}
</style>
