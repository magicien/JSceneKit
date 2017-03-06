'use strict'

import SCNMatrix4 from './SCNMatrix4'

const _epsilon = 0.00001

/**
 * Returns a Boolean value that indicates whether the corresponding elements of two matrices are equal.
 * @access public
 * @param {SCNMatrix4} a - 
 * @param {SCNMatrix4} b - 
 * @returns {boolean} - 
 * @desc This function performs a numeric (not bitwise) comparison of each pair of elements.
 * @see https://developer.apple.com/reference/scenekit/1409665-scnmatrix4equaltomatrix4
 */
const SCNMatrix4EqualToMatrix4 = function(a, b) {
  if(!a instanceof SCNMatrix4){
    return false
  }
  return a.equalTo(b)

  /*
  return Math.abs(a.m11 - b.m11) < _epsilon
      && Math.abs(a.m12 - b.m12) < _epsilon
      && Math.abs(a.m13 - b.m13) < _epsilon
      && Math.abs(a.m14 - b.m14) < _epsilon
      && Math.abs(a.m21 - b.m21) < _epsilon
      && Math.abs(a.m22 - b.m22) < _epsilon
      && Math.abs(a.m23 - b.m23) < _epsilon
      && Math.abs(a.m24 - b.m24) < _epsilon
      && Math.abs(a.m31 - b.m31) < _epsilon
      && Math.abs(a.m32 - b.m32) < _epsilon
      && Math.abs(a.m33 - b.m33) < _epsilon
      && Math.abs(a.m34 - b.m34) < _epsilon
      && Math.abs(a.m41 - b.m41) < _epsilon
      && Math.abs(a.m42 - b.m42) < _epsilon
      && Math.abs(a.m43 - b.m43) < _epsilon
      && Math.abs(a.m44 - b.m44) < _epsilon
      */
}

export default SCNMatrix4EqualToMatrix4
