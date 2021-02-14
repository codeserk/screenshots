import { MeshStandardMaterial } from 'three'
import { StandardMaterialParams } from '../../interfaces/material.interface'

export async function createStandardMaterial(params: StandardMaterialParams): Promise<MeshStandardMaterial> {
  return new MeshStandardMaterial(params)
}
