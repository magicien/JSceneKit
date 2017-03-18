'use strict'

import SCNMatrix4 from './SCNMatrix4'
//import SCNMatrix4EqualToMatrix4 from './SCNMatrix4EqualToMatrix4'

const _identity = new SCNMatrix4()

/**
 * Returns a Boolean value that indicates whether the specified matrix is equal to the identity matrix.
 * @access public
 * @param {SCNMatrix4} m - 
 * @returns {boolean} - 
 * @see https://developer.apple.com/reference/scenekit/1409715-scnmatrix4isidentity
 */
const SCNMatrix4IsIdentity = function(m) {
  return m.isIdentity()
}

export default SCNMatrix4IsIdentity
