import { Group, Mesh, MeshPhongMaterial, Object3D, Texture, TextureLoader, Vector2 } from 'three'
import { loadMTL, loadObj } from '../../../util/loader'
import { devices } from './devices'
import { DeviceType } from './interfaces/device.interface'

const TEXTURES = {
  // Placeholder: new TextureLoader().load('/assets/placeholder-3.png'),
  Placeholder: new TextureLoader().load('/assets/ivy-screenshot.png'),
}

TEXTURES.Placeholder.repeat = new Vector2(2.2, 1)

const OBJECTS: Partial<Record<DeviceType, Object3D>> = {}
const DEFAULT_DEVICE = DeviceType.SamsungS10

export async function createDevice(type: DeviceType = DEFAULT_DEVICE): Promise<Object3D> {
  const group = new Group()
  group.name = `device`

  if (OBJECTS[type]) {
    return group.add(OBJECTS[type]!.clone())
  }

  const device = devices[type]
  const materials = await loadMTL(device.mtlPath)
  const object = await loadObj(device.objPath, materials)
  object.children[0].castShadow = true

  // Adjust to initial position
  if (device.translate) {
    object.position.x = device.translate.x
    object.position.y = device.translate.y
    object.position.z = device.translate.z
  }
  if (device.scale) {
    object.scale.x = device.scale.x
    object.scale.y = device.scale.y
    object.scale.z = device.scale.z
  }

  // Set placeholder
  setTexture(type, object, TEXTURES.Placeholder)

  OBJECTS[type] = object

  group.add(object)

  return group
}

export function setTexture(type: DeviceType, object: Object3D, texture: Texture) {
  const device = devices[type]
  let front: Object3D | undefined
  object.traverse(child => {
    if (child.name === device.frontName) {
      front = child
    }
  })

  if (front && front instanceof Mesh) {
    if (Array.isArray(front.material)) {
      for (const material of front.material) {
        if (material instanceof MeshPhongMaterial) {
          material.map = texture
          material.needsUpdate = true
        }
      }
    } else if (front.material instanceof MeshPhongMaterial) {
      front.material.map = texture
      front.material.needsUpdate = true
    } else {
      console.log('not found', front.material)
    }
  }
}
