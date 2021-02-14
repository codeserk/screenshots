import { devices } from './devices'
import { Device, DeviceType } from './interfaces/device.interface'

// Getters
export function getDevice(id: DeviceType): Device | undefined {
  return devices[id]
}
