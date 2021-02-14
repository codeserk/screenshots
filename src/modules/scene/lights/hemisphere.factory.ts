import { HemisphereLight, HemisphereLightHelper, Light } from 'three'
import { HemisphereLightParams } from '../interfaces/light.interface'

export async function createHemisphereLight(params: HemisphereLightParams): Promise<Light> {
  const light = new HemisphereLight(params.skyColor, params.groundColor, params.intensity)
  if (params.helper) {
    light.add(new HemisphereLightHelper(light, 1))
  }

  return light
}
