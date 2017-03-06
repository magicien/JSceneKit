'use strict'

import SCNVector3 from './SCNVector3'

/**
 * Returns a new three-component vector created from individual component values.
 * @access public
 * @param {number} x - The first component of the vector.
 * @param {number} y - The second component of the vector.
 * @param {number} z - The third component of the vector.
 * @returns {SCNVector3} - 
 * @see https://developer.apple.com/reference/scenekit/1409705-scnvector3make
 */
const SCNVector3Make = function(x, y, z) {
  return new SCNVector3(x, y, z)
}

export default SCNVector3Make
