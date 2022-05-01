import { Light } from 'three'
import { LightParams } from '../interfaces/light.interface'
import { LightType, SceneLight } from '../interfaces/light.interface'
import { createAmbientLight } from './ambient.factory'
import { createDirectionalLight } from './directional.factory'
import { createHemisphereLight } from './hemisphere.factory'
import { createSpotLight } from './spot.factory'

const LIGHT_FACTORY: Record<LightType, (params: LightParams) => Promise<Light>> = {
  [LightType.Ambient]: createAmbientLight,
  [LightType.Hemisphere]: createHemisphereLight,
  [LightType.Spot]: createSpotLight,
  [LightType.Directional]: createDirectionalLight,
}

export async function createLight(light: SceneLight): Promise<Light> {
  const lightFactory = LIGHT_FACTORY[light?.type]
  if (!lightFactory) {
    throw new Error(`Invalid light type ${light?.type}`)
  }

  const createdLight = (await lightFactory(light.params)) as any
  if (light.shadow) {
    createdLight.castShadow = true
    createdLight.shadow.mapSize.width = 4098
    createdLight.shadow.mapSize.height = 4098
    // createdLight.shadow.mapSize.width = 256
    // createdLight.shadow.mapSize.height = 256
    const d = 50
    createdLight.shadow.camera.left = -d
    createdLight.shadow.camera.right = d
    createdLight.shadow.camera.top = d
    createdLight.shadow.camera.bottom = -d
    createdLight.shadow.camera.far = 3500
    createdLight.shadow.bias = -0.0001
  }

  return createdLight
}
