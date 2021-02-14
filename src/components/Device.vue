<template>
  <div v-if="device" class="device" :class="{ simple }" @click="onClicked">
    <div
      class="screenshot"
      :style="{
        'background-image': `url(${screenshot})`,
        'margin-top': device.margin.top,
        'margin-right': device.margin.right,
        'margin-bottom': device.margin.bottom,
        'margin-left': device.margin.left,
      }"
    />

    <input class="upload" ref="upload" type="file" @change="onFileUploaded($event.target.files)" />

    <img class="frame" :src="device.framePath" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getDevice } from '@/modules/devices/devices.store'
import { Device } from '../modules/devices/interfaces/device.interface'

export default defineComponent({
  emits: ['screenshot-changed'],

  props: {
    id: {
      type: String,
      required: true,
    },

    simple: {
      type: Boolean,
      default: false,
    },

    screenshot: {
      type: String,
      default: null,
    },
  },

  setup(props: any, { emit }) {
    // const path = '/assets/devices/pixel4XL.png'

    // state
    const state = {
      upload: ref<HTMLElement | null>(null),
      image: ref<any>(null),
    }

    // Getters
    const getters = {
      device: computed((): Device | undefined => getDevice(props.id)),
    }

    // actions
    const actions = {
      loadImage(path: string) {
        const newImage: any = new Image()
        newImage.src = path

        newImage.onload(function() {
          state.image.value = newImage
        })
      },

      onClicked() {
        state.upload.value?.click()
      },

      onFileUploaded(files: File[]) {
        if (files.length > 0) {
          const file = files[0]

          emit('screenshot-changed', URL.createObjectURL(file))
        }
      },
    }

    onMounted(() => {
      // actions.loadImage(path)
    })

    return {
      ...state,
      ...getters,
      ...actions,
    }
  },
})
</script>

<style lang="scss" scoped>
.upload {
  display: none;
}
.device {
  position: relative;
  display: inline-block;
  overflow: hidden;

  .screenshot {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-position-x: center;
    background-position-y: top;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &.simple {
    .frame {
      filter: contrast(0) brightness(0.3);
    }
  }
}
</style>
