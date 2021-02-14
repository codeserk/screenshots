import { MeshLambertMaterial } from 'three'
import { LambertMaterialParams } from '../../interfaces/material.interface'

export async function createLambertMaterial(params: LambertMaterialParams): Promise<MeshLambertMaterial> {
  return new MeshLambertMaterial(params)
}
