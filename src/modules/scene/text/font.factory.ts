import { Font, FontLoader, Loader } from 'three'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'

import { fontsPaths } from './fonts'
import { FontType } from './fonts'

const FONTS: Partial<Record<FontType, Font>> = {}

function getLoader(path: string): Loader {
  if (path.endsWith('.ttf')) {
    return new TTFLoader()
  }

  return new FontLoader()
}

export async function getFont(type: FontType): Promise<Font> {
  if (FONTS[type]) {
    return FONTS[type]!
  }

  const path = fontsPaths[type]

  const loader = getLoader(path)
  const result = await loader.loadAsync(path)
  const font = result instanceof Font ? result : new Font(result)

  FONTS[type] = font

  return font
}
