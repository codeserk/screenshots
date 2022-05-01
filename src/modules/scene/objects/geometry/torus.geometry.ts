import { TorusGeometry } from 'three'
import { TorusGeometryParams } from '../../interfaces/geometry.interface'

export async function createTorusGeometry(params: TorusGeometryParams): Promise<TorusGeometry> {
  return new TorusGeometry(params.radius, params.tube, params.radialSegments, params.tubularSegments, params.arc)
}
