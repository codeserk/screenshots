import { BoxHelper, Light, MathUtils, Object3D, Vector2, Vector3 } from 'three'
import { Alignment, SceneObjectTransform } from './interfaces/scene.interface'

export function calculateSize(object: Object3D): Vector3 {
  if (object instanceof Light) {
    return new Vector3(10, 10, 10)
  }

  const helper = new BoxHelper(object)
  helper.geometry.computeBoundingBox()
  const boundingBox = helper.geometry.boundingBox!

  return new Vector3(
    boundingBox.max.x - boundingBox.min.x,
    boundingBox.max.y - boundingBox.min.y,
    boundingBox.max.z - boundingBox.min.z,
  )
}

export function transformObject(object: Object3D, transform: SceneObjectTransform, viewport?: Vector2) {
  if (transform.scale) {
    object.scale.set(transform.scale, transform.scale, transform.scale)
  }
  object.rotation.set(transform.rotate?.x ?? 0, transform.rotate?.y ?? 0, transform.rotate?.z ?? 0)
  object.rotation.set(
    MathUtils.DEG2RAD * (transform.rotateDeg?.x ?? 0),
    MathUtils.DEG2RAD * (transform.rotateDeg?.y ?? 0),
    MathUtils.DEG2RAD * (transform.rotateDeg?.z ?? 0),
  )

  // Relative
  if (viewport) {
    const center = new Vector2(viewport.width / 2, viewport.height / 2)
    let size = calculateSize(object)

    // Scale
    if (transform.scaleToViewport?.width) {
      const scale = (viewport.width / size.x) * transform.scaleToViewport?.width
      object.scale.set(scale, scale, scale)
      console.log('to viewport', size, scale)
      size = calculateSize(object)
    }
    if (transform.scaleToViewport?.height) {
      const scale = (viewport.y / size.y) * transform.scaleToViewport?.height
      object.scale.set(scale, scale, scale)
      size = calculateSize(object)
    }

    // Alignment
    if (transform.alignment?.x) {
      if (transform.alignment.x === Alignment.Start) {
        object.position.x = -center.x + size.x / 2
      } else if (transform.alignment.x === Alignment.Center) {
        object.position.x = 0
      } else if (transform.alignment.x === Alignment.End) {
        object.position.x = center.x - size.x / 2
      }
    }
    if (transform.alignment?.y) {
      if (transform.alignment.y === Alignment.Start) {
        object.position.y = center.y - size.y / 2
      } else if (transform.alignment.y === Alignment.Center) {
        object.position.y = 0
      } else if (transform.alignment.y === Alignment.End) {
        object.position.y = -center.y + size.y / 2
      }
    }

    // Relative translation
    object.position.add(
      new Vector3(
        (transform.translateRelative?.x ?? 0) * size.x,
        (transform.translateRelative?.y ?? 0) * size.y,
        (transform.translateRelative?.z ?? 0) * size.z,
      ),
    )

    // Translation relative to viewport
    object.position.add(
      new Vector3(
        (transform.translateRelativeViewport?.x ?? 0) * viewport.width,
        (transform.translateRelativeViewport?.y ?? 0) * viewport.height,
        0,
      ),
    )
  }

  // General translation
  object.position.add(
    new Vector3(transform.translate?.x ?? 0, transform.translate?.y ?? 0, transform.translate?.z ?? 0),
  )
}
