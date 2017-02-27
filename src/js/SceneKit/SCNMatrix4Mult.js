'use strict'

import SCNMatrix4 from './SCNMatrix4'

/**
 * Returns the product of two matrices.
 * @access public
 * @param {SCNMatrix4} a - 
 * @param {SCNMatrix4} b - 
 * @returns {SCNMatrix4} - 
 * @desc Matrix multiplication is not commutative. As a transformation, the result of multiplying a matrix A by a matrix B is the transformation represented by B followed by the transformation represented by A.
 * @see https://developer.apple.com/reference/scenekit/1409697-scnmatrix4mult
 */
const SCNMatrix4Mult = function(a, b) {
  return null
}

export default SCNMatrix4Mult
