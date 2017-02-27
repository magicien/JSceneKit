'use strict'

import SCNMatrix4 from './SCNMatrix4'

/**
 * Returns a new matrix created by concatenating the specified matrix with a rotation transformation.
 * @access public
 * @param {SCNMatrix4} m - 
 * @param {number} angle - The amount of rotation, in radians, measured counterclockwise around the rotation axis.
 * @param {number} x - The x-component of the rotation axis.
 * @param {number} y - The y-component of the rotation axis.
 * @param {number} z - The z-component of the rotation axis.
 * @returns {SCNMatrix4} - 
 * @desc The resulting transformation consists of the specified rotation followed by the transformation represented by the mat parameter.
 * @see https://developer.apple.com/reference/scenekit/1409659-scnmatrix4rotate
 */
const SCNMatrix4Rotate = function(m, angle, x, y, z) {
  return null
}

export default SCNMatrix4Rotate
