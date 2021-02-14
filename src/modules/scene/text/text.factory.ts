import { FrontSide, Group, Mesh, MeshBasicMaterial, Object3D, ShapeGeometry, Vector3 } from 'three'
import { SceneText } from '../interfaces/scene.interface'
import { calculateSize } from '../object.controller'
import { getFont } from './font.factory'
import { DEFAULT_FONT } from './fonts'

export async function createText(params: SceneText): Promise<Object3D> {
  const group = new Group()
  group.name = 'text'

  const font = await getFont(params.font ?? DEFAULT_FONT)
  const material = new MeshBasicMaterial({
    color: params.color ?? 0xffffff,
    transparent: true,
    opacity: 1,
    side: FrontSide,
  })
  const size = (params.size ?? 1) / 10
  const shapes = font.generateShapes(params.message ?? '', size)
  const geometry = new ShapeGeometry(shapes)
  const mesh = new Mesh(geometry, material)
  const meshSize = await calculateSize(mesh)
  mesh.position.set(-0.5 * meshSize.x, -0.5 * meshSize.y, 0)
  group.add(mesh)

  if (params.shadow) {
    const materialShadow = new MeshBasicMaterial({
      color: params.shadow.color ?? 0x000000,
      transparent: true,
      opacity: 1,
      side: FrontSide,
    })
    const geometryShadow = new ShapeGeometry(shapes)
    const meshShadow = new Mesh(geometryShadow, materialShadow)
    meshShadow.position.set(-0.5 * meshSize.x, -0.5 * meshSize.y, 0)
    meshShadow.position.add(new Vector3(params.shadow.position?.x ?? 0.01, params.shadow.position?.y ?? -0.01, -0.1))
    group.add(meshShadow)
  }

  return group
}
