import { Group, Texture, TextureLoader } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'

export function loadObj(path: string, materials?: MTLLoader.MaterialCreator): Promise<Group> {
  const objectLoader = new OBJLoader()
  if (materials) {
    objectLoader.setMaterials(materials)
  }

  return objectLoader.loadAsync(path)
}

export function loadMTL(path: string): Promise<MTLLoader.MaterialCreator> {
  const loader = new MTLLoader()

  return loader.loadAsync(path)
}

export function loadTexture(path: string): Promise<Texture> {
  const textureLoader = new TextureLoader()

  return textureLoader.loadAsync(path)
}
