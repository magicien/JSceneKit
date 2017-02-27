'use strict'

import SCNMatrix4 from './SCNMatrix4'

/**
 * Returns a new matrix created by concatenating the specified matrix with a translation transformation.
 * @access public
 * @param {SCNMatrix4} m - 
 * @param {number} tx - 
 * @param {number} ty - 
 * @param {number} tz - 
 * @returns {SCNMatrix4} - 
 * @desc The resulting transformation consists of the specified translation followed by the transformation represented by the mat parameter.
 * @see https://developer.apple.com/reference/scenekit/1409717-scnmatrix4translate
 */
const SCNMatrix4Translate = function(m, tx, ty, tz) {
  return null
}

export default SCNMatrix4Translate
