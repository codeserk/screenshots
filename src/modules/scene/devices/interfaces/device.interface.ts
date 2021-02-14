import { Vector3 } from 'three'

export enum DeviceType {
  SamsungS10 = 'samsung-s10',
}

export interface Device {
  name: string

  mtlPath: string
  objPath: string
  frontName: string

  scale?: Vector3
  translate?: Vector3
  rotate?: Vector3
}
