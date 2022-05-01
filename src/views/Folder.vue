<template>
  <ion-page>
    <ion-content fullscreen>
      <ion-select v-model="alignmentX">
        <ion-select-option value="start" v-text="'Start'" />
        <ion-select-option value="center" v-text="'Center'" />
        <ion-select-option value="end" v-text="'End'" />
      </ion-select>
      <ion-select v-model="alignmentY">
        <ion-select-option value="start" v-text="'Start'" />
        <ion-select-option value="center" v-text="'Center'" />
        <ion-select-option value="end" v-text="'End'" />
      </ion-select>

      <div class="scenes">
        <scene
          v-for="(scene, index) in scenes"
          :key="index"
          :aspect-ratio="scene.aspectRatio"
          :layers="scene.layers"
          @update-background="newBackground => (scene.background = newBackground)"
          @update-layer="(layerIndex, newLayer) => updateSceneLayer(index, layerIndex, newLayer)"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// import { defineComponent } from 'vue'
import Scene from '@/components/Scene.vue'
import { defineComponent, ref } from 'vue'
import { LightType } from '../modules/scene/interfaces/light.interface'
import { MaterialType } from '../modules/scene/interfaces/material.interface'
import { Alignment, Scene as SceneParams, SceneLayer } from '../modules/scene/interfaces/scene.interface'
import { FontType } from '../modules/scene/text/fonts'

// import Device from '../components/Device.vue

export default defineComponent({
  components: {
    Scene,
    // Device,
  },

  setup() {
    // const devices = []
    // for (let y = 0; y < 6; y++) {
    //   for (let x = 0; x < 10; x++) {
    //     devices.push({
    //       type: 'pixel4xl',
    //       origin: 'top left',
    //       scale: 0.4,
    //       position: {
    //         y: `${-320 + y * 105}%`,
    //         x: `${-290 + x * 108}%`,
    //       },
    //     })
    //   }
    // }
    const background: Partial<SceneLayer> = {
      objects: [
        {
          geometry: {
            cone: { radius: 5, height: 5, radialSegments: 20, heightSegments: 20 },
          },
          material: {
            type: MaterialType.Toon,
            params: {
              color: 0x111111,
            },
          },
          transform: {
            alignment: { x: Alignment.Center, y: Alignment.Center },
            translate: { z: -4, y: -0.2 },
            rotateDeg: { x: 25 },
          },
        },
        {
          geometry: {
            sphere: { radius: 0.5, widthSegments: 50, heightSegments: 50 },
          },
          material: {
            type: MaterialType.Toon,
            params: {
              color: 0x222222,
            },
          },
          transform: {
            alignment: { x: Alignment.Start, y: Alignment.End },
            translate: { z: -1, y: 0 },
            translateRelative: { x: 0.1, y: 0.1, z: -1 },
          },
        },
        {
          geometry: {
            sphere: { radius: 0.5, widthSegments: 50, heightSegments: 50 },
          },
          material: {
            type: MaterialType.Toon,
            params: {
              color: 0x222222,
            },
          },
          transform: {
            scaleToViewport: { width: 8 },
            alignment: { x: Alignment.Center, y: Alignment.Center },
            translateRelative: { z: -1 },
            translateRelativeViewport: { x: 3 },
          },
        },
        {
          geometry: {
            cone: { radius: 5, height: 6, radialSegments: 50, heightSegments: 50, openEnded: true },
          },
          material: {
            type: MaterialType.Toon,
            params: {
              color: 0x111111,
            },
          },
          transform: {
            alignment: { x: Alignment.Center, y: Alignment.Center },
            translate: { z: -5, y: -0.2 },
            translateRelativeViewport: { x: 4 },
            rotateDeg: { x: 180 },
          },
        },
        {
          geometry: {
            torus: { radius: 0.5, radialSegments: 50, tubularSegments: 50, tube: 0.3 },
          },
          material: {
            type: MaterialType.Toon,
            params: {
              color: 0x222222,
            },
          },
          transform: {
            scaleToViewport: { width: 1.5 },
            alignment: { x: Alignment.Center, y: Alignment.Start },
            translateRelative: { z: -2, y: 0.5 },
            translateRelativeViewport: { x: 3 },
          },
        },
      ],

      lights: [
        { type: LightType.Hemisphere, params: { color: 0xffffff } },
        {
          type: LightType.Spot,
          params: { color: 0xffffff, intensity: 1 },
          transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { x: 0, z: 2 } },
        },
        {
          type: LightType.Spot,
          params: { color: 0xffffff, intensity: 0.5 },
          transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { y: 1, z: 2 } },
          shadow: true,
        },
        {
          type: LightType.Spot,
          params: { color: 0xffffff, intensity: 0.5 },
          transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { x: 0, z: 2 } },

          shadow: true,
        },
        {
          type: LightType.Spot,
          params: { color: 0xffffff, intensity: 0.1 },
          transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { x: 3, z: 5 } },

          shadow: true,
        },
        {
          type: LightType.Spot,
          params: { color: 0xffffff, intensity: 1 },
          transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { x: 15, y: 1, z: -5 } },

          shadow: true,
        },
      ],

      devices: [
        {
          transform: {
            scaleToViewport: { height: 0.9 },
            alignment: { x: Alignment.Start, y: Alignment.Center },
            rotateDeg: { x: -35, z: 45 },
          },
        },
        {
          transform: {
            scaleToViewport: { height: 1.2 },
            alignment: { x: Alignment.Center, y: Alignment.Center },
            rotateDeg: { z: -45 },
            translateRelativeViewport: { x: 4.5 },
          },
        },
      ],
    }

    const scenes: SceneParams[] = [
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {} },
            ...background,
          },
          {
            camera: { orthographic: {} },
            lights: [
              { type: LightType.Hemisphere, params: { color: 0xffffff } },
              {
                type: LightType.Spot,
                params: { color: 0xffffff, intensity: 0.1 },
                transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { x: 0, z: 2 } },
              },
            ],
            devices: [
              {
                transform: {
                  scaleToViewport: { height: 0.9 },
                  alignment: { x: Alignment.Start, y: Alignment.Center },
                  rotateDeg: { x: -35, z: 45 },
                },
              },
            ],
          },
          {
            camera: { orthographic: {} },
            texts: [
              {
                message: 'I Ching',
                font: FontType.Lobster,
                size: 2.5,
                shadow: {},
                transform: {
                  alignment: { x: Alignment.Center, y: Alignment.Start },
                  translate: { y: -0.2 },
                },
              },
            ],
          },
        ],
      },
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {}, transform: { translateRelativeViewport: { x: 1 } } },
            ...background,
          },
          {
            camera: { orthographic: {}, transform: { translateRelativeViewport: { x: 1 } } },
            lights: [
              { type: LightType.Hemisphere, params: { color: 0xffffff } },
              {
                type: LightType.Spot,
                params: { color: 0xffffff, intensity: 0.1 },
                transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { x: 0, z: 2 } },
              },
            ],
            devices: [
              {
                transform: {
                  scaleToViewport: { height: 0.9 },
                  alignment: { x: Alignment.Start, y: Alignment.Center },
                  rotateDeg: { x: -35, z: 45 },
                },
              },
            ],
          },
          {
            camera: { orthographic: {} },
            texts: [
              {
                message: `Consult the I Ching\neasily, without\ncarrying any coin\naround`,
                font: FontType.Lobster,
                shadow: {},
                size: 1.75,
                transform: {
                  alignment: { x: Alignment.Center, y: Alignment.Start },
                  translate: { y: -0.2 },
                },
              },
            ],
          },
        ],
      },
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {}, transform: { translateRelativeViewport: { x: 2 } } },
            ...background,
          },
          {
            camera: { orthographic: {} },
            lights: [
              { type: LightType.Hemisphere, params: { color: 0xffffff } },
              {
                type: LightType.Spot,
                params: { color: 0xffffff, intensity: 0.05 },
                transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { y: 1, z: 2 } },
              },
            ],
            devices: [
              {
                transform: {
                  scaleToViewport: { width: 0.8 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  translate: { y: -0.45 },
                },
              },
            ],
          },
          {
            camera: { orthographic: {} },
            texts: [
              {
                message: `1. Make a question`,
                font: FontType.Lobster,
                shadow: {},
                size: 1.75,
                transform: {
                  alignment: { x: Alignment.Center, y: Alignment.Start },
                  translate: { y: -0.15 },
                },
              },
            ],
          },
        ],
      },
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {}, transform: { translateRelativeViewport: { x: 3 } } },
            ...background,
          },
          {
            camera: { orthographic: {} },
            lights: [
              { type: LightType.Hemisphere, params: { color: 0xffffff } },
              {
                type: LightType.Spot,
                params: { color: 0xffffff, intensity: 0.05 },
                transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { y: 1, z: 2 } },
              },
            ],
            devices: [
              {
                transform: {
                  scaleToViewport: { width: 0.8 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  translate: { y: 0.45 },
                },
              },
            ],
          },
          {
            camera: { orthographic: {} },
            texts: [
              {
                message: `2. Toss the coins`,
                font: FontType.Lobster,
                shadow: {},
                size: 1.75,
                transform: {
                  alignment: { x: Alignment.Center, y: Alignment.End },
                  translate: { y: 0.15 },
                },
              },
            ],
          },
        ],
      },
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {}, transform: { translateRelativeViewport: { x: 4 } } },
            ...background,
          },
          {
            camera: { orthographic: {} },
            lights: [
              { type: LightType.Hemisphere, params: { color: 0xffffff } },
              {
                type: LightType.Spot,
                params: { color: 0xffffff, intensity: 0.05 },
                transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { y: 1, z: 2 } },
              },
            ],
            devices: [
              {
                transform: {
                  scaleToViewport: { height: 1.2 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  rotateDeg: { z: -45 },
                  translateRelativeViewport: { x: 0.5 },
                },
              },
            ],
          },
          {
            camera: { orthographic: {} },
            texts: [
              {
                message: `Customize your\nexperience.\nDecide what\ninformation \nis shown.`,
                font: FontType.Lobster,
                shadow: {},
                size: 1.75,
                transform: {
                  alignment: { x: Alignment.Start, y: Alignment.Start },
                  translate: { x: 0.1, y: -0.1 },
                },
              },
            ],
          },
        ],
      },
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {}, transform: { translateRelativeViewport: { x: 5 } } },
            ...background,
          },
          {
            camera: { orthographic: {} },
            lights: [
              { type: LightType.Hemisphere, params: { color: 0xffffff } },
              {
                type: LightType.Spot,
                params: { color: 0xffffff, intensity: 0.05 },
                transform: { alignment: { x: Alignment.Center, y: Alignment.Center }, translate: { y: 1, z: 2 } },
              },
            ],
            devices: [
              {
                transform: {
                  scaleToViewport: { height: 1.2 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  rotateDeg: { z: -45 },
                  translateRelativeViewport: { x: -0.5 },
                },
              },
            ],
          },
          {
            camera: { orthographic: {} },
            texts: [
              {
                message: `                   Check your
               your journal!
                    Review the
              questions you
        made in the past.`,
                font: FontType.Lobster,
                shadow: {},
                size: 1.75,
                transform: {
                  alignment: { x: Alignment.Center, y: Alignment.End },
                  translate: { x: 0.1 },
                },
              },
            ],
          },
        ],
      },
    ]

    const state = {
      alignmentX: ref<Alignment>(Alignment.Start),
      alignmentY: ref<Alignment>(Alignment.Start),

      device: ref<string>('iPhoneX'),
      screenshot: ref<string>('/assets/screenshot.png'),

      scenes: ref<SceneParams[]>(scenes),
    }

    const methods = {
      updateSceneLayer(sceneIndex: number, layerIndex: number, layer: SceneLayer) {
        state.scenes.value[sceneIndex].layers[layerIndex] = layer
      },
    }

    return {
      ...state,
      ...methods,
    }
  },
})
</script>

<style scoped lang="scss">
.scenes {
  display: flex;
  overflow-x: auto;

  .scene {
    margin-right: 5px;
  }
}
</style>
