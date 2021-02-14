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
          :layers="scene.layers"
          @update-background="newBackground => (scene.background = newBackground)"
          @update-layout="newLayout => (scene.layout = newLayout)"
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
import { Alignment, Scene as SceneParams } from '../modules/scene/interfaces/scene.interface'
import { FontType } from '../modules/scene/text/fonts'

// import Device from '../components/Device.vue

export default defineComponent({
  components: {
    Scene,
    // Device,
  },

  setup() {
    const devices = []
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 10; x++) {
        devices.push({
          type: 'pixel4xl',
          origin: 'top left',
          scale: 0.4,
          position: {
            y: `${-320 + y * 105}%`,
            x: `${-290 + x * 108}%`,
          },
        })
      }
    }
    console.log(devices)

    const scenes: SceneParams[] = [
      {
        aspectRatio: 9 / 16,
        layers: [
          {
            camera: { orthographic: {} },
            objects: [
              {
                geometry: {
                  cone: { radius: 5, height: 5, radialSegments: 20, heightSegments: 20 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x253157,
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
                  sphere: { radius: 0.5, widthSegments: 100, heightSegments: 100 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x564514,
                  },
                },
                transform: {
                  alignment: { x: Alignment.Start, y: Alignment.End },
                  translate: { z: -1, y: 0 },
                  translateRelative: { x: 0.1, y: 0.1 },
                },
              },
              {
                geometry: {
                  sphere: { radius: 0.5, widthSegments: 50, heightSegments: 50 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x564514,
                  },
                },
                transform: {
                  scaleToViewport: { width: 6 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  translateRelative: { z: -1 },
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
            ],

            devices: [
              {
                transform: {
                  scaleToViewport: { height: 0.75 },
                  alignment: { x: Alignment.Start, y: Alignment.Center },
                  rotateDeg: { x: -35, z: 45 },
                },
              },
            ],
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
                  scaleToViewport: { height: 0.75 },
                  alignment: { x: Alignment.Start, y: Alignment.Center },
                  rotateDeg: { x: -35, z: 45 },
                },
              },
            ],
            texts: [
              {
                message: 'Asteroids!',
                font: FontType.CarterOne,
                size: 2.5,
                shadow: {},
                transform: {
                  alignment: { x: Alignment.Center, y: Alignment.Start },
                  translate: { y: -0.4 },
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
            objects: [
              {
                geometry: {
                  cone: { radius: 5, height: 5, radialSegments: 20, heightSegments: 20 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x253157,
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
                  sphere: { radius: 0.5, widthSegments: 100, heightSegments: 100 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0xfbcb3c,
                  },
                },
                transform: {
                  alignment: { x: Alignment.Start, y: Alignment.End },
                  translate: { z: -1, y: 0 },
                  translateRelative: { x: 0.1, y: 0.1 },
                },
              },
              {
                geometry: {
                  sphere: { radius: 0.5, widthSegments: 50, heightSegments: 50 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x564514,
                  },
                },
                transform: {
                  scaleToViewport: { width: 6 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  translateRelative: { z: -1 },
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
            ],

            devices: [
              {
                transform: {
                  scaleToViewport: { height: 0.75 },
                  alignment: { x: Alignment.Start, y: Alignment.Center },
                  rotateDeg: { x: -35, z: 45 },
                },
              },
            ],
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
                  scaleToViewport: { height: 0.75 },
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
                message: `Dodge Asteroids \n to become the best\n  rocket pilot ever!`,
                font: FontType.CarterOne,
                shadow: {},
                transform: {
                  scale: 1.25,
                  alignment: { x: Alignment.Center, y: Alignment.Start },
                  translate: { y: 0.4 },
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
            objects: [
              {
                geometry: {
                  cone: { radius: 5, height: 5, radialSegments: 20, heightSegments: 20 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x253157,
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
                  sphere: { radius: 0.5, widthSegments: 100, heightSegments: 100 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0xfbcb3c,
                  },
                },
                transform: {
                  alignment: { x: Alignment.Start, y: Alignment.End },
                  translate: { z: -1, y: 0 },
                  translateRelative: { x: 0.1, y: 0.1 },
                },
              },
              {
                geometry: {
                  sphere: { radius: 0.5, widthSegments: 50, heightSegments: 50 },
                },
                material: {
                  type: MaterialType.Toon,
                  params: {
                    color: 0x564514,
                  },
                },
                transform: {
                  scaleToViewport: { width: 6 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  translateRelative: { z: -1 },
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
            ],

            devices: [
              {
                transform: {
                  scaleToViewport: { height: 0.75 },
                  alignment: { x: Alignment.Start, y: Alignment.Center },
                  rotateDeg: { x: -35, z: 45 },
                },
              },
            ],
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
                  scaleToViewport: { height: 0.9 },
                  alignment: { x: Alignment.Center, y: Alignment.Center },
                  translate: { y: -0.75 },
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

      //   [
      //   {
      //     camera: {
      //       type: 'orthographic',
      //     },

      //     background,

      //     texts: [
      //       {
      //         message: 'Asteroids!',
      //         alignment: 'left',
      //         position: 'top',
      //         offsetX: 0.2,
      //         offsetY: -0.2,
      //         size: 2,
      //       },
      //     ],
      //     devices: [
      //       {
      //         type: DeviceType.SamsungS10,

      //         transform: {
      //           scale: 2.5,
      //           translateX: 1,
      //           translateY: 0,
      //           rotateX: Math.PI * -0.2,
      //           rotateZ: Math.PI * 0.2,
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     camera: {
      //       type: 'orthographic',
      //     },

      //     background,

      //     texts: [
      //       {
      //         message: `Dodge Asteroids \n to become the best\n  rocket pilot ever!`,
      //         alignment: 'right',
      //         position: 'top',
      //         offsetX: -0.2,
      //         offsetY: -0.2,
      //         size: 1.25,
      //       },
      //     ],
      //     devices: [
      //       {
      //         type: DeviceType.SamsungS10,

      //         transform: {
      //           scale: 2.5,
      //           translateX: -1,
      //           translateY: 0,
      //           rotateX: Math.PI * -0.2,
      //           rotateZ: Math.PI * 0.2,
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     camera: {
      //       type: 'orthographic',
      //     },
      //     devices: [
      //       {
      //         type: DeviceType.SamsungS10,

      //         transform: {
      //           scale: 2.4,
      //           translateX: 0,
      //           translateY: -1,
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     camera: {
      //       type: 'perspective',
      //     },
      //     devices: [
      //       {
      //         type: DeviceType.SamsungS10,

      //         transform: {
      //           scale: 1.5,
      //           translateX: 0.25,
      //           translateY: -0.6,
      //           rotateY: Math.PI * 0.15,
      //         },
      //       },
      //     ],
      //   },
      //   // {
      //   //   background: {
      //   //     type: 'BackgroundColor',
      //   //     colors: ['#2AD5C6'],
      //   //   },
      //   //   layout: {
      //   //     type: 'LayoutIsometric',
      //   //     devices: [
      //   //       {
      //   //         type: 'pixel4xl',
      //   //         scale: 1,
      //   //         origin: 'top left',
      //   //         position: {
      //   //           y: `40%`,
      //   //           x: `-135%`,
      //   //         },
      //   //       },
      //   //     ],
      //   //     text: 'hello world',
      //   //   },
      //   // },
      // ]
    }

    return {
      ...state,
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
