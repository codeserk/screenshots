import { DeviceType } from '../devices/interfaces/device.interface'
import { FontType } from '../text/fonts'
import { SceneCamera } from './camera.interface'
import { Color, Vector2 } from './common.interface'
import { SceneObjectGeometry } from './geometry.interface'
import { SceneLight } from './light.interface'
import { MaterialParams, MaterialType } from './material.interface'

export interface SceneObjectMaterial {
  type: MaterialType
  params: MaterialParams
}

export enum Alignment {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export interface SceneObjectTransform {
  scale?: number
  scaleToViewport?: { width?: number; height?: number }

  translate?: { x?: number; y?: number; z?: number }
  translateRelative?: { x?: number; y?: number; z?: number }
  translateRelativeViewport?: { x?: number; y?: number }

  rotate?: { x?: number; y?: number; z?: number }
  rotateDeg?: { x?: number; y?: number; z?: number }

  alignment?: { x?: Alignment; y?: Alignment }
}

export interface SceneObject {
  geometry: SceneObjectGeometry
  material: SceneObjectMaterial
  transform?: SceneObjectTransform
}

export interface SceneText {
  message: string
  font?: FontType
  transform?: SceneObjectTransform
  size?: number
  color?: Color

  shadow?: {
    color?: Color
    position?: Vector2
  }
}

export interface SceneDevice {
  type?: DeviceType
  transform?: SceneObjectTransform
}

export interface SceneElements {
  objects?: SceneObject[]
  lights?: SceneLight[]
  texts?: SceneText[]
  devices?: SceneDevice[]
  groups?: SceneGroup[]
}

export interface SceneGroup extends SceneElements {
  name?: string
  transform?: SceneObjectTransform
}

export interface SceneLayer extends SceneElements {
  name?: string
  camera: SceneCamera
}

export interface Scene {
  aspectRatio: number
  layers: SceneLayer[]
}
