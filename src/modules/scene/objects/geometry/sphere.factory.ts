import { SphereGeometry } from 'three'
import { SphereGeometryParams } from '../../interfaces/geometry.interface'

export async function createSphereGeometry(params: SphereGeometryParams): Promise<SphereGeometry> {
  return new SphereGeometry(
    params.radius,
    params.widthSegments,
    params.heightSegments,
    params.phiStart,
    params.phiLength,
    params.thetaStart,
    params.thetaLength,
  )
}
