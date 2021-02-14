import { MeshPhongMaterial } from 'three'
import { PhongMaterialParams } from '../../interfaces/material.interface'

export async function createPhongMaterial(params: PhongMaterialParams): Promise<MeshPhongMaterial> {
  return new MeshPhongMaterial(params)
}
