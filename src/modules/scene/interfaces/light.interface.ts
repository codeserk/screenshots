import { Color } from './common.interface'
import { SceneObjectTransform } from './scene.interface'

// Lights
export enum LightType {
  Ambient = 'ambient',
  Hemisphere = 'hemisphere',
  Spot = 'spot',
  Directional = 'directional',
}

export interface CommonLightParams {
  intensity?: number
  helper?: boolean
}

export interface AmbientLightParams extends CommonLightParams {
  color?: Color
}
export interface HemisphereLightParams extends CommonLightParams {
  skyColor?: Color
  groundColor?: Color
}
export interface SpotLightParams extends CommonLightParams {
  color?: Color
  distance?: number
  angle?: number
  penumbra?: number
  decay?: number
}

export interface DirectionalLightParams extends CommonLightParams {
  color?: Color
}

export type LightParams = AmbientLightParams | HemisphereLightParams | SpotLightParams | DirectionalLightParams

export interface SceneLight {
  type: LightType
  params: LightParams
  transform?: SceneObjectTransform
  shadow?: boolean
}
