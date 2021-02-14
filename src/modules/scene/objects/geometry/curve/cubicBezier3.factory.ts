import { CubicBezierCurve3 } from 'three'
import { createVector3 } from '../../../../../util/common'
import { CubicBezierCurveParams } from '../../../interfaces/curve.interface'

export async function createCubicBezierCurve(params: CubicBezierCurveParams): Promise<CubicBezierCurve3> {
  return new CubicBezierCurve3(
    createVector3(params.v0),
    createVector3(params.v1),
    createVector3(params.v2),
    createVector3(params.v3),
  )
}
