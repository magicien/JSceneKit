'use strict'

import SCNMatrix4 from './SCNMatrix4'
import SCNMatrix4MakeScale from './SCNMatrix4MakeScale'

/**
 * Returns a new matrix created by concatenating the specified matrix with a scale transformation.
 * @access public
 * @param {SCNMatrix4} m - 
 * @param {number} sx - 
 * @param {number} sy - 
 * @param {number} sz - 
 * @returns {SCNMatrix4} - 
 * @desc The resulting transformation consists of the specified scale followed by the transformation represented by the mat parameter.
 * @see https://developer.apple.com/reference/scenekit/1409653-scnmatrix4scale
 */
const SCNMatrix4Scale = function(m, sx, sy, sz) {
  return m.mult(SCNMatrix4MakeScale(sx, sy, sz))
}

export default SCNMatrix4Scale
