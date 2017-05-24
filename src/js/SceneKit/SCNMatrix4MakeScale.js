'use strict'

import SCNMatrix4 from './SCNMatrix4'

/**
 * Returns a matrix describing a scale transformation.
 * @access public
 * @param {number} sx - The scale factor in the x-axis direction.
 * @param {number} sy - The scale factor in the y-axis direction.
 * @param {number} sz - The scale factor in the z-axis direction.
 * @returns {SCNMatrix4} - 
 * @see https://developer.apple.com/reference/scenekit/1409681-scnmatrix4makescale
 */
const SCNMatrix4MakeScale = function(sx, sy, sz) {
  return new SCNMatrix4(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1)
}

export default SCNMatrix4MakeScale
