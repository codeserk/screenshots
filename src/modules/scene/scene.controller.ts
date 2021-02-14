import { Object3D, Texture, Vector2, WebGLRenderer } from 'three'
import { computed } from 'vue'
import { setTexture } from './devices/devices.assets'
import { DeviceType } from './devices/interfaces/device.interface'
import { Scene } from './interfaces/scene.interface'
import { createSceneLayer } from './layer.controller'

export async function createScene(params: Scene) {
  const viewport = new Vector2(2, 2 / params.aspectRatio)
  const layers = await Promise.all(params.layers.map(layer => createSceneLayer(viewport, layer)))

  // Getters
  const getters = {
    deviceObjects: computed(() =>
      layers.reduce((result, layer) => {
        layer.scene.traverse(object => {
          if (object.name === 'device') {
            result.push(object)
          }
        })
        return result
      }, [] as Object3D[]),
    ),
  }

  // Methods
  const methods = {
    setTexture(index: number, texture: Texture) {
      setTexture(DeviceType.SamsungS10, getters.deviceObjects.value[index], texture)
    },

    render(renderer: WebGLRenderer) {
      console.log('RENDER!')
      for (const layer of layers) {
        renderer?.clearDepth()
        renderer?.render(layer.scene, layer.camera)
      }
    },
  }

  return {
    layers,
    ...getters,
    ...methods,
  }
}
