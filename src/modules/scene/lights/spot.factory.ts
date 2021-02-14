import { Light, SpotLight, SpotLightHelper } from 'three'
import { SpotLightParams } from '../interfaces/light.interface'

export async function createSpotLight(params: SpotLightParams): Promise<Light> {
  const light = new SpotLight(
    params.color,
    params.intensity,
    params.distance,
    params.angle,
    params.penumbra,
    params.decay,
  )
  if (params.helper) {
    light.add(new SpotLightHelper(light))
  }

  return light
}
