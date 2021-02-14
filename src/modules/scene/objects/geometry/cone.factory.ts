import { ConeGeometry } from 'three'
import { ConeGeometryParams } from '../../interfaces/geometry.interface'

export async function createConeGeometry(params: ConeGeometryParams): Promise<ConeGeometry> {
  return new ConeGeometry(
    params.radius,
    params.height,
    params.radialSegments,
    params.heightSegments,
    params.openEnded,
    params.thetaStart,
    params.thetaLength,
  )
}
