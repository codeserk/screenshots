import { Vector3 } from 'three'
import { Device, DeviceType } from './interfaces/device.interface'

export const devices: Record<DeviceType, Device> = {
  [DeviceType.SamsungS10]: {
    name: 'Samsung Galaxy S10',

    mtlPath: '/assets/mesh/s10-opt.mtl',
    objPath: '/assets/mesh/s10-opt.obj',
    frontName: 's10_s10_Screen',

    scale: new Vector3(0.1, 0.1, 0.1),
    translate: new Vector3(0, 0, -0.3),
  },
}
