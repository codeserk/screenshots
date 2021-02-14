import {
  MeshLambertMaterialParameters,
  MeshPhongMaterialParameters,
  MeshStandardMaterialParameters,
  MeshToonMaterialParameters,
} from 'three'

// Materials
export enum MaterialType {
  Standard = 'standard',
  Phong = 'phong',
  Toon = 'toon',
  Lambert = 'lambert',
}

export interface CommonMaterialParams {
  bumpPath?: string
}

export type StandardMaterialParams = MeshStandardMaterialParameters

export type PhongMaterialParams = MeshPhongMaterialParameters

export type ToonMaterialParams = MeshToonMaterialParameters

export type LambertMaterialParams = MeshLambertMaterialParameters

export type MaterialParams = CommonMaterialParams & (PhongMaterialParams | ToonMaterialParams | LambertMaterialParams)
