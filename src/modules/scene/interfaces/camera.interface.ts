import { SceneObjectTransform } from './scene.interface'

export enum CameraType {
  Orthographic = 'orthographic',
  Perspective = 'perspective',
}

export interface OrthographicCameraParams {
  near?: number
  far?: number
}

export interface PerspectiveCameraParams {
  fov?: number
  near?: number
  far?: number
}

export interface SceneCamera extends Partial<Record<CameraType, any>> {
  [CameraType.Orthographic]?: OrthographicCameraParams
  [CameraType.Perspective]?: PerspectiveCameraParams

  transform?: SceneObjectTransform
}
