import { MeshToonMaterial } from 'three'
import { ToonMaterialParams } from '../../interfaces/material.interface'

export async function createToonMaterial(params: ToonMaterialParams): Promise<MeshToonMaterial> {
  return new MeshToonMaterial(params)
}
