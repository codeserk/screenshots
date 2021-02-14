import { AmbientLight, Light } from 'three'
import { AmbientLightParams } from '../interfaces/light.interface'

export async function createAmbientLight(params: AmbientLightParams): Promise<Light> {
  return new AmbientLight(params.color, params.intensity)
}
