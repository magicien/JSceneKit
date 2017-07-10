'use strict'

import SCNMatrix4 from './SCNMatrix4'

/**
 * Returns the inverse of the specified matrix.
 * @access public
 * @param {SCNMatrix4} m - 
 * @returns {SCNMatrix4} - 
 * @see https://developer.apple.com/documentation/scenekit/1409682-scnmatrix4invert
 */
const SCNMatrix4Invert = function(m) {
  return m.invert()
}

export default SCNMatrix4Invert
