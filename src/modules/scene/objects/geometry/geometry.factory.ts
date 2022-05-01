import { BufferGeometry } from 'three'
import { GeometryType } from '../../interfaces/geometry.interface'
import { SceneObject } from '../../interfaces/scene.interface'
import { createBoxGeometry } from './box.factory'
import { createConeGeometry } from './cone.factory'
import { createRingGeometry } from './ring.factory'
import { createSphereGeometry } from './sphere.factory'
import { createTorusGeometry } from './torus.geometry'
import { createTubeGeometry } from './tube.factory'

const GEOMETRY_FACTORY: Record<GeometryType, (params: any) => Promise<BufferGeometry>> = {
  [GeometryType.Box]: createBoxGeometry,
  [GeometryType.Ring]: createRingGeometry,
  [GeometryType.Cone]: createConeGeometry,
  [GeometryType.Sphere]: createSphereGeometry,
  [GeometryType.Tube]: createTubeGeometry,
  [GeometryType.Torus]: createTorusGeometry,
}

const types = Object.values(GeometryType)

export async function createGeometry(object: SceneObject): Promise<BufferGeometry> {
  const type = Object.keys(object?.geometry ?? {}).find((key: string) => types.includes(key as GeometryType)) as
    | GeometryType
    | undefined
  if (!type) {
    throw new Error(`Invalid geometry type ${object?.geometry}`)
  }

  const geometryFactory = GEOMETRY_FACTORY[type]
  if (!geometryFactory) {
    throw new Error(`Invalid geometry type ${type}`)
  }

  return await geometryFactory(object.geometry[type])
}
