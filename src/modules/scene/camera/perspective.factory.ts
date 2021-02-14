import { PerspectiveCamera, Vector2 } from 'three'
import { PerspectiveCameraParams } from '../interfaces/camera.interface'

export function createPerspectiveCamera(viewport: Vector2, params: PerspectiveCameraParams): PerspectiveCamera {
  return new PerspectiveCamera(params.fov, viewport.width / viewport.height, params.near, params.far)
}
