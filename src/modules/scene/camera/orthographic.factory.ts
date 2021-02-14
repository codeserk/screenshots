import { OrthographicCamera, Vector2 } from 'three'
import { OrthographicCameraParams } from '../interfaces/camera.interface'

export function createOrthographicCamera(viewport: Vector2, params: OrthographicCameraParams): OrthographicCamera {
  const camera = new OrthographicCamera(
    -0.5 * viewport.width,
    0.5 * viewport.width,
    0.5 * viewport.height,
    -0.5 * viewport.height,
    params.near,
    params.far,
  )
  camera.translateZ(3)

  return camera
}
