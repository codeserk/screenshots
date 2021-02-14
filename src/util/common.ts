import * as THREE from 'three'
import { Vector2, Vector3 } from '../modules/scene/interfaces/common.interface'

export function createVector2(params: Vector2): THREE.Vector2 {
  return new THREE.Vector2(params.x, params.y)
}

export function createVector3(params: Vector3): THREE.Vector3 {
  return new THREE.Vector3(params.x, params.y)
}
