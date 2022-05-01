<template>
  <div class="scene">
    <div ref="canvasContainer" class="canvas-container"></div>
    <input type="file" @change="onFileChanged($event.target.files)" />
    <ion-button @click="save">Save</ion-button>

    <br />
    <textarea :value="layers[2].texts[0].message" @input="onMessageChanged($event.target.value)" />
  </div>
</template>

<script lang="ts">
import * as THREE from 'three'
import { debounce } from 'debounce'
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { createScene } from '../modules/scene/scene.controller'

enum Resolution {
  Low,
  Mid,
  High,
}

const RESOLUTION_WIDTH: Record<Resolution, number> = {
  [Resolution.Low]: 250,
  [Resolution.Mid]: 1200,
  [Resolution.High]: 1980,
}

export default defineComponent({
  props: {
    aspectRatio: {
      type: Number,
      default: 9 / 16,
    },

    layers: {
      type: Array,
      default: () => [],
    },
  },

  setup(props: any, { emit }) {
    // State
    const state = {
      canvasContainer: ref<HTMLElement | undefined>(undefined),

      sceneWidth: ref<number>(400),
      resolution: ref<Resolution>(Resolution.High),
    }

    const getters = {
      sceneHeight: computed(() => state.sceneWidth.value / props.aspectRatio),

      resolutionWidth: computed(() => RESOLUTION_WIDTH[state.resolution.value] ?? RESOLUTION_WIDTH[Resolution.Low]),
      pixelRatio: computed((): number => getters.resolutionWidth.value / state.sceneWidth.value),
    }

    // Background
    let renderer: THREE.WebGLRenderer

    const width = 400
    const height = width / props.aspectRatio
    let scene: any
    // const viewportHeight = 1 / props.aspectRatio

    // Methods
    const methods = {
      async init() {
        // Create renderer
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.autoClear = false
        renderer.shadowMap.enabled = true
        renderer.setSize(width, height)
        renderer.setPixelRatio(getters.pixelRatio.value)
        state.canvasContainer.value?.appendChild(renderer.domElement)

        // Scene
        scene = await createScene({ aspectRatio: props.aspectRatio, layers: props.layers })
        scene.render(renderer)
      },

      async createScene() {
        scene = await createScene({ aspectRatio: props.aspectRatio, layers: props.layers })

        nextTick(() => scene.render(renderer))
      },

      render() {
        scene?.render(renderer)
      },

      onFileChanged(files: File[]) {
        if (files.length > 0) {
          const file = files[0]
          const image = document.createElement('img') as HTMLImageElement
          const texture = new THREE.Texture(image)
          texture.repeat = new THREE.Vector2(2.2, 1)
          image.onload = function() {
            texture.needsUpdate = true
          }

          const reader = new FileReader()
          reader.onload = function(event) {
            image.src = event.target!.result as string
          }

          reader.readAsDataURL(file)

          scene.setTexture(0, texture)
          setTimeout(() => {
            methods.render()
          }, 100)
        }
      },

      async onMessageChanged(message: string) {
        const copy = { ...props.layers[2] }
        copy.texts[0].message = message
        emit('update-layer', 2, copy)

        methods.debouncedUpdateScene()
      },

      debouncedUpdateScene: debounce(async () => {
        await methods.createScene()
      }, 1000),

      save() {
        methods.render()

        const link = document.createElement('a')
        link.download = 'filename.png'
        link.href = renderer.domElement.toDataURL()
        link.click()
      },
    }

    // watch(getters.pixelRatio, pixelRatio => {
    //   renderer.setPixelRatio(pixelRatio)
    // })

    // watch(props.devices, async () => {
    //   await methods.loadDevices()
    //   methods.render()
    // })
    // watch(props.texts, async () => {
    //   await methods.loadTexts()
    //   methods.render()
    // })

    onMounted(async () => {
      await methods.init()

      methods.render()
    })

    return {
      ...state,
      ...getters,
      ...methods,
    }
  },
})
</script>

<style lang="scss" scoped>
.scene {
  position: relative;
  // overflow: hidden;
  // transform: translate3d(0, 0, 0);
  // filter: brightness(1);

  .background {
    // z-index: -1;
  }
  .layout {
  }
}
</style>
