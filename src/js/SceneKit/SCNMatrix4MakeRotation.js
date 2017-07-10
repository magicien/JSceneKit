'use strict'

import SCNMatrix4 from './SCNMatrix4'
import SCNVector3 from './SCNVector3'

/**
 * Returns a matrix describing a rotation transformation.
 * @access public
 * @param {number} angle - The amount of rotation, in radians, measured counterclockwise around the rotation axis.
 * @param {number} x - The x-component of the rotation axis.
 * @param {number} y - The y-component of the rotation axis.
 * @param {number} z - The z-component of the rotation axis.
 * @returns {SCNMatrix4} - 
 * @see https://developer.apple.com/documentation/scenekit/1409686-scnmatrix4makerotation
 */
const SCNMatrix4MakeRotation = function(angle, x, y, z) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const v = new SCNVector3(x, y, z)
  const m = new SCNMatrix4()

  const nx = v.x
  const ny = v.y
  const nz = v.z

  m.m11 = nx * nx * (1.0-c) + c
  m.m12 = nx * ny * (1.0-c) - nz * s
  m.m13 = nx * nz * (1.0-c) + ny * s
  m.m14 = 0.0
  m.m21 = ny * nx * (1.0-c) + nz * s
  m.m22 = ny * ny * (1.0-c) + c
  m.m23 = ny * nz * (1.0-c) - nx * s
  m.m24 = 0.0
  m.m31 = nz * nx * (1.0-c) - ny * s
  m.m32 = nz * ny * (1.0-c) + nx * s
  m.m33 = nz * nz * (1.0-c) + c
  m.m34 = 0.0
  m.m41 = 0.0
  m.m42 = 0.0
  m.m43 = 0.0
  m.m44 = 1.0

  return m
}

export default SCNMatrix4MakeRotation
