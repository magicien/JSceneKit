'use strict'

import SCNVector4 from './SCNVector4'

/**
 * 
 * @access public
 * @param {number[]} v - 
 * @returns {SCNVector4} - 
 * @see https://developer.apple.com/documentation/scenekit/1523606-scnvector4fromfloat4
 */
const SCNVector4FromFloat4 = function(v) {
  return new SCNVector4(v)
}

export default SCNVector4FromFloat4
