'use strict'

//import SCNVector3 from './SCNVector3'

const _epsilon = 0.00001

/**
 * Returns a Boolean value that indicates whether the corresponding components of two vectors are equal.
 * @access public
 * @param {SCNVector3} a - The first vector.
 * @param {SCNVector3} b - The second vector.
 * @returns {boolean} - 
 * @desc This function performs a numeric (not bitwise) comparison of each pair of component values.
 * @see https://developer.apple.com/documentation/scenekit/1409643-scnvector3equaltovector3
 */
const SCNVector3EqualToVector3 = function(a, b) {
  return Math.abs(a.x - b.x) < _epsilon
      && Math.abs(a.y - b.y) < _epsilon
      && Math.abs(a.z - b.z) < _epsilon
}

export default SCNVector3EqualToVector3
