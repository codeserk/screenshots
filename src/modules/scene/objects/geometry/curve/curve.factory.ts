import { Curve, Vector2, Vector3 } from 'three'
import { Curve2DParams, Curve2DType, Curve3DParams, Curve3DType } from '../../../interfaces/curve.interface'
import { createCubicBezierCurve } from './cubicBezier3.factory'
import { createEllipseCurve } from './ellipse.factory'

// 2D

const CURVE2D_FACTORY: Partial<Record<Curve2DType, (params: any) => Promise<Curve<Vector2>>>> = {
  [Curve2DType.Ellipse]: createEllipseCurve,
}
const types2D = Object.values(Curve2DType)

export async function createCurve2D(params: Curve2DParams): Promise<Curve<Vector2>> {
  const type = Object.keys(params ?? {}).find((key: string) => types2D.includes(key as Curve2DType)) as
    | Curve2DType
    | undefined
  if (!type) {
    throw new Error(`Invalid curve type ${params}`)
  }

  const curveFactory = CURVE2D_FACTORY[type]
  if (!curveFactory) {
    throw new Error(`Invalid curve type ${type}`)
  }

  return await curveFactory(params[type])
}

// 3D

const CURVE3D_FACTORY: Partial<Record<Curve3DType, (params: any) => Promise<Curve<Vector3>>>> = {
  [Curve3DType.CubicBezier]: createCubicBezierCurve,
}
const types3D = Object.values(Curve3DType)

export async function createCurve3D(params: Curve3DParams): Promise<Curve<Vector3>> {
  const type = Object.keys(params ?? {}).find((key: string) => types3D.includes(key as Curve3DType)) as
    | Curve3DType
    | undefined
  if (!type) {
    throw new Error(`Invalid curve type ${params}`)
  }

  const curveFactory = CURVE3D_FACTORY[type]
  if (!curveFactory) {
    throw new Error(`Invalid curve type ${type}`)
  }

  return await curveFactory(params[type])
}
