export enum FontType {
  Helvetiker,
  Pixel,
  WabbitSans,
  Lobster,
  CarterOne,
  PetitFormalScript,
  Sail,
  Shojumaru,
}

export const DEFAULT_FONT = FontType.Helvetiker

export const fontsPaths: Record<FontType, string> = {
  [FontType.Helvetiker]: '/assets/font/helvetiker_regular.typeface.json',
  [FontType.Pixel]: '/assets/font/pixel.ttf',
  [FontType.WabbitSans]: '/assets/font/wabbit_sans.ttf',
  [FontType.Lobster]: '/assets/font/Lobster.ttf',
  [FontType.CarterOne]: '/assets/font/CarterOne.ttf',
  [FontType.PetitFormalScript]: '/assets/font/PetitFormalScript.ttf',
  [FontType.Sail]: '/assets/font/Sail.ttf',
  [FontType.Shojumaru]: '/assets/font/Shojumaru.ttf',
}
