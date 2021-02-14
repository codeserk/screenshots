import { Mesh } from 'three'
import { SceneObject } from '../interfaces/scene.interface'
import { createGeometry } from './geometry/geometry.factory'
import { createMaterial } from './material/material.factory'

export async function createMesh(object: SceneObject): Promise<Mesh> {
  const geometry = await createGeometry(object)
  const material = await createMaterial(object)
  const mesh = new Mesh(geometry, material)
  mesh.receiveShadow = true
  mesh.castShadow = true

  return mesh
}
