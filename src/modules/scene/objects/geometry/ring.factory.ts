import { RingGeometry } from 'three'
import { RingGeometryParams } from '../../interfaces/geometry.interface'

export async function createRingGeometry(params: RingGeometryParams): Promise<RingGeometry> {
  return new RingGeometry(
    params.innerRadius,
    params.outerRadius,
    params.thetaSegments,
    params.phiSegments,
    params.thetaStart,
    params.thetaLength,
  )
}
