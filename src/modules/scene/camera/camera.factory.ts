import { Camera, Vector2 } from 'three'
import { CameraType, SceneCamera } from '../interfaces/camera.interface'
import { createOrthographicCamera } from './orthographic.factory'
import { createPerspectiveCamera } from './perspective.factory'

const CAMERA_FACTORY: Record<CameraType, (viewport: Vector2, params: any) => Camera> = {
  [CameraType.Orthographic]: createOrthographicCamera,
  [CameraType.Perspective]: createPerspectiveCamera,
}

const types = Object.values(CameraType)

export function createCamera(viewport: Vector2, camera: SceneCamera): Camera {
  const type = Object.keys(camera).find((key: string) => types.includes(key as CameraType)) as CameraType | undefined
  if (!type) {
    throw new Error(`Invalid camera type ${camera}`)
  }

  const cameraFactory = CAMERA_FACTORY[type]
  if (!cameraFactory) {
    throw new Error(`Invalid camera type ${type}`)
  }

  return cameraFactory(viewport, camera[type])
}
