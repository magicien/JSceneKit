'use strict'

//import SCNVector4 from './SCNVector4'

const _epsilon = 0.00001

/**
 * Returns a Boolean value that indicates whether the corresponding components of two vectors are equal.
 * @access public
 * @param {SCNVector4} a - The first vector.
 * @param {SCNVector4} b - The second vector.
 * @returns {boolean} - 
 * @desc This function performs a numeric (not bitwise) comparison of each pair of component values.
 * @see https://developer.apple.com/documentation/scenekit/1409707-scnvector4equaltovector4
 */
const SCNVector4EqualToVector4 = function(a, b) {
  return Math.abs(a.x - b.x) < _epsilon
      && Math.abs(a.y - b.y) < _epsilon
      && Math.abs(a.z - b.z) < _epsilon
      && Math.abs(a.w - b.w) < _epsilon
}

export default SCNVector4EqualToVector4
