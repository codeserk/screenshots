import { TubeGeometry } from 'three'
import { TubeGeometryParams } from '../../interfaces/geometry.interface'
import { createCurve3D } from './curve/curve.factory'

export async function createTubeGeometry(params: TubeGeometryParams): Promise<TubeGeometry> {
  const curve = await createCurve3D(params.curve)

  return new TubeGeometry(curve, params.tubularSegments, params.radius, params.radiusSegments, params.closed)
}
