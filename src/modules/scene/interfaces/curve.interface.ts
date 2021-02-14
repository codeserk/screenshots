import { Vector3 } from './common.interface'

export enum Curve2DType {
  Arc = 'arc',
  Line = 'line',
  Ellipse = 'ellipse',
  Spline = 'spline',
  CubicBezier = 'cubicBezier',
  QuadraticBezier = 'quadraticBezier',
}

export enum Curve3DType {
  CatmullRom = 'catmullRom',
  CubicBezier = 'cubicBezier3',
  QuadraticBezier = 'quadraticBezier3',
}

export interface Curve2DParams extends Partial<Record<Curve2DType, any>> {
  [Curve2DType.Arc]?: EllipseCurveParams
  [Curve2DType.Ellipse]?: EllipseCurveParams
  [Curve2DType.Spline]?: {}
  [Curve2DType.CubicBezier]?: {}
  [Curve2DType.QuadraticBezier]?: {}
}

export interface Curve3DParams extends Partial<Record<Curve3DType, any>> {
  [Curve3DType.CubicBezier]?: CubicBezierCurveParams
  [Curve3DType.QuadraticBezier]?: 'quadraticBezier3'
  [Curve3DType.CatmullRom]?: 'catmullRom'
}

export interface EllipseCurveParams {
  aX: number
  aY: number
  xRadius: number
  yRadius: number
  aStartAngle: number
  aEndAngle: number
  aClockwise: boolean
  aRotation: number
}

// 3D
export interface CubicBezierCurveParams {
  v0: Vector3
  v1: Vector3
  v2: Vector3
  v3: Vector3
}
