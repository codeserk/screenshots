import { Curve3DParams } from './curve.interface'

// Mesh types
export enum GeometryType {
  Box = 'box',
  Ring = 'ring',
  Cone = 'cone',
  Sphere = 'sphere',
  Tube = 'tube',
}

export interface SceneObjectGeometry extends Partial<Record<GeometryType, any>> {
  [GeometryType.Box]?: BoxGeometryParams
  [GeometryType.Ring]?: RingGeometryParams
  [GeometryType.Cone]?: ConeGeometryParams
  [GeometryType.Sphere]?: SphereGeometryParams
  [GeometryType.Tube]?: TubeGeometryParams
}

// Geometries
export interface BoxGeometryParams {
  width?: number
  height?: number
  depth?: number
  widthSegments?: number
  heightSegments?: number
  depthSegments?: number
}

export interface TubeGeometryParams {
  curve: Curve3DParams
  tubularSegments?: number
  radius?: number
  radiusSegments?: number
  closed?: boolean
}

export interface RingGeometryParams {
  innerRadius?: number
  outerRadius?: number
  thetaSegments?: number
  phiSegments?: number
  thetaStart?: number
  thetaLength?: number
}

export interface ConeGeometryParams {
  radius?: number
  height?: number
  radialSegments?: number
  heightSegments?: number
  openEnded?: boolean
  thetaStart?: number
  thetaLength?: number
}

export interface SphereGeometryParams {
  radius?: number
  widthSegments?: number
  heightSegments?: number
  phiStart?: number
  phiLength?: number
  thetaStart?: number
  thetaLength?: number
}
