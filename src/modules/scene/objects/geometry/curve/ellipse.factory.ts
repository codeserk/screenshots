import { Curve, EllipseCurve, Vector2 } from 'three'
import { EllipseCurveParams } from '../../../interfaces/curve.interface'

export async function createEllipseCurve(params: EllipseCurveParams): Promise<Curve<Vector2>> {
  return new EllipseCurve(
    params.aX,
    params.aY,
    params.xRadius,
    params.yRadius,
    params.aStartAngle,
    params.aEndAngle,
    params.aClockwise,
    params.aRotation,
  )
}
