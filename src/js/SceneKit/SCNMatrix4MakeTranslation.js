'use strict'

import SCNMatrix4 from './SCNMatrix4'

/**
 * Returns a matrix describing a translation transformation.
 * @access public
 * @param {number} tx - 
 * @param {number} ty - 
 * @param {number} tz - 
 * @returns {SCNMatrix4} - 
 * @see https://developer.apple.com/reference/scenekit/1409679-scnmatrix4maketranslation
 */
const SCNMatrix4MakeTranslation = function(tx, ty, tz) {
  return new SCNMatrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1)
}

export default SCNMatrix4MakeTranslation
