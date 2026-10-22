'use strict'

import SCNMatrix4 from './SCNMatrix4'

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
  return SCNMatrix4.matrixWithRotation(x, y, z, angle)
}

export default SCNMatrix4MakeRotation
