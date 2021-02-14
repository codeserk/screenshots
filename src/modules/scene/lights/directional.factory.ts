import { DirectionalLight, DirectionalLightHelper, Light } from 'three'
import { DirectionalLightParams } from '../interfaces/light.interface'

export async function createDirectionalLight(params: DirectionalLightParams): Promise<Light> {
  const light = new DirectionalLight(params.color, params.intensity)
  if (params.helper) {
    light.add(new DirectionalLightHelper(light))
  }

  return light
}
