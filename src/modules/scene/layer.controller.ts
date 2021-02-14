import { Camera, Group, Scene, Vector2 } from 'three'
import { createCamera } from './camera/camera.factory'
import { createDevice } from './devices/devices.assets'
import { SceneElements, SceneLayer } from './interfaces/scene.interface'
import { createLight } from './lights/light.factory'
import { transformObject } from './object.controller'
import { createMesh } from './objects/mesh.factory'
import { createText } from './text/text.factory'

async function createGroup(viewport: Vector2, elements: SceneElements): Promise<Group> {
  const group = new Group()

  // Objects
  const objectsGroup = new Group()
  objectsGroup.name = 'objects'
  group.add(objectsGroup)
  for (const object of elements.objects ?? []) {
    try {
      const mesh = await createMesh(object)
      if (object.transform) {
        transformObject(mesh, object.transform, viewport)
      }

      objectsGroup.add(mesh)
    } catch (error) {
      console.log('Error found while creating an object', object)
      console.error(error)
    }
  }

  // Lights
  const lightsGroup = new Group()
  lightsGroup.name = 'lights'
  group.add(lightsGroup)
  for (const light of elements.lights ?? []) {
    try {
      const createdLight = await createLight(light)
      if (light.transform) {
        transformObject(createdLight, light.transform, viewport)
      }
      lightsGroup.add(createdLight)
    } catch (error) {
      console.log('Error found while creating a light', light)
      console.error(error)
    }
  }

  // Texts
  const textsGroup = new Group()
  textsGroup.name = 'texts'
  group.add(textsGroup)
  for (const text of elements.texts ?? []) {
    try {
      const createdText = await createText(text)
      if (text.transform) {
        transformObject(createdText, text.transform, viewport)
      }
      textsGroup.add(createdText)
    } catch (error) {
      console.log('Error found while creating a text', text)
      console.error(error)
    }
  }

  // Devices
  const devicesGroup = new Group()
  devicesGroup.name = 'devices'
  group.add(devicesGroup)
  for (const device of elements.devices ?? []) {
    try {
      const createdDevice = await createDevice(device.type)
      if (device.transform) {
        transformObject(createdDevice, device.transform, viewport)
      }
      devicesGroup.add(createdDevice)
    } catch (error) {
      console.log('Error found while creating a device', device)
      console.error(error)
    }
  }

  // Sub groups
  const subgroups = new Group()
  subgroups.name = 'subgroups'
  group.add(subgroups)
  for (const group of elements.groups ?? []) {
    try {
      const createdGroup = await createGroup(viewport, group)
      if (group.transform) {
        transformObject(createdGroup, group.transform, viewport)
      }
      devicesGroup.add(createdGroup)
    } catch (error) {
      console.log('Error found while creating a group', group)
      console.error(error)
    }
  }

  return group
}

export async function createSceneLayer(
  viewport: Vector2,
  layer: SceneLayer,
): Promise<{ camera: Camera; scene: Scene }> {
  const scene = new Scene()
  const camera = createCamera(viewport, layer.camera)
  if (layer.camera.transform) {
    transformObject(camera, layer.camera.transform, viewport)
  }

  const group = await createGroup(viewport, layer)
  group.name = 'top-group'

  scene.add(group)

  return { scene, camera }
}
