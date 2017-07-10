'use strict'

import SCNVector3 from './SCNVector3'

/**
 * 
 * @access public
 * @param {number[]} v - 
 * @returns {SCNVector3} - 
 * @see https://developer.apple.com/documentation/scenekit/1524143-scnvector3fromfloat3
 */
const SCNVector3FromFloat3 = function(v) {
  return new SCNVector3(v)
}

export default SCNVector3FromFloat3
