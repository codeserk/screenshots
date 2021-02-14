import { Material } from 'three'
import { loadTexture } from '../../../../util/loader'
import { MaterialParams, MaterialType } from '../../interfaces/material.interface'
import { SceneObject } from '../../interfaces/scene.interface'
import { createLambertMaterial } from './lambert.factory'
import { createPhongMaterial } from './phong.factory'
import { createStandardMaterial } from './standard.factory'
import { createToonMaterial } from './toon.material'

const MATERIAL_FACTORY: Record<MaterialType, (params: MaterialParams) => Promise<Material>> = {
  [MaterialType.Standard]: createStandardMaterial,
  [MaterialType.Phong]: createPhongMaterial,
  [MaterialType.Toon]: createToonMaterial,
  [MaterialType.Lambert]: createLambertMaterial,
}

export async function createMaterial(object: SceneObject): Promise<Material> {
  const materialFactory = MATERIAL_FACTORY[object?.material?.type]
  if (!materialFactory) {
    throw new Error(`Invalid material type ${object?.material?.type}`)
  }

  const params: any = object.material.params
  if (params?.bumpPath) {
    const texture = await loadTexture(params?.bumpPath)
    texture.repeat.set(4, 4)
    texture.wrapS = 4
    texture.wrapT = 4

    params.bumpMap = texture
    params.bumpScale = 0.1
  }

  return await materialFactory(object.material.params)
}
