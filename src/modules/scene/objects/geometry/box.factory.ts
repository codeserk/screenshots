import { BoxGeometry } from 'three'
import { BoxGeometryParams } from '../../interfaces/geometry.interface'

export async function createBoxGeometry(params: BoxGeometryParams): Promise<BoxGeometry> {
  return new BoxGeometry(
    params.width,
    params.height,
    params.depth,
    params.widthSegments,
    params.heightSegments,
    params.depthSegments,
  )
}
